import React from "react";

const Template3 = ({ data }) => {
  return (
    <div className="p-6 text-sm">

      <h1 className="text-xl font-bold">{data.name}</h1>

      <p>
        {data.location && `${data.location} | `}
        {data.phone} | {data.email}
        {data.portfolio && ` | ${data.portfolio}`}
        {data.linkedin && ` | ${data.linkedin}`}
        {data.github && ` | ${data.github}`}
      </p>

      {/* Summary */}
      {data.summary && (
        <>
          <h2 className="font-bold mt-4">
            Professional Summary
          </h2>
          <p>{data.summary}</p>
        </>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">
            Awards and Certifications
          </h2>
          {data.certifications.map((c, i) => (
            <p key={i}>
              {c.name}
              {c.organization && ` | ${c.organization}`}
              {c.year && ` | ${c.year}`}
            </p>
          ))}
        </>
      )}

      {/* Skills */}
      {(data.skills?.languages ||
        data.skills?.frameworks ||
        data.skills?.tools ||
        data.skills?.databases) && (
        <>
          <h2 className="font-bold mt-4">Technical Skills</h2>
          {data.skills.languages && (
            <p>Languages: {data.skills.languages}</p>
          )}
          {data.skills.frameworks && (
            <p>Frameworks: {data.skills.frameworks}</p>
          )}
          {data.skills.tools && (
            <p>DevOps and API Tools: {data.skills.tools}</p>
          )}
          {data.skills.databases && (
            <p>Cloud and Databases: {data.skills.databases}</p>
          )}
        </>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i}>
              <p>
                {exp.role} | {exp.company}
              </p>
              <p>{exp.duration}</p>
              {exp.location && <p>{exp.location}</p>}
              {exp.description && <p>{exp.description}</p>}
              {exp.points?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
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
          <h2 className="font-bold mt-4">Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i}>
              <p className="font-semibold">{p.title}</p>
              {p.duration && <p>{p.duration}</p>}
              {p.tech && <p>{p.tech}</p>}
              {p.description && <p>{p.description}</p>}
              {p.highlights?.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </div>
          ))}
        </>
      )}

      {/* Activities */}
      {data.responsibilities?.length > 0 && (
        <>
          <h2 className="font-bold mt-4">
            Leadership and Activities
          </h2>
          {data.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </>
      )}
    </div>
  );
};

export default Template3;