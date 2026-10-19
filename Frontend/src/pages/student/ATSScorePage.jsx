import { useState } from "react";
import { getATSScore } from "../../services/aiService";

export default function ATSScorePage({ studentData = {} }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeSkills, setResumeSkills] = useState(
    Array.isArray(studentData.skills) ? studentData.skills.join(", ") : ""
  );
  const [jobKeywords, setJobKeywords] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const splitKeywords = (value) =>
    value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const handleATS = async () => {
    setLoading(true);
    try {
      const data = await getATSScore({
        resume_skills: splitKeywords(resumeSkills),
        job_keywords: splitKeywords(jobKeywords),
        job_description: jobDescription,
      });

      setResult(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <textarea
        value={resumeSkills}
        onChange={(event) => setResumeSkills(event.target.value)}
        placeholder="Resume skills, separated by commas"
        className="w-full min-h-24 border rounded p-3"
      />

      <textarea
        value={jobKeywords}
        onChange={(event) => setJobKeywords(event.target.value)}
        placeholder="Job keywords, separated by commas"
        className="w-full min-h-24 border rounded p-3"
      />

      <textarea
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste job description"
        className="w-full min-h-32 border rounded p-3"
      />

      <button
        onClick={handleATS}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Checking..." : "Check ATS Score"}
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">ATS Score: {result.ats_score}</h2>

          <h3 className="mt-4 font-semibold">Missing Keywords:</h3>
          <ul className="list-disc ml-6">
            {result.missing_keywords.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
