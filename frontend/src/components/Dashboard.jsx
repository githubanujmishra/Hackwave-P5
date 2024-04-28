import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Present", users: 80 , fill: "#0cc73c" }, 
    { name: "Absent", users: 20, fill: "#d40820" }, 
  ];

  const COLORS = ["#0cc73c", "#d40820"];

  return (
    <div className=" w-full h-[100vh] " style={{ textAlign: "center" }}>
      <div className="chart-container flex items-center justify-center w-full h-[100vh] flex-col bg-[#9AC8CD]/50">
      <h1 className="z-[50] absolute top-[22vh] font-black uppercase text-[2.5vw] text-white">shivam </h1>
      <div className="absolute top-[15%] chart-container flex items-center justify-center rounded-2xl w-[80%] h-[80vh] flex-col bg-green-500/30 ">
        <PieChart  width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={150}
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
        </div>
        <div className="absolute bottom-[10%] bg-blue-500/60  flex gap-[10vw] text-[1.5vw] uppercase font-bold text-white p-3 px-20 rounded-full" >
          <h1 className="text-[#53e077]">Present : 80 </h1>
          <h1 className="text-red-500">Absent  : 20 </h1>
          <h1 className="">Total Lectures : 100 </h1>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
