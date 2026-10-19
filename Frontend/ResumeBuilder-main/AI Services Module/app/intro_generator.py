def _split_skill_group(value: str):
    return [item.strip() for item in value.split(",") if item.strip()]


def _join_natural(items):
    values = [item for item in items if item]
    if not values:
        return ""
    if len(values) == 1:
        return values[0]
    if len(values) == 2:
        return f"{values[0]} and {values[1]}"
    return f"{', '.join(values[:-1])}, and {values[-1]}"


def _project_summary(project):
    text = project.title
    if project.tech:
        text += f" using {project.tech}"
    if project.duration:
        text += f" ({project.duration})"
    return text


def _experience_summary(exp):
    text = f"{exp.role} at {exp.company}"
    if exp.location:
        text += f", {exp.location}"
    if exp.duration:
        text += f" ({exp.duration})"
    return text


def generate_intro(data):
    skills = []
    skills.extend(_split_skill_group(data.skills.languages))
    skills.extend(_split_skill_group(data.skills.frameworks))
    skills.extend(_split_skill_group(data.skills.tools))
    skills.extend(_split_skill_group(data.skills.databases))
    strengths = skills[:8]

    education_text = ""
    if data.education and data.education.degree and data.education.college:
        education_text = f"{data.education.degree} at {data.education.college}"
    elif data.education:
        education_text = data.education.degree or data.education.college or ""

    about_parts = []
    if data.name:
        about_parts.append(f"I am {data.name}")
    if data.role:
        about_parts.append(f"currently working toward opportunities as a {data.role.lower()}")
    if education_text:
        about_parts.append(f"with academic background in {education_text}")
    if data.cgpa and data.cgpa > 0:
        about_parts.append(f"and a CGPA of {data.cgpa}")

    about_sentence = " ".join(about_parts).strip()
    if about_sentence and not about_sentence.endswith("."):
        about_sentence += "."

    strengths_sentence = (
        f"My strongest areas include {_join_natural(strengths[:5])}, and I am comfortable applying these in real project environments."
        if strengths
        else "I have developed a strong foundation in software engineering, collaboration, and practical problem solving."
    )

    about_paragraph = " ".join(
        part
        for part in [
            about_sentence,
            data.summary.strip() if data.summary else "",
            strengths_sentence,
        ]
        if part
    )

    if data.projects:
        top_projects = data.projects[:2]
        project_open = _join_natural([_project_summary(project) for project in top_projects])
        bullet_points = []
        for project in top_projects:
            bullet_points.extend([point for point in project.highlights[:3] if point])
        detail_line = ""
        if bullet_points:
            detail_line = (
                f"Key contributions include {_join_natural(bullet_points[:4])}."
            )
        projects_paragraph = (
            f"I have worked on projects such as {project_open}. {detail_line}".strip()
        )
    else:
        projects_paragraph = (
            "I have consistently worked on hands-on academic and practical projects to strengthen implementation skills and system design thinking."
        )

    if data.experience:
        top_experiences = data.experience[:2]
        exp_open = _join_natural([_experience_summary(exp) for exp in top_experiences])
        exp_points = []
        for exp in top_experiences:
            exp_points.extend([point for point in exp.points[:3] if point])
        exp_detail = ""
        if exp_points:
            exp_detail = f"During these roles, I contributed by {_join_natural(exp_points[:4])}."
        experience_paragraph = f"My professional exposure includes {exp_open}. {exp_detail}".strip()
    else:
        experience_paragraph = (
            "While building practical experience, I have focused on disciplined development practices, clear communication, and measurable outcomes in team settings."
        )

    certifications_text = _join_natural([cert.name for cert in data.certifications if cert.name])
    achievements_text = _join_natural([item for item in data.responsibilities if item])
    location_text = f"Based in {data.location}. " if data.location else ""
    contact_bits = _join_natural(
        [bit for bit in [data.email, data.phone, data.linkedin, data.github, data.portfolio] if bit]
    )
    contact_text = f"For further discussion, I can be reached via {contact_bits}." if contact_bits else ""

    closing_chunks = []
    if certifications_text:
        closing_chunks.append(f"I have also completed certifications such as {certifications_text}.")
    if achievements_text:
        closing_chunks.append(f"Beyond academics, I have taken initiatives including {achievements_text}.")
    closing_chunks.append(
        "I am looking to contribute to a growth-focused team where I can build reliable solutions, learn quickly, and deliver meaningful impact."
    )
    if location_text:
        closing_chunks.append(location_text.strip())
    if contact_text:
        closing_chunks.append(contact_text)
    closing_paragraph = " ".join(closing_chunks)

    self_introduction = (
        about_paragraph + "\n\n" + projects_paragraph + "\n\n" + experience_paragraph + "\n\n" + closing_paragraph
    )

    return {
        "headline": f"{data.education.degree} | {data.role if data.role else 'Aspiring Software Developer'}",
        "about_paragraph": about_paragraph,
        "projects_paragraph": projects_paragraph,
        "experience_paragraph": experience_paragraph,
        "closing_paragraph": closing_paragraph,
        "self_introduction": self_introduction,
    }
