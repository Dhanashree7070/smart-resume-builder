import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin, registerUser } from "../../services/backendApi";
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    branch: "",
    year: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      fullName: form.name,
      email: form.email,
      password: form.password,
      cgpa: 8.0, // you can add input later
      role: form.role.toUpperCase(), // IMPORTANT
      branch: form.branch,
    };

    const res = form.role === "admin"
      ? await registerAdmin(payload)
      : await registerUser(payload);

    alert(res);

    navigate("/login");

  } catch (err) {
    console.error(err);
    alert(err.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account ??
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <input
            name="name"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="role"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {/* Show only if student */}
          {form.role === "student" && (
            <>
              <input
                name="college"
                placeholder="College Name"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />

              <input
                name="branch"
                placeholder="Branch"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />

              <input
                name="year"
                placeholder="Year"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />
            </>
          )}

          <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;
