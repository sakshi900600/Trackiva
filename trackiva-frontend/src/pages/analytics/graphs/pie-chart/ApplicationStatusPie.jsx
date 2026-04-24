import React, { useState, useEffect } from "react";
import styles from "./ApplicationStatusPie.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Database } from "lucide-react";

const COLORS = ["#3b82f6", "#eab308", "#8b5cf6", "#22c55e", "#ef4444"];

const ApplicationStatusPie = ({ data, loading }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size for label adjustments
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div className={styles.skeleton}></div>;

  const formattedData =
    data?.map((d) => ({
      name: d.label,
      value: Number(d.value),
    })) || [];

  const hasData =
    formattedData.length > 0 &&
    formattedData.some((item) => item.value > 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Application Status Distribution</h2>
        <p>Current breakdown of all applications</p>
      </div>

      <div className={styles.chartWrapper}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                // Reduced radius on mobile to prevent text overflow
                outerRadius={isMobile ? "60%" : "70%"} 
                innerRadius={0}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ index, name, percent, cx, cy, midAngle, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  // Push labels further out on mobile to avoid overlapping the pie
                  const radius = outerRadius * (isMobile ? 1.25 : 1.15);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      // Use the color from the COLORS array based on index
                      fill={COLORS[index % COLORS.length]}
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      style={{
                        fontSize: isMobile ? "14px" : "12px", // Slightly larger on mobile
                        fontWeight: 600,
                      }}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {formattedData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Database size={28} />
            </div>
            <h3>No Data Available</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatusPie;