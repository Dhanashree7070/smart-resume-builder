from typing import List, Optional
from pydantic import BaseModel, Field


# ================= EDUCATION =================
class Education(BaseModel):
    degree: str
    institution: str
    year: Optional[str] = None
    cgpa: Optional[float] = None


# ================= PROJECT =================
class Project(BaseModel):
    title: str
    techStack: str = ""
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    description: List[str] = Field(default_factory=list)
    githubLink: Optional[str] = None


# ================= EXPERIENCE =================
class Experience(BaseModel):
    jobTitle: str
    company: str
    location: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    responsibilities: List[str] = Field(default_factory=list)


# ================= SKILLS =================
class Skills(BaseModel):
    languages: str = ""
    frameworks: str = ""
    tools: str = ""
    databases: str = ""


# ================= CERTIFICATION =================
class Certification(BaseModel):
    name: str
    organization: Optional[str] = None
    year: Optional[str] = None


# ================= ACHIEVEMENT =================
class Achievement(BaseModel):
    description: str


# ================= MAIN MODEL =================
class ResumeRequest(BaseModel):
    fullName: str
    email: str
    phone: str

    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    portfolio: Optional[str] = ""
    location: Optional[str] = ""

    summary: Optional[str] = ""

    skills: Skills

    education: List[Education] = Field(default_factory=list)
    projects: List[Project] = Field(default_factory=list)
    experience: List[Experience] = Field(default_factory=list)
    certifications: List[Certification] = Field(default_factory=list)
    achievements: List[Achievement] = Field(default_factory=list)

    template_type: str = "template1"


# ================= ATS =================
class ATSRequest(BaseModel):
    resume_skills: List[str] = Field(default_factory=list)
    job_keywords: List[str] = Field(default_factory=list)
    job_description: str = ""


class ATSResponse(BaseModel):
    ats_score: float
    matched_keywords: List[str]
    partial_matches: List[str]
    missing_keywords: List[str]
    suggestions: List[str]


# ================= INTRO =================
class IntroResponse(BaseModel):
    headline: str
    about_paragraph: str
    projects_paragraph: str
    experience_paragraph: str
    closing_paragraph: str
    self_introduction: str