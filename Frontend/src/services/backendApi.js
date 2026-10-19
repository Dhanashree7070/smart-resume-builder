import { BACKEND_BASE_URL } from "../config/api";

const BASE_URL = BACKEND_BASE_URL;

// 🔐 Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const getErrorMessage = async (res, fallback) => {
  const text = await res.text().catch(() => "");

  if (!text) return fallback;

  try {
    const data = JSON.parse(text);
    return data.message || data.error || data.detail || text;
  } catch {
    return text;
  }
};

// ================= AUTH =================

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Invalid credentials");
  }

  return text;
};

export const loginAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Invalid credentials");
  }

  return text;
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Registration failed");
  }

  return text;
};

export const registerAdmin = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/admin/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Registration failed");
  }

  return text;
};

// ================= STUDENT =================

export const getMyProfile = async () => {
  const res = await fetch(`${BASE_URL}/student/me`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const updateProfile = async (data) => {
  const res = await fetch(`${BASE_URL}/student/update`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Please login again before saving profile");
  }

  return res.json();
};

export const getResume = async () => {
  const res = await fetch(`${BASE_URL}/student/resume`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const exportResume = async () => {
  const res = await fetch(`${BASE_URL}/student/resume/export`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

// ================= ADMIN =================

export const getAllStudents = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.skill) params.set("skill", filters.skill);
  if (filters.branch) params.set("branch", filters.branch);
  if (filters.minCgpa) params.set("minCgpa", filters.minCgpa);

  const query = params.toString();
  const res = await fetch(`${BASE_URL}/admin/students${query ? `?${query}` : ""}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }

  return res.json();
};

export const createJob = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/job`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return res.json();
};

export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/admin/jobs`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

export const rankStudents = async (jobId) => {
  const res = await fetch(`${BASE_URL}/admin/rank/${jobId}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Failed to rank students"));
  }

  return res.json();
};
