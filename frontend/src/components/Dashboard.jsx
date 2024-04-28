import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Present", users: 80, fill: "#00ff00" }, 
    { name: "Absent", users: 20, fill: "#ff0000" }, 
  ];

  const COLORS = ["#00ff00", "#ff0000"];

  return (
    <div style={{ textAlign: "center" }}>
      <div className="chart-container">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#"
            label
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
        <div>
          <h1>Present : 70 </h1>
          <h1>Absent  : 30 </h1>
          <h1>Total Lectures : 100 </h1>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
