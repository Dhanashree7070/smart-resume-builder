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
    profile = data.personal_profile if hasattr(data, "personal_profile") else None

    skills = []
    skills.extend(_split_skill_group(data.skills.languages))
    skills.extend(_split_skill_group(data.skills.frameworks))
    skills.extend(_split_skill_group(data.skills.tools))
    skills.extend(_split_skill_group(data.skills.databases))
    profile_strengths = profile.strengths if profile and profile.strengths else []
    strengths = (skills + profile_strengths)[:8]

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
            "I try to present myself with a balance of technical clarity, confidence, and a willingness to learn from every assignment I take up.",
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
            f"I have worked on projects such as {project_open}. {detail_line} These projects helped me understand how to move from an idea to a usable solution by planning the flow, writing clean code, testing the result, and improving it based on feedback.".strip()
        )
    else:
        projects_paragraph = (
            "I have consistently worked on hands-on academic and practical projects to strengthen implementation skills and system design thinking. Through these activities, I have learned to break larger problems into smaller tasks, stay organized, and keep improving the final output until it is useful and presentable."
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
        experience_paragraph = f"My professional exposure includes {exp_open}. {exp_detail} This experience has helped me become more disciplined about communication, ownership, deadlines, and understanding the practical expectations of a team environment.".strip()
    else:
        experience_paragraph = (
            "While building practical experience, I have focused on disciplined development practices, clear communication, and measurable outcomes in team settings. I am also comfortable learning from mentors, asking the right questions, and improving my work step by step."
        )

    certifications_text = _join_natural([cert.name for cert in data.certifications if cert.name])
    achievements_text = _join_natural([item for item in data.responsibilities if item])
    hobbies_text = _join_natural(profile.hobbies if profile and profile.hobbies else [])
    languages_text = _join_natural(profile.languages_spoken if profile and profile.languages_spoken else [])
    parents = []
    if profile and profile.father_name:
        parents.append(f"father {profile.father_name}")
    if profile and profile.mother_name:
        parents.append(f"mother {profile.mother_name}")
    parents_text = _join_natural(parents)
    career_goal = profile.career_goal.strip() if profile and profile.career_goal else ""
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
    if parents_text:
        closing_chunks.append(f"I come from a supportive family and often mention my {parents_text} as key motivation in my journey.")
    if hobbies_text:
        closing_chunks.append(f"My hobbies include {hobbies_text}, which help me stay creative and disciplined.")
    if languages_text:
        closing_chunks.append(f"I am comfortable communicating in {languages_text}.")
    if career_goal:
        closing_chunks.append(f"My long-term goal is to {career_goal}.")
    closing_chunks.append(
        "I am looking to contribute to a growth-focused team where I can build reliable solutions, learn quickly, and deliver meaningful impact."
    )
    closing_chunks.append(
        "If I get the opportunity, I would like to use my academic foundation, project experience, and consistency to add value from the beginning while continuing to grow as a professional."
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
