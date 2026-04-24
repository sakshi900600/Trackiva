import React from "react";
import styles from "./ApplicationTrends.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const formatXAxis = (tickItem) => {
  if (!tickItem) return "";
  const [year, month] = tickItem.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleString("default", { month: "short" });
};

// 🔹 Custom Tooltip matching your image
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{formatXAxis(label)}</p>
        <div className={styles.tooltipDivider} />
        {payload.map((item, index) => (
          <p key={index} className={styles.tooltipItem} style={{ color: item.color }}>
            {item.name} : {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ApplicationTrends = ({ data, loading }) => {
  if (loading) return <div className={styles.skeleton}></div>;

  const chartData = data ? [...data].reverse() : [];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Application Trends Over Time</h2>
        <p>Track your job search activity and outcomes month by month</p>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* 🔹 Dotted Grid Lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            
            <XAxis 
              dataKey="month" 
              tickFormatter={formatXAxis}
              tick={{ fontSize: 13, fill: "#666" }}
              axisLine={{ stroke: "#666" }}
              tickLine={true}
            />
            <YAxis 
              tick={{ fontSize: 13, fill: "#666" }}
              axisLine={{ stroke: "#666" }}
              tickLine={true}
            />

            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#ccc', strokeWidth: 1, strokeDasharray: '3 3' }} 
            />

            <Line
              name="Applications"
              type="monotone" // 🔹 Curved lines
              dataKey="applications"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />

            <Line
              name="Interviews"
              type="monotone"
              dataKey="interviews"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />

            <Line
              name="Offers"
              type="monotone"
              dataKey="offers"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4, fill: "#fff", stroke: "#22c55e", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <span style={{ color: "#3b82f6" }}>○ Applications</span>
        <span style={{ color: "#8b5cf6" }}>○ Interviews</span>
        <span style={{ color: "#22c55e" }}>○ Offers</span>
      </div>
    </div>
  );
};

export default ApplicationTrends;