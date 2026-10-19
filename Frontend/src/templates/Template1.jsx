import React from "react";

const Template4 = ({ data }) => {
  return (
    <div className="p-6 text-sm">
      <div className="border-b-4 border-blue-700 pb-3">
        <h1 className="text-2xl font-bold text-blue-800">{data.name}</h1>
        <p>
          {[data.email, data.phone, data.location, data.linkedin, data.github, data.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {data.summary && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Profile</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {(data.skills?.languages ||
        data.skills?.frameworks ||
        data.skills?.tools ||
        data.skills?.databases) && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Skills</h2>
          {data.skills.languages && <p>Languages: {data.skills.languages}</p>}
          {data.skills.frameworks && <p>Frameworks: {data.skills.frameworks}</p>}
          {data.skills.tools && <p>Tools: {data.skills.tools}</p>}
          {data.skills.databases && <p>Databases: {data.skills.databases}</p>}
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">
                {exp.role} {exp.company && `- ${exp.company}`}
              </p>
              <p>{[exp.location, exp.duration].filter(Boolean).join(" | ")}</p>
              {exp.description && <p>{exp.description}</p>}
              {exp.points?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">{p.title}</p>
              <p>{[p.tech, p.duration].filter(Boolean).join(" | ")}</p>
              {p.description && <p>{p.description}</p>}
              {p.link && <p>{p.link}</p>}
              {p.highlights?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
        </section>
      )}

      <section className="mt-4">
        <h2 className="font-bold text-blue-800">Education</h2>
        {data.education?.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold">{edu.degree}</p>
            <p>{[edu.college, edu.year].filter(Boolean).join(" | ")}</p>
            {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
          </div>
        ))}
      </section>

      {data.certifications?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Certifications</h2>
          {data.certifications.map((c, i) => (
            <p key={i}>
              {[c.name, c.organization, c.year].filter(Boolean).join(" | ")}
            </p>
          ))}
        </section>
      )}

      {data.responsibilities?.length > 0 && (
        <section className="mt-4">
          <h2 className="font-bold text-blue-800">Activities</h2>
          {data.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template4;
