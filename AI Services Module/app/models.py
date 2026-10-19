from typing import List, Optional

from pydantic import BaseModel, Field


class Education(BaseModel):
    degree: str
    college: str
    year: Optional[str] = None
    cgpa: Optional[float] = None


class Project(BaseModel):
    title: str
    description: str
    tech: str = ""
    duration: str = ""
    link: str = ""
    highlights: List[str] = Field(default_factory=list)


class Experience(BaseModel):
    role: str
    company: str
    duration: str
    description: str
    location: str = ""
    points: List[str] = Field(default_factory=list)


class Skills(BaseModel):
    languages: str = ""
    frameworks: str = ""
    tools: str = ""
    databases: str = ""


class Certification(BaseModel):
    name: str
    organization: str = ""
    year: str = ""


class PersonalProfile(BaseModel):
    father_name: str = ""
    mother_name: str = ""
    hobbies: List[str] = Field(default_factory=list)
    languages_spoken: List[str] = Field(default_factory=list)
    strengths: List[str] = Field(default_factory=list)
    career_goal: str = ""


class ResumeRequest(BaseModel):
    id: str = ""
    name: str
    email: str
    phone: str
    github: str = ""
    linkedin: str = ""
    portfolio: str = ""
    profile_image: str = ""
    location: str = ""
    role: str = ""
    summary: str = ""
    template_type: str = "ats"
    cgpa: float
    personal_profile: PersonalProfile = Field(default_factory=PersonalProfile)
    education: Education
    education_history: List[Education] = Field(default_factory=list)
    projects: List[Project] = Field(default_factory=list)
    experience: List[Experience] = Field(default_factory=list)
    skills: Skills
    certifications: List[Certification] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)


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


class IntroResponse(BaseModel):
    headline: str
    about_paragraph: str
    projects_paragraph: str
    experience_paragraph: str
    closing_paragraph: str
    self_introduction: str


class Member1Education(BaseModel):
    degree: str
    institution: str
    year: Optional[str] = None
    cgpa: Optional[float] = None


class Member1Project(BaseModel):
    title: str
    techStack: str = ""
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    description: List[str] = Field(default_factory=list)
    githubLink: Optional[str] = None


class Member1Experience(BaseModel):
    jobTitle: str
    company: str
    location: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    responsibilities: List[str] = Field(default_factory=list)


class Member1Certification(BaseModel):
    name: str
    organization: Optional[str] = None
    year: Optional[str] = None


class Member1Achievement(BaseModel):
    title: str = ""
    description: str = ""


class Member1ExportRequest(BaseModel):
    id: Optional[str] = None
    fullName: str
    email: str
    password: Optional[str] = None
    phone: str
    linkedin: str = ""
    github: str = ""
    portfolio: Optional[str] = None
    profile_image: Optional[str] = None
    location: Optional[str] = None
    cgpa: Optional[float] = None
    role: Optional[str] = None
    summary: Optional[str] = None
    personal_profile: Optional[PersonalProfile] = None
    skills: List[str] = Field(default_factory=list)
    education: List[Member1Education] = Field(default_factory=list)
    projects: List[Member1Project] = Field(default_factory=list)
    experience: List[Member1Experience] = Field(default_factory=list)
    certifications: List[Member1Certification] = Field(default_factory=list)
    achievements: List[Member1Achievement] = Field(default_factory=list)
    template_type: str = "ats"
