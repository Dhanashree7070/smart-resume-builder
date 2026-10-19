import React from "react";

const Template2 = ({ data }) => {
  return (
    <div className="p-6 text-sm">

      <h1 className="text-xl font-bold">{data.name}</h1>

      <p>
        {data.phone} | {data.email}
        {data.github && ` | ${data.github}`}
        {data.linkedin && ` | ${data.linkedin}`}
        {data.portfolio && ` | ${data.portfolio}`}
        {data.location && ` | ${data.location}`}
      </p>

      {data.summary && (
        <>
          <h2 className="font-bold mt-4">Summary</h2>
          <p>{data.summary}</p>
        </>
      )}

      {/* Education */}
      <h2 className="font-bold mt-4">Education</h2>
      {data.education?.map((edu, i) => (
        <div key={i}>
          <p>{edu.degree}</p>
          <p>{edu.college} {edu.year && `| ${edu.year}`}</p>
          <p>CGPA: {edu.cgpa}</p>
        </div>
      ))}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Personal Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i}>
              <p className="font-semibold">{p.title}</p>
              {p.duration && <p>{p.duration}</p>}
              {p.tech && <p>Technology Used: {p.tech}</p>}
              {p.description && <p>{p.description}</p>}
              {p.highlights?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
        </>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i}>
              <p className="font-semibold">{exp.role}</p>
              <p>{exp.duration}</p>
              <p>
                {exp.company}
                {exp.location && ` | ${exp.location}`}
              </p>
              {exp.description && <p>{exp.description}</p>}
              {exp.points?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {(data.skills?.languages ||
        data.skills?.frameworks ||
        data.skills?.tools ||
        data.skills?.databases) && (
        <>
          <h2 className="font-bold mt-4">
            Technical Skills and Interests
          </h2>
          {data.skills.languages && (
            <p>Languages: {data.skills.languages}</p>
          )}
          {data.skills.frameworks && (
            <p>Frameworks: {data.skills.frameworks}</p>
          )}
          {data.skills.tools && <p>Tools: {data.skills.tools}</p>}
          {data.skills.databases && (
            <p>Cloud/Databases: {data.skills.databases}</p>
          )}
        </>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Certifications</h2>
          {data.certifications.map((c, i) => (
            <p key={i}>
              {c.name}
              {c.organization && ` | ${c.organization}`}
              {c.year && ` | ${c.year}`}
            </p>
          ))}
        </>
      )}

      {/* Responsibilities */}
      {data.responsibilities?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">
            Positions of Responsibility
          </h2>
          {data.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </>
      )}
    </div>
  );
};

export default Template2;