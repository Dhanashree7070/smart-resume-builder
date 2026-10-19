import { useEffect, useState } from "react";
import { getAllStudents } from "../../services/backendApi";

function StudentList() {
  const [skillFilter, setSkillFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async (filters = {}) => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllStudents(filters);
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleFilter = () => {
    loadStudents({
      skill: skillFilter.trim(),
      branch: branchFilter.trim(),
      minCgpa: cgpaFilter,
    });
  };

  const handleReset = () => {
    setSkillFilter("");
    setBranchFilter("");
    setCgpaFilter("");
    loadStudents();
  };

  const getCgpa = (student) =>
    student.cgpa ?? student.education?.[0]?.cgpa ?? "-";

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-semibold">Students</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          placeholder="Skill"
          value={skillFilter}
          onChange={(event) => setSkillFilter(event.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          placeholder="Branch"
          value={branchFilter}
          onChange={(event) => setBranchFilter(event.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          placeholder="Minimum CGPA"
          value={cgpaFilter}
          onChange={(event) => setCgpaFilter(event.target.value)}
          type="number"
          step="0.1"
          className="border rounded px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Filter
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 rounded px-4 py-2"
          >
            Reset
          </button>
        </div>
      </div>

      {loading && <p className="text-gray-600">Loading students...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded border">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Skills</th>
              <th className="p-3 text-left">CGPA</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id || student.email} className="border-t">
                <td className="p-3">{student.fullName || "-"}</td>
                <td className="p-3">{student.email || "-"}</td>
                <td className="p-3">{student.branch || "-"}</td>
                <td className="p-3">
                  {Array.isArray(student.skills) && student.skills.length > 0
                    ? student.skills.join(", ")
                    : "-"}
                </td>
                <td className="p-3">{getCgpa(student)}</td>
              </tr>
            ))}

            {!loading && students.length === 0 && (
              <tr>
                <td className="p-3 text-center text-gray-500" colSpan="5">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
