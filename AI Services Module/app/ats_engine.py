import re
from typing import Iterable, List, Set

STOP_PREFIXES = (
    "looking for ",
    "experience with ",
    "experience in ",
    "knowledge of ",
    "proficiency in ",
    "expertise in ",
    "must have ",
    "should have ",
    "hands on ",
)


def _normalize_keyword(value: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9+#.\s]", " ", value.lower())
    return " ".join(cleaned.split())


def _unique_keywords(values: Iterable[str]) -> List[str]:
    seen = set()
    ordered = []

    for value in values:
        normalized = _normalize_keyword(value)
        if normalized and normalized not in seen:
            seen.add(normalized)
            ordered.append(normalized)

    return ordered


def _extract_keywords_from_description(description: str) -> List[str]:
    parts = re.split(r"[,\n;/]", description)
    cleaned_parts = []

    for part in parts:
        normalized = _normalize_keyword(part)
        for prefix in STOP_PREFIXES:
            if normalized.startswith(prefix):
                normalized = normalized[len(prefix) :].strip()
                break
        cleaned_parts.append(normalized)

    return _unique_keywords(cleaned_parts)


def _find_partial_matches(
    resume_keywords: List[str], job_keywords: List[str], exact_matches: Set[str]
) -> List[str]:
    partial_matches = []

    for keyword in job_keywords:
        if keyword in exact_matches:
            continue

        for resume_keyword in resume_keywords:
            if keyword in resume_keyword or resume_keyword in keyword:
                partial_matches.append(keyword)
                break

    return partial_matches


def calculate_ats(data):
    resume_keywords = _unique_keywords(data.resume_skills)
    job_keywords = _unique_keywords(data.job_keywords)

    if data.job_description:
        job_keywords.extend(
            keyword
            for keyword in _extract_keywords_from_description(data.job_description)
            if keyword not in job_keywords
        )

    if not job_keywords:
        return {
            "ats_score": 0.0,
            "matched_keywords": [],
            "partial_matches": [],
            "missing_keywords": [],
            "suggestions": ["Add job keywords or job description to evaluate ATS fit."],
        }

    exact_matches = set(resume_keywords).intersection(job_keywords)
    partial_matches = _find_partial_matches(resume_keywords, job_keywords, exact_matches)

    matched_score = len(exact_matches) * 1.0
    partial_score = len(partial_matches) * 0.5
    raw_score = (matched_score + partial_score) / len(job_keywords)
    ats_score = min(round(raw_score * 100, 2), 100.0)

    missing_keywords = [
        keyword
        for keyword in job_keywords
        if keyword not in exact_matches and keyword not in partial_matches
    ]

    suggestions = [
        f"Add or highlight '{keyword}' in skills, projects, or experience."
        for keyword in missing_keywords[:5]
    ]

    return {
        "ats_score": ats_score,
        "matched_keywords": sorted(exact_matches),
        "partial_matches": partial_matches,
        "missing_keywords": missing_keywords,
        "suggestions": suggestions,
    }
