import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border p-6">

        <h2 className="text-xl font-semibold text-primary mb-8">
          ATS Recruiter
        </h2>

        <nav className="flex flex-col gap-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-textPrimary hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-textPrimary hover:bg-gray-100"
              }`
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/admin/ranking"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-textPrimary hover:bg-gray-100"
              }`
            }
          >
            Ranking
          </NavLink>

          <NavLink
            to="/admin/create-job"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-textPrimary hover:bg-gray-100"
              }`
            }
          >
            Create Job
          </NavLink>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;
