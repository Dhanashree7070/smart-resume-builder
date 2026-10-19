import os
import tempfile

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from starlette.background import BackgroundTask
from app.ats_engine import calculate_ats
from app.intro_generator import generate_intro
from app.member1_adapter import map_member1_export_to_resume
from app.models import (
    ATSRequest,
    ATSResponse,
    IntroResponse,
    Member1ExportRequest,
    ResumeRequest,
)
from app.resume_generator import generate_resume
from weasyprint import HTML

app = FastAPI()

allowed_origins = [
    origin.strip()
    for origin in os.getenv("AI_ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _model_to_dict(model):
    return model.model_dump() if hasattr(model, "model_dump") else model.dict()


def _safe_remove(path: str) -> None:
    try:
        if os.path.exists(path):
            os.remove(path)
    except OSError:
        # Non-fatal cleanup failure.
        pass


def _safe_str(value, fallback=""):
    return fallback if value is None else str(value)


def _as_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        return [item.strip() for item in value.split(",") if item.strip()]
    return []


def _first_item(value):
    return value[0] if isinstance(value, list) and value else value if isinstance(value, dict) else {}


def _normalize_project(project):
    description = project.get("description", "")
    description_text = " ".join(_as_list(description)) if isinstance(description, list) else _safe_str(description)
    return {
        "title": _safe_str(project.get("title")),
        "description": description_text,
        "tech": _safe_str(project.get("tech") or project.get("techStack")),
        "duration": _safe_str(project.get("duration") or " - ".join(
            part for part in [_safe_str(project.get("startDate")), _safe_str(project.get("endDate"))] if part
        )),
        "link": _safe_str(project.get("link") or project.get("githubLink")),
        "highlights": _as_list(description) if isinstance(description, list) else ([description_text] if description_text else []),
    }


def _normalize_experience(experience):
    responsibilities = experience.get("responsibilities")
    description = experience.get("description")
    points = _as_list(responsibilities) or ([description] if description else [])
    return {
        "role": _safe_str(experience.get("role") or experience.get("jobTitle")),
        "company": _safe_str(experience.get("company")),
        "location": _safe_str(experience.get("location")),
        "duration": _safe_str(experience.get("duration") or " - ".join(
            part for part in [_safe_str(experience.get("startDate")), _safe_str(experience.get("endDate"))] if part
        )),
        "description": " ".join(_as_list(responsibilities)) if responsibilities else _safe_str(description),
        "points": points,
    }


def _normalize_resume_payload(data) -> ResumeRequest:
    if isinstance(data, Member1ExportRequest):
        return map_member1_export_to_resume(data)
    if isinstance(data, ResumeRequest):
        return data

    payload = data or {}
    education = _first_item(payload.get("education"))
    skills = payload.get("skills") or {}
    skill_list = _as_list(skills) if not isinstance(skills, dict) else []

    normalized = {
        "id": _safe_str(payload.get("id")),
        "name": _safe_str(payload.get("name") or payload.get("fullName"), "Student Name"),
        "email": _safe_str(payload.get("email")),
        "phone": _safe_str(payload.get("phone")),
        "github": _safe_str(payload.get("github")),
        "linkedin": _safe_str(payload.get("linkedin")),
        "portfolio": _safe_str(payload.get("portfolio")),
        "profile_image": _safe_str(payload.get("profile_image")),
        "location": _safe_str(payload.get("location")),
        "role": _safe_str(payload.get("role")),
        "summary": _safe_str(payload.get("summary")),
        "template_type": _safe_str(payload.get("template_type"), "template1") or "template1",
        "cgpa": payload.get("cgpa") or education.get("cgpa") or 0.0,
        "personal_profile": payload.get("personal_profile") or {
            "hobbies": _as_list(payload.get("hobbies")),
            "strengths": _as_list(payload.get("strengths")),
            "career_goal": _safe_str(payload.get("goals")),
        },
        "education": {
            "degree": _safe_str(education.get("degree")),
            "college": _safe_str(education.get("college") or education.get("institution")),
            "year": education.get("year"),
            "cgpa": education.get("cgpa"),
        },
        "education_history": [],
        "projects": [_normalize_project(project) for project in _as_list(payload.get("projects")) if isinstance(project, dict)],
        "experience": [_normalize_experience(item) for item in _as_list(payload.get("experience")) if isinstance(item, dict)],
        "skills": {
            "languages": _safe_str(skills.get("languages")) if isinstance(skills, dict) else ", ".join(skill_list),
            "frameworks": _safe_str(skills.get("frameworks")) if isinstance(skills, dict) else "",
            "tools": _safe_str(skills.get("tools")) if isinstance(skills, dict) else "",
            "databases": _safe_str(skills.get("databases")) if isinstance(skills, dict) else "",
        },
        "certifications": _as_list(payload.get("certifications")),
        "responsibilities": [
            item.get("description") if isinstance(item, dict) else item
            for item in _as_list(payload.get("achievements") or payload.get("responsibilities"))
            if item
        ],
    }

    return ResumeRequest(**normalized)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate-resume")
def create_resume(data: dict):
    normalized_data = _normalize_resume_payload(data)

    try:
        html_resume = generate_resume(_model_to_dict(normalized_data))
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid resume input/template data.") from exc

    temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf_path = temp_pdf.name
    temp_pdf.close()

    try:
        HTML(string=html_resume).write_pdf(pdf_path)
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename="resume.pdf",
            background=BackgroundTask(_safe_remove, pdf_path),
        )
    except Exception as exc:
        _safe_remove(pdf_path)
        raise HTTPException(status_code=500, detail="Failed to generate resume PDF.") from exc


@app.post("/generate-resume-html", response_class=HTMLResponse)
def create_resume_html(data: dict):
    normalized_data = _normalize_resume_payload(data)

    try:
        return HTMLResponse(generate_resume(_model_to_dict(normalized_data)))
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid resume input/template data.") from exc


@app.post("/generate-intro", response_model=IntroResponse)
def create_intro(data: dict):
    normalized_data = _normalize_resume_payload(data)
    return generate_intro(normalized_data)


@app.post("/ats-score", response_model=ATSResponse)
def ats_score(data: ATSRequest):
    return calculate_ats(data)
