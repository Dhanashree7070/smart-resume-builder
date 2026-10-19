function EducationForm({ formData, setFormData }) {

  const education = Array.isArray(formData.education)
    ? formData.education
    : [{ degree: "", college: "", cgpa: "", year: "" }];

  const handleChange = (index, e) => {
    const updated = [...education];

    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value || ""
    };

    setFormData({
      ...formData,
      education: updated
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...education,
        { degree: "", college: "", cgpa: "", year: "" }
      ]
    });
  };

  return (
    <div className="flex flex-col gap-6">

      <h3 className="text-xl font-semibold border-b pb-2">
        Education
      </h3>

      {education.map((edu, index) => (
        <div key={index} className="border p-4 rounded-lg">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="degree"
              placeholder="Degree"
              value={edu.degree || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              name="college"
              placeholder="College"
              value={edu.college || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              name="cgpa"
              placeholder="CGPA / %"
              value={edu.cgpa || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              name="year"
              placeholder="Year"
              value={edu.year || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

          </div>

        </div>
      ))}

      <button onClick={addEducation} className="text-primary text-sm">
        + Add More Education
      </button>

    </div>
  );
}

export default EducationForm;