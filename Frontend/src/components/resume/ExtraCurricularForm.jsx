function ExtraCurricularForm({ extracurricular, handleArrayChange, setFormData }) {

  const safeActivities = Array.isArray(extracurricular)
    ? extracurricular
    : [{ description: "" }];

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [
        ...(Array.isArray(prev.achievements) ? prev.achievements : []),
        {
          description: ""
        }
      ]
    }));
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: (Array.isArray(prev.achievements) ? prev.achievements : []).filter(
        (_, i) => i !== index
      )
    }));
  };

  return (
    <div>

      <h3 className="text-xl font-semibold border-b pb-2">
        Extracurricular Activities
      </h3>

      {safeActivities.map((item, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg">

          <textarea
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Describe your activity / achievement"
            value={item.description || ""}
            onChange={(e) =>
              handleArrayChange("achievements", index, "description", e.target.value)
            }
          />

          <br />

          {safeActivities.length > 1 && (
            <button type="button" onClick={() => removeActivity(index)}>
              Remove Activity
            </button>
          )}

        </div>
      ))}

      <button type="button" onClick={addActivity}>
        + Add Activity
      </button>

    </div>
  );
}

export default ExtraCurricularForm;