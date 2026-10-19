from app.models import ATSRequest, Member1ExportRequest, ResumeRequest


def _join_parts(parts):
    return ", ".join(part.strip() for part in parts if part and part.strip())


def _join_lines(lines):
    return " ".join(line.strip() for line in lines if line and line.strip())


LANGUAGE_SKILLS = {
    "c",
    "c++",
    "c#",
    "go",
    "java",
    "javascript",
    "kotlin",
    "php",
    "python",
    "r",
    "ruby",
    "rust",
    "scala",
    "swift",
    "typescript",
}

DATABASE_SKILLS = {
    "cassandra",
    "dynamodb",
    "mariadb",
    "mongodb",
    "mysql",
    "oracle",
    "postgres",
    "postgresql",
    "redis",
    "sqlite",
    "sql",
    "sql server",
}

TOOL_SKILLS = {
    "aws",
    "azure",
    "docker",
    "excel",
    "figma",
    "firebase",
    "gcp",
    "git",
    "github",
    "intellij",
    "jenkins",
    "jira",
    "kubernetes",
    "linux",
    "postman",
    "power bi",
    "tableau",
    "vs code",
    "vscode",
}


def _categorize_skills(skills):
    languages = []
    databases = []
    tools = []
    seen_languages = set()
    seen_databases = set()
    seen_tools = set()

    for skill in skills:
        value = skill.strip()
        if not value:
            continue
        lowered = value.lower()

        if lowered in DATABASE_SKILLS and lowered not in seen_databases:
            seen_databases.add(lowered)
            databases.append(value)
            continue

        if lowered in LANGUAGE_SKILLS and lowered not in seen_languages:
            seen_languages.add(lowered)
            languages.append(value)
            continue

        if lowered in TOOL_SKILLS and lowered not in seen_tools:
            seen_tools.add(lowered)
            tools.append(value)
            continue

        # Keep uncategorized entries visible instead of dropping them.
        if lowered not in seen_tools:
            seen_tools.add(lowered)
            tools.append(value)

    return {
        "languages": ", ".join(languages),
        "frameworks": "",
        "tools": ", ".join(tools),
        "databases": ", ".join(databases),
    }


def map_member1_export_to_resume(data: Member1ExportRequest) -> ResumeRequest:
    primary_education = data.education[0] if data.education else None
    additional_education = data.education[1:] if len(data.education) > 1 else []
    effective_cgpa = (
        primary_education.cgpa
        if primary_education and primary_education.cgpa is not None
        else (data.cgpa or 0.0)
    )

    projects = [
        {
            "title": project.title,
            "description": _join_lines(project.description),
            "tech": project.techStack,
            "duration": _join_parts([project.startDate, project.endDate]),
            "link": project.githubLink or "",
            "highlights": project.description,
        }
        for project in data.projects
    ]

    experience = [
        {
            "role": item.jobTitle,
            "company": item.company,
            "duration": _join_parts([item.startDate, item.endDate]),
            "description": _join_lines(item.responsibilities),
            "location": item.location or "",
            "points": item.responsibilities,
        }
        for item in data.experience
    ]

    responsibilities = [
        achievement.title if achievement.title else achievement.description
        for achievement in data.achievements
        if achievement.title or achievement.description
    ]
    certifications = [
        {
            "name": cert.name,
            "organization": cert.organization or "",
            "year": cert.year or "",
        }
        for cert in data.certifications
        if cert.name
    ]

    return ResumeRequest(
        id=data.id or "",
        name=data.fullName,
        email=data.email,
        phone=data.phone,
        github=data.github,
        linkedin=data.linkedin,
        portfolio=data.portfolio or "",
        profile_image=data.profile_image or "",
        location=data.location or "",
        role=data.role or "",
        summary=data.summary or "",
        template_type=data.template_type or "ats",
        cgpa=effective_cgpa,
        personal_profile=data.personal_profile.model_dump() if data.personal_profile else {},
        education={
            "degree": primary_education.degree if primary_education else "Not Provided",
            "college": primary_education.institution if primary_education else "Not Provided",
            "year": primary_education.year if primary_education else None,
            "cgpa": primary_education.cgpa if primary_education else None,
        },
        education_history=[
            {
                "degree": edu.degree,
                "college": edu.institution,
                "year": edu.year,
                "cgpa": edu.cgpa,
            }
            for edu in additional_education
        ],
        projects=projects,
        experience=experience,
        skills=_categorize_skills(data.skills),
        certifications=certifications,
        responsibilities=responsibilities,
    )


def map_member1_export_to_ats(data: Member1ExportRequest, job_keywords, job_description):
    return ATSRequest(
        resume_skills=data.skills,
        job_keywords=job_keywords,
        job_description=job_description,
    )
