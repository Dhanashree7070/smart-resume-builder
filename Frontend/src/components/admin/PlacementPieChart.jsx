import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PlacementPieChart = ({ totalStudents = 0, totalJobs = 0 }) => {
  const data = [
    { name: "Students", value: totalStudents },
    { name: "Jobs", value: totalJobs },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Database Overview</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlacementPieChart;
