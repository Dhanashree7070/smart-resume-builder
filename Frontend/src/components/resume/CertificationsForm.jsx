function CertificationsForm({ formData, setFormData }) {

  const certifications = Array.isArray(formData.certifications)
    ? formData.certifications
    : [{ name: "", organization: "", year: "" }];

  const handleChange = (index, e) => {
    const updated = [...certifications];
    updated[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      certifications: updated
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...certifications,
        { name: "", organization: "", year: "" }
      ]
    });
  };

  return (
    <div className="flex flex-col gap-6">

      <h3 className="text-lg font-medium">Certifications</h3>

      {certifications.map((cert, index) => (
        <div key={index} className="border p-4 rounded-lg">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="name"
              placeholder="Certification Name"
              value={cert.name || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              name="organization"
              placeholder="Organization"
              value={cert.organization || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              name="year"
              placeholder="Year"
              value={cert.year || ""}
              onChange={(e) => handleChange(index, e)}
              className="border rounded-lg px-3 py-2 w-full"
            />

          </div>

        </div>
      ))}

      <button type="button" onClick={addCertification} className="text-sm">
        + Add More Certifications
      </button>

    </div>
  );
}

export default CertificationsForm;