import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  BarChart3,
  MessageSquareWarning,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menu = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/jobs", label: "My Jobs", icon: <Briefcase size={20} /> },
    { path: "/platforms", label: "Platforms", icon: <Layers size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/reports", label: "Reports", icon: <MessageSquareWarning size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button 
        className={styles.toggleBtn} 
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <nav className={styles.nav}>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            {!isCollapsed && <span className={styles.label}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}