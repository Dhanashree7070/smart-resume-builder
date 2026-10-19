export const mapDataToTemplate = (data) => {
  return {
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
    portfolio: data.portfolio || "",
    location: data.location || "",
    branch: data.branch || "",
    cgpa: data.cgpa || data.education?.[0]?.cgpa || "",
    summary: data.summary || "",

    skills: (data.skills || []).filter(s => s && s.trim() !== ""),

    education: (data.education || []).map(e => ({
      degree: e.degree || "",
      college: e.college || e.institution || "",
      year: e.year || "",
      cgpa: e.cgpa || ""
    })),

    projects: (data.projects || []).map(p => ({
      title: p.title || "",
      description: p.description || "",
      techStack: p.techStack || "",
      githubLink: p.githubLink || "",
      startDate: p.startDate || "",
      endDate: p.endDate || ""
    })),

    experience: (data.experience || []).map(exp => ({
      role: exp.role || "",
      company: exp.company || "",
      location: exp.location || "",
      duration: exp.duration || "",
      description: exp.description || ""
    })),

    certifications: data.certifications || [],

    achievements: (data.achievements || []).map(a => ({
      description: a.description || ""
    }))
  };
};
