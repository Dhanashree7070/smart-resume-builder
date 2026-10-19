import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import PlacementPieChart from "../../components/admin/PlacementPieChart"
import { getAllStudents, getJobs } from "../../services/backendApi";

function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [students, jobs] = await Promise.all([getAllStudents(), getJobs()]);
        setStudentCount(Array.isArray(students) ? students.length : 0);
        setJobCount(Array.isArray(jobs) ? jobs.length : 0);
      } catch (err) {
        console.log(err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="flex flex-col gap-6">

      <h2 className="text-2xl font-semibold text-textPrimary">
        Admin Dashboard
      </h2>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* LEFT: Pie Chart */}
          <div className="md:row-span-3">
            <Card className="h-full flex items-center justify-center">
              <PlacementPieChart totalStudents={studentCount} totalJobs={jobCount} />
            </Card>
          </div>

          {/* RIGHT: Cards */}
          <Card>
            <h3 className="text-sm text-textSecondary">Total Students</h3>
            <p className="text-2xl font-semibold">{studentCount}</p>
          </Card>

          <Card>
            <h3 className="text-sm text-textSecondary">Open Jobs</h3>
            <p className="text-2xl font-semibold">{jobCount}</p>
          </Card>

          <Card>
            <h3 className="text-sm text-textSecondary">Registered Users</h3>
            <p className="text-2xl font-semibold">{studentCount}</p>
          </Card>

      </div>

    </div>
  );
}

export default AdminDashboard;
