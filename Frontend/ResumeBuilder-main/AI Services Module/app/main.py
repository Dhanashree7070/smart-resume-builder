import os
import tempfile

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask

from app.ats_engine import calculate_ats
from app.intro_generator import generate_intro
from app.models import (
    ATSRequest,
    ATSResponse,
    IntroResponse,
    ResumeRequest,
)
from app.resume_generator import generate_resume
from weasyprint import HTML

app = FastAPI()


# ================= CLEANUP =================
def _safe_remove(path: str) -> None:
    try:
        if os.path.exists(path):
            os.remove(path)
    except OSError:
        pass


# ================= HEALTH =================
@app.get("/health")
def health():
    return {"status": "ok"}


# ================= GENERATE RESUME =================
@app.post("/generate-resume")
def create_resume(data: ResumeRequest):

    try:
        # 🔥 Convert Pydantic → dict
        data_dict = data.model_dump()

        # 🔥 DEBUG (optional)
        print("\n===== DATA RECEIVED =====")
        print(data_dict)
        print("========================\n")

        # 🔥 Generate HTML
        html_resume = generate_resume(data_dict)

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail="Invalid resume input/template data."
        ) from exc

    # 🔥 Create temp PDF
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
        raise HTTPException(
            status_code=500,
            detail="Failed to generate resume PDF."
        ) from exc


# ================= GENERATE INTRO =================
@app.post("/generate-intro", response_model=IntroResponse)
def create_intro(data: ResumeRequest):
    return generate_intro(data)


# ================= ATS =================
@app.post("/ats-score", response_model=ATSResponse)
def ats_score(data: ATSRequest):
    return calculate_ats(data)