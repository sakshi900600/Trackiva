import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/trackiva_logo.png";
import { getProfile } from "../../api/auth";

import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  Layers,
  BarChart3,
  MessageSquareWarning,
  X,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const menu = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/jobs", label: "My Jobs", icon: <Briefcase size={20} /> },
    { path: "/platforms", label: "Platforms", icon: <Layers size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/reports", label: "Reports", icon: <MessageSquareWarning size={20} /> },
  ];

  // ✅ Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.data);
      } catch (err) {
        console.log(err.message || "Failed to fetch user");
      }
    };

    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔥 Hide navbar completely if not logged in
  if (!isLoggedIn) return null;

  return (
    <>
      <nav className={styles.navbar}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* ✅ ONLY visible on mobile via CSS */}
          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className={styles.logo} onClick={() => navigate("/dashboard")}>
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div
            className={styles.profile}
            onClick={() => setOpen(!open)}
          >
            <img
              src={
                user?.avatar?.url ||
                `https://ui-avatars.com/api/?name=${user?.name || "User"}`
              }
              alt="profile"
              className={styles.avatar}
            />

            <span className={styles.name}>
              {user?.name || "User"}
            </span>

            <ChevronDown
              size={18}
              className={`${styles.dropdownIcon} ${
                open ? styles.rotate : ""
              }`}
            />

            {open && (
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                >
                  <User size={18} />
                  <span>My Profile</span>
                </div>

                <div
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMobileOpen(false)}
          />

          <div className={styles.mobileSidebar}>
            <div className={styles.mobileHeader}>
              <span>Menu</span>
              <X size={20} onClick={() => setMobileOpen(false)} />
            </div>

            {menu.map((item, i) => (
              <div
                key={i}
                className={`${styles.mobileItem} ${
                  location.pathname === item.path ? styles.activeMobile : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}