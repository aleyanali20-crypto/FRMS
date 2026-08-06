import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ExpenseChart = ({ data }) => {
  const monthly = new Array(12).fill(0);

  data.forEach((item) => {
    if (item._id >= 1 && item._id <= 12) {
      monthly[item._id - 1] = item.total;
    }
  });

  const chartData = monthNames.slice(1).map((month, index) => ({
    month,
    expense: monthly[index],
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        Monthly Expense
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`Rs. ${value}`, "Expense"]}
            />

            <Bar
              dataKey="expense"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;