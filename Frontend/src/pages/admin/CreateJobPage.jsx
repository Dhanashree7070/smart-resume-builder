import { useState } from "react";
import { createJob } from "../../services/backendApi";

export default function CreateJobPage() {
  const [job, setJob] = useState({
    skills: "",
    minCgpa: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      requiredSkills: job.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      minCgpa: job.minCgpa ? parseFloat(job.minCgpa) : 0
    };

    try {
      await createJob(payload);
      alert("Job Created Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Create Job</h2>

      <input
        name="skills"
        placeholder="Skills (comma separated)"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        name="minCgpa"
        placeholder="Minimum CGPA"
        type="number"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Create Job
      </button>
    </div>
  );
}
