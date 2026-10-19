import { AI_BASE_URL } from "../config/api";

const parseJsonResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || "AI service request failed");
  }

  return data;
};

export const generateIntro = async (data) => {
  const res = await fetch(`${AI_BASE_URL}/generate-intro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJsonResponse(res);
};

export const generateResumePDF = async (data) => {
  const res = await fetch(`${AI_BASE_URL}/generate-resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to generate resume PDF");
  }

  return res.blob();
};

export const generateResumeHTML = async (data) => {
  const res = await fetch(`${AI_BASE_URL}/generate-resume-html`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to generate resume preview");
  }

  return res.text();
};

export const getATSScore = async (data) => {
  const res = await fetch(`${AI_BASE_URL}/ats-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJsonResponse(res);
};
