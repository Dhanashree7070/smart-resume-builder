function SkillsForm({ formData, handleSkillsUpdate }) {

  const skills = Array.isArray(formData.skills) ? formData.skills : [""];

  const handleSkillChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    handleSkillsUpdate(updated);
  };

  const addSkill = () => {
    handleSkillsUpdate([...skills, ""]);
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    handleSkillsUpdate(updated);
  };

  return (
    <div className="flex flex-col gap-6">

      <h3 className="text-xl font-semibold border-b pb-2">
        Skills
      </h3>

      <div className="flex flex-col gap-3">

        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-center">

            <input
              type="text"
              placeholder="Enter your skills"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500 font-bold px-2"
              >
                X
              </button>
            )}

          </div>
        ))}

        <button
          type="button"
          onClick={addSkill}
          className="border rounded-lg px-3 py-2 w-full"
        >
          + Add Skill
        </button>

      </div>

    </div>
  );
}

export default SkillsForm;