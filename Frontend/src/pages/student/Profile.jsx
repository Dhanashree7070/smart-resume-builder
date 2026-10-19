import { useEffect, useState } from "react";
import { getMyProfile, updateProfile } from "../../services/backendApi";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setProfile(data);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const data = await updateProfile(formData);

      setProfile(data);
      setIsEditing(false);
      alert("Profile updated successfully");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">

      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* FULL NAME */}
        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* EMAIL (READ ONLY) */}
        <div>
          <label>Email</label>
          <input
            value={formData.email || ""}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* PHONE */}
        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label>Location</label>
          <input
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Branch</label>
          <input
            name="branch"
            value={formData.branch || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>CGPA</label>
          <input
            name="cgpa"
            type="number"
            step="0.1"
            value={formData.cgpa || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* LINKEDIN */}
        <div>
          <label>LinkedIn</label>
          <input
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* GITHUB */}
        <div>
          <label>GitHub</label>
          <input
            name="github"
            value={formData.github || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* PORTFOLIO */}
        <div>
          <label>Portfolio</label>
          <input
            name="portfolio"
            value={formData.portfolio || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SUMMARY */}
        <div className="md:col-span-2">
          <label>Summary</label>
          <textarea
            name="summary"
            value={formData.summary || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex gap-4">

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
