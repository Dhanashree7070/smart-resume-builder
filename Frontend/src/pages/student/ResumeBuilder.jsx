import { useEffect, useState } from "react";
import ResumePreview from "./ResumePreview";

import template1Img from "../../assets/image (1).png";
import template2Img from "../../assets/image.png";
import template3Img from "../../assets/image (2).png";
import template4Img from "../../assets/image (3).png";
import PersonalInfoForm from "../../components/resume/PersonalInfoForm";
import SkillsForm from "../../components/resume/SkillsForm";
import EducationForm from "../../components/resume/EducationForm";
import ProjectsForm from "../../components/resume/ProjectsForm";
import ExperienceForm from "../../components/resume/ExperienceForm";
import CertificationsForm from "../../components/resume/CertificationsForm";
import ExtraCurricularForm from "../../components/resume/ExtraCurricularForm";

import Stepper from "../../components/ui/Stepper";
import { mapDataToTemplate } from "../../utils/mapDataToTemplate";
import Button from "../../components/ui/Button";
import { getMyProfile, updateProfile } from "../../services/backendApi";
import {
  generateIntro as generateIntroFromAI,
  generateResumePDF,
} from "../../services/aiService";

import IntroForm from "./IntroForm";
import IntroResult from "./IntroResult";

function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [introText, setIntroText] = useState("");

  const steps = [
    "Personal",
    "Skills",
    "Education",
    "Projects",
    "Experience",
    "Certifications",
    "Activities",
    "Template",
    "Preview"
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
    branch: "",
    cgpa: "",
    summary: "",

    skills: [""],

    education: [
      { degree: "", college: "", cgpa: "", year: "" }
    ],

    projects: [
      {
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        startDate: "",
        endDate: ""
      }
    ],

    experience: [
      {
        role: "",
        company: "",
        location: "",
        duration: "",
        description: ""
      }
    ],

    certifications: [
      { name: "", organization: "", year: "" }
    ],

    achievements: [
      { description: "" }
    ]
  });

  useEffect(() => {
    getMyProfile()
      .then((profile) => {
        if (!profile || Object.keys(profile).length === 0) return;

        setFormData((current) => ({
          ...current,
          ...profile,
          skills: profile.skills?.length ? profile.skills : current.skills,
          education: profile.education?.length ? profile.education : current.education,
          projects: profile.projects?.length ? profile.projects : current.projects,
          experience: profile.experience?.length ? profile.experience : current.experience,
          certifications: profile.certifications?.length ? profile.certifications : current.certifications,
          achievements: profile.achievements?.length ? profile.achievements : current.achievements,
        }));
      })
      .catch(() => {
        alert("Please login again before saving resume");
      });
  }, []);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || ""
    });
  };

  const handleSkillsUpdate = (skills) => {
    setFormData({ ...formData, skills });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...(formData[section] || [])];

    updated[index] = {
      ...updated[index],
      [field]: value || ""
    };

    setFormData({
      ...formData,
      [section]: updated
    });
  };

  // ================= SAVE =================
  const handleSaveResume = async () => {
    const mappedData = mapDataToTemplate(formData);

    if (!mappedData.fullName.trim()) {
      alert("Name is required");
      return;
    }

    await updateProfile(mappedData);

    alert("Saved successfully");
  };

  // ================= DOWNLOAD =================
  const handleDownload = async () => {
    const mappedData = {
      ...mapDataToTemplate(formData),
      template_type: selectedTemplate
    };

    if (!mappedData.fullName.trim()) {
      alert("Name is required before downloading");
      return;
    }

    const pdfBlob = await generateResumePDF(mappedData);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${mappedData.fullName || "resume"}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(pdfUrl);
  };

  // ================= INTRO =================
  const generateIntro = async (extraData) => {
    const data = await generateIntroFromAI({
      ...mapDataToTemplate(formData),
      ...extraData,
      template_type: selectedTemplate
    });

    setIntroText(data.self_introduction || data.about_paragraph || "");
    setStep(11);
  };

  // ================= RENDER =================
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm formData={formData} handleChange={handleChange} />;
      case 2:
        return <SkillsForm formData={formData} handleSkillsUpdate={handleSkillsUpdate} />;
      case 3:
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case 4:
        return <ProjectsForm projects={formData.projects} handleArrayChange={handleArrayChange} setFormData={setFormData} />;
      case 5:
        return <ExperienceForm experience={formData.experience} handleArrayChange={handleArrayChange} setFormData={setFormData} />;
      case 6:
        return <CertificationsForm formData={formData} setFormData={setFormData} />;
      case 7:
        return <ExtraCurricularForm extracurricular={formData.achievements} handleArrayChange={handleArrayChange} setFormData={setFormData} />;
      case 8:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

            {[
              { name: "template1", label: "ATS", img: template4Img },
              { name: "template2", label: "Sample 1", img: template1Img },
              { name: "template3", label: "Sample 2", img: template2Img },
              { name: "template4", label: "Sample 4", img: template3Img }
            ].map((tpl) => (
              <div
                key={tpl.name}
                onClick={() => setSelectedTemplate(tpl.name)}
                className={`border-2 rounded-xl cursor-pointer transition transform hover:scale-105 shadow-lg
                  ${selectedTemplate === tpl.name ? "border-blue-600 shadow-2xl" : "border-gray-300"}`}
              >
                <img
                  src={tpl.img}
                  alt={tpl.name}
                  className="w-full h-80 object-cover rounded-t-xl"
                />

                <div className="p-3 text-center font-semibold">
                  {tpl.label}
                </div>
              </div>
            ))}

          </div>
        );
      case 9:
        return (
          <div>
            <ResumePreview
              data={{ ...formData, template_type: selectedTemplate }}
              selectedTemplate={selectedTemplate}
            />
            <Button onClick={handleSaveResume}>Save Resume</Button>
            <Button onClick={handleDownload}>Download PDF</Button>
            <Button onClick={() => setStep(10)}>Generate Intro</Button>
          </div>
        );
      case 10:
        return <IntroForm onGenerate={generateIntro} />;
      case 11:
        return <IntroResult introText={introText} />;
      default:
        return null;
    }
  };

  // ================= RETURN =================
  return (
    <div className="p-6">

      {/* Stepper */}
      <Stepper steps={steps} currentStep={step} setStep={setStep} />

      {/* Content */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between mt-8">

        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 rounded-lg bg-gray-500 text-white"
          >
            ← Back
          </button>
        )}

        {step < 9 && (
          <button
            onClick={() => setStep(step + 1)}
            className="ml-auto px-6 py-2 rounded-lg bg-blue-600 text-white"
          >
            Next →
          </button>
        )}

      </div>

    </div>
  );
}

export default ResumeBuilder;
