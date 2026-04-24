import {
  LayoutDashboard,
  Briefcase,
  Layers,
  BarChart3,
  MessageSquareWarning,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const menu = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/jobs", label: "My Jobs", icon: <Briefcase size={20} /> },
    { path: "/platforms", label: "Platforms", icon: <Layers size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/reports", label: "Reports", icon: <MessageSquareWarning size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.active : ""}`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}