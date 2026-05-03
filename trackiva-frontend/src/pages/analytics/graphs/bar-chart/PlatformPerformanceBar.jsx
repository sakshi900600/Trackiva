import React, { useState, useEffect } from "react";
import styles from "./PlatformPerformanceBar.module.css";
import { ChevronDown, Database } from "lucide-react";
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
        <div className={styles.tooltipDivider} />
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color, margin: "4px 0", fontSize: "13px" }}>
            {item.name}: <strong>{item.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PlatformPerformanceBar = ({ data = [], loading }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Normalize data: backend might send 'label' or 'name'
  const normalizedData = React.useMemo(() => {
    return data.map(item => ({
      ...item,
      name: item.name || item.label || "Unknown",
      applications: Number(item.applications || 0),
      interviews: Number(item.interviews || 0),
      offers: Number(item.offers || 0)
    }));
  }, [data]);

  useEffect(() => {
    if (normalizedData.length > 0 && selectedPlatforms.length === 0) {
      setSelectedPlatforms(normalizedData.slice(0, 4).map((p) => p.name));
    }
  }, [normalizedData]);

  if (loading) return <div className={styles.skeleton}></div>;

  const hasData = normalizedData.length > 0;
  const displayData = normalizedData.filter(p => selectedPlatforms.includes(p.name));

  return (
    <div className={styles.card}>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <h2>Platform Performance</h2>
          <p>Comparing outcomes across different job boards</p>
        </div>

        <div className={styles.filterWrapper}>
          <button 
            className={styles.dropdownBtn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Filter Platforms
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {normalizedData.map((p) => (
                <label key={p.name} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(p.name)}
                    onChange={() => {
                      if (selectedPlatforms.includes(p.name)) {
                        setSelectedPlatforms(selectedPlatforms.filter(item => item !== p.name));
                      } else {
                        setSelectedPlatforms([...selectedPlatforms, p.name]);
                      }
                    }}
                  />
                  {p.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        {!hasData ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><Database size={24}/></div>
            <h3>No Platform Data</h3>
            <p>Data will appear once you track applications.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={displayData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />

              <Bar dataKey="applications" fill="#3b82f6" name="Apps" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="interviews" fill="#8b5cf6" name="Interviews" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="offers" fill="#22c55e" name="Offers" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PlatformPerformanceBar;