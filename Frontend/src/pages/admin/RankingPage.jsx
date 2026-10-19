import { useEffect, useState } from "react";
import { getJobs, rankStudents } from "../../services/backendApi";

function RankingPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [rankedStudents, setRankedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
      }
    };

    loadJobs();
  }, []);

  const handleRank = async () => {
    if (!selectedJobId) {
      setError("Select a job first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await rankStudents(selectedJobId);
      setRankedStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to rank students");
    } finally {
      setLoading(false);
    }
  };

  const getCgpa = (student) =>
    student.cgpa ?? student.education?.[0]?.cgpa ?? "-";

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-semibold">Candidate Ranking</h2>

      <div className="flex flex-col md:flex-row gap-3">
        <select
          value={selectedJobId}
          onChange={(event) => setSelectedJobId(event.target.value)}
          className="border rounded px-3 py-2 min-w-72"
        >
          <option value="">Select job requirement</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {(job.requiredSkills || []).join(", ") || "Job"} | Min CGPA {job.minCgpa ?? 0}
            </option>
          ))}
        </select>

        <button
          onClick={handleRank}
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Rank Students
        </button>
      </div>

      {loading && <p className="text-gray-600">Ranking students...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {rankedStudents.map((student, index) => (
        <div
          key={student.id || student.email}
          className="bg-gray-800 p-5 rounded text-white shadow"
        >
          <div className="flex justify-between mb-2">
            <strong>
              #{index + 1} {student.fullName || student.email || "Student"}
            </strong>
            <span>{student.matchScore ?? 0}%</span>
          </div>

          <div className="bg-gray-700 h-3 rounded">
            <div
              className="h-3 bg-green-500 rounded"
              style={{ width: `${Math.min(student.matchScore ?? 0, 100)}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-200">
            Skills: {Array.isArray(student.skills) && student.skills.length > 0
              ? student.skills.join(", ")
              : "-"}
          </p>
          <p className="text-sm text-gray-200">CGPA: {getCgpa(student)}</p>
        </div>
      ))}
    </div>
  );
}

export default RankingPage;
