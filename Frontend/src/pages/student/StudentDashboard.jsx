import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">

      <h2 className="text-2xl font-semibold text-textPrimary">
        Student Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <div onClick={() => navigate("/student/resume")} className="cursor-pointer">
            <h3 className="text-lg font-medium">Create Resume</h3>
            <p className="text-sm text-textSecondary">
              Build your ATS resume
            </p>
          </div>
        </Card>

        <Card>
        <div
          onClick={() => navigate("/student/profile")}
          className="cursor-pointer"
        >
          <h3 className="text-lg font-medium" >Profile</h3>
          <p className="text-sm text-textSecondary" >Update student details</p>
        </div>
        </Card>

      </div>

    </div>
  );
}

export default StudentDashboard;
