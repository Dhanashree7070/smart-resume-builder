from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

TEMPLATE_DIR = Path(__file__).resolve().parent.parent / "templates"

env = Environment(
    loader=FileSystemLoader(str(TEMPLATE_DIR)),
    autoescape=select_autoescape(["html", "xml"]),
)

TEMPLATE_MAP = {
    "template1": "resume_template_ats.html",
    "template2": "resume_template_sample1.html",
    "template3": "resume_template_sample2.html",
    "template4": "resume_template_sample4.html",
    # Backward compatibility aliases
    "ats": "resume_template_ats.html",
    "sample1": "resume_template_sample1.html",
    "sample2": "resume_template_sample2.html",
    "sample4": "resume_template_sample4.html",
}


def generate_resume(data):
    template_key = (data.get("template_type") or "template1").strip().lower()
    template_name = TEMPLATE_MAP.get(template_key, TEMPLATE_MAP["template1"])
    template = env.get_template(template_name)
    return template.render(data)
