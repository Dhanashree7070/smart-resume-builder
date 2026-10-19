function ExperienceForm({ experience, handleArrayChange, setFormData }) {

  const safeExperience = Array.isArray(experience)
    ? experience
    : [
        {
          role: "",
          company: "",
          location: "",
          duration: "",
          description: ""
        }
      ];

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...(Array.isArray(prev.experience) ? prev.experience : []),
        {
          role: "",
          company: "",
          location: "",
          duration: "",
          description: ""
        }
      ]
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: (Array.isArray(prev.experience) ? prev.experience : []).filter(
        (_, i) => i !== index
      )
    }));
  };

  return (
    <div>

      <h3 className="text-xl font-semibold border-b pb-2">
        Experience
      </h3>

      {safeExperience.map((exp, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg">

          <input
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Company"
            value={exp.company || ""}
            onChange={(e) =>
              handleArrayChange("experience", index, "company", e.target.value)
            }
          />

          <br /><br />

          <input
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Role"
            value={exp.role || ""}
            onChange={(e) =>
              handleArrayChange("experience", index, "role", e.target.value)
            }
          />

          <br /><br />

          <input
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Location"
            value={exp.location || ""}
            onChange={(e) =>
              handleArrayChange("experience", index, "location", e.target.value)
            }
          />

          <br /><br />

          <input
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Duration (e.g. Jan 2024 - Mar 2024)"
            value={exp.duration || ""}
            onChange={(e) =>
              handleArrayChange("experience", index, "duration", e.target.value)
            }
          />

          <br /><br />

          <textarea
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Work Description"
            value={exp.description || ""}
            onChange={(e) =>
              handleArrayChange("experience", index, "description", e.target.value)
            }
          />

          <br />

          {safeExperience.length > 1 && (
            <button type="button" onClick={() => removeExperience(index)}>
              Remove Experience
            </button>
          )}

        </div>
      ))}

      <button type="button" onClick={addExperience}>
        + Add Experience
      </button>

    </div>
  );
}

export default ExperienceForm;