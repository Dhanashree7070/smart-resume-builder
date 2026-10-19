AI Powered Resume Builder

Overview

This project is the Member 2 Python microservice for the team placement platform. It runs independently and provides:

- resume PDF generation
- structured self-introduction generation
- ATS scoring with keyword suggestions

Tech Stack

- Python
- FastAPI
- Jinja2
- WeasyPrint
- spaCy (optional for future NLP improvements)

Run Locally

1. Open PowerShell in this folder:
   `C:\Users\hp\OneDrive\Desktop\AI Powered Resume Builder`
2. Activate the virtual environment:
   `.\venv\Scripts\Activate.ps1`
3. Install dependencies if needed:
   `pip install -r requirements.txt`
4. Start the server:
   `uvicorn app.main:app --reload`
5. Open Swagger:
   `http://127.0.0.1:8000/docs`

Available APIs

1. `POST /generate-resume`
   Generates a PDF resume from structured student data.

2. `POST /generate-intro`
   Returns a structured self-introduction with headline and key strengths.

3. `POST /ats-score`
   Evaluates keyword match between a student profile and a job requirement.

Resume Input Example

Use this body for both `POST /generate-resume` and `POST /generate-intro`.

```json
{
  "name": "Rahul Patil",
  "phone": "+91 9876543210",
  "email": "rahul@gmail.com",
  "github": "https://github.com/rahul",
  "linkedin": "https://linkedin.com/in/rahul",
  "cgpa": 8.5,
  "template_type": "attractive",
  "education": {
    "degree": "BTech Computer Science",
    "college": "XYZ University"
  },
  "projects": [
    {
      "title": "Chat Application",
      "description": "Realtime messaging system with authentication and live messaging.",
      "tech": "React, Firebase"
    }
  ],
  "experience": [
    {
      "role": "Intern",
      "company": "ABC Tech",
      "duration": "3 months",
      "description": "Worked on backend APIs and improved response performance."
    }
  ],
  "skills": {
    "languages": "Java, Python",
    "frameworks": "Spring Boot, React",
    "tools": "Git, VS Code",
    "databases": "MySQL, MongoDB"
  },
  "responsibilities": [
    "Tech Club Coordinator",
    "Hackathon Organizer"
  ]
}
```

Template Options

- `template_type: "attractive"` uses the polished demo-friendly template
- `template_type: "ats"` uses a plain strict ATS-focused template for job applications

ATS Input Example

```json
{
  "resume_skills": [
    "Java",
    "Python",
    "Spring Boot",
    "REST APIs",
    "MySQL"
  ],
  "job_keywords": [
    "Java",
    "Spring Boot",
    "SQL"
  ],
  "job_description": "Looking for REST APIs, Java, SQL, teamwork"
}
```

Example ATS Output

```json
{
  "ats_score": 70,
  "matched_keywords": [
    "java",
    "rest apis",
    "spring boot"
  ],
  "partial_matches": [
    "sql"
  ],
  "missing_keywords": [
    "teamwork"
  ],
  "suggestions": [
    "Add or highlight 'teamwork' in skills, projects, or experience."
  ]
}
```

Integration Notes For Team

Student/Auth Backend Integration

- Member 1 should send structured student profile JSON to this service.
- The payload shape should match the `ResumeRequest` schema from Swagger.
- Student profile fields can be transformed into this JSON before calling the APIs.

Admin/Ranking Backend Integration

- Member 3 can send job requirement keywords to `POST /ats-score`.
- `job_keywords` can come from skills/requirements entered by admin.
- `job_description` can be the full job posting text for richer ATS extraction.

Frontend Integration

- Member 4 can call:
  - `POST /generate-resume` for resume download
  - `POST /generate-intro` to preview intro text
  - `POST /ats-score` to show ATS fit and suggestions

Suggested Integration Flow

1. Frontend collects student profile data.
2. Student/Auth backend stores and returns structured data.
3. Frontend or backend forwards that data to this Python service.
4. This service returns PDF resume, intro content, or ATS analysis.

Future Improvements

- extract skills from full resume text using spaCy
- add multiple resume themes
- add section hiding for empty data
- add unit tests for API routes
