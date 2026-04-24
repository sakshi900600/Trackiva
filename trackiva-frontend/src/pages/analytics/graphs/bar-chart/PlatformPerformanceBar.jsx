import React, { useState } from "react";
import styles from "./PlatformPerformanceBar.module.css";
import { ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color, margin: "4px 0" }}>
            {item.name} : <strong>{item.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PlatformPerformanceBar = ({ data = [], loading }) => {
  // Commenting out filter state for now to debug height issue
  /* const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (data.length > 0 && selectedPlatforms.length === 0) {
      setSelectedPlatforms(data.slice(0, 3).map((p) => p.name));
    }
  }, [data]);

  const handleTogglePlatform = (name) => {
    if (selectedPlatforms.includes(name)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== name));
      }
    } else if (selectedPlatforms.length < 3) {
      setSelectedPlatforms([...selectedPlatforms, name]);
    }
  }; 
  */

  if (loading) return <div className={styles.skeleton}></div>;

  const hasData = Array.isArray(data) && data.length > 0;

  // DIRECT DATA SOURCE: Just take the first 3 platforms from the prop
  const displayData = hasData ? data.slice(0, 3) : [];

  return (
    <div className={styles.card}>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <h2>Platform Performance Comparison</h2>
          <p>Showing top {displayData.length} platforms</p>
        </div>

        {/* Filter UI Commented Out
        {hasData && (
          <div className={styles.filterWrapper}>
            <button 
              className={styles.dropdownBtn}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Filter ({selectedPlatforms.length}/3)
              <ChevronDown size={16} />
            </button>
            ... dropdown logic ...
          </div>
        )} 
        */}
      </div>

      {/* Adding inline style height to force the container to be visible to Recharts */}
      <div className={styles.chartWrapper} style={{ width: '100%', height: '350px', minHeight: '350px' }}>
        {!hasData ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <h3>No data available</h3>
            <p>Add job applications to see platform statistics.</p>
          </div>
        ) : (
          /* Added minHeight prop here as well */
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart
              data={displayData}
              barGap={12}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.4 }} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />

              <Bar dataKey="applications" fill="#3b82f6" name="Applications" radius={[6, 6, 0, 0]} barSize={25} />
              <Bar dataKey="interviews" fill="#8b5cf6" name="Interviews" radius={[6, 6, 0, 0]} barSize={25} />
              <Bar dataKey="offers" fill="#22c55e" name="Offers" radius={[6, 6, 0, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PlatformPerformanceBar;