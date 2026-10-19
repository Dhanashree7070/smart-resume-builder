import { useState } from "react";

export default function IntroForm({ onGenerate }) {
  const [data, setData] = useState({
    hobbies: "",
    strengths: "",
    family: "",
    goals: ""
  });

  return (
    <div className="flex flex-col gap-4">
      <h3>Additional Details</h3>

      <input placeholder="Hobbies"
        onChange={(e) => setData({ ...data, hobbies: e.target.value })}
      />

      <input placeholder="Strengths"
        onChange={(e) => setData({ ...data, strengths: e.target.value })}
      />

      <input placeholder="Family Background"
        onChange={(e) => setData({ ...data, family: e.target.value })}
      />

      <input placeholder="Career Goals"
        onChange={(e) => setData({ ...data, goals: e.target.value })}
      />

      <button onClick={() => onGenerate(data)}>
        Generate Introduction
      </button>
    </div>
  );
}