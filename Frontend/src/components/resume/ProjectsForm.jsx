function ProjectsForm({ projects, handleArrayChange, setFormData }) {

  const safeProjects = Array.isArray(projects)
    ? projects
    : [
        {
          title: "",
          description: "",
          techStack: "",
          githubLink: "",
          startDate: "",
          endDate: ""
        }
      ];

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...(Array.isArray(prev.projects) ? prev.projects : []),
        {
          title: "",
          description: "",
          techStack: "",
          githubLink: "",
          startDate: "",
          endDate: ""
        }
      ]
    }));
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: (Array.isArray(prev.projects) ? prev.projects : []).filter(
        (_, i) => i !== index
      )
    }));
  };

  return (
    <div className="form-section">

      <h3 className="text-xl font-semibold border-b pb-4 mb-6">
        Projects
      </h3>

      {safeProjects.map((project, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg">

          <div className="form-row">

            <div className="form-group">
              <label>Project Title</label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                value={project.title || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "title", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Tech Stack</label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                value={project.techStack || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "techStack", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>GitHub Link</label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                value={project.githubLink || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "githubLink", e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 w-full"
                value={project.startDate || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "startDate", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 w-full"
                value={project.endDate || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "endDate", e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Project Description</label>
              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  handleArrayChange("projects", index, "description", e.target.value)
                }
              />
            </div>
          </div>

          {safeProjects.length > 1 && (
            <button type="button" onClick={() => removeProject(index)}>
              Remove Project
            </button>
          )}

        </div>
      ))}

      <button type="button" onClick={addProject}>
        + Add Project
      </button>

    </div>
  );
}

export default ProjectsForm;