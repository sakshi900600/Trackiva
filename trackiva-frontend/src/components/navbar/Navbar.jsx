import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/trackiva_logo.png";

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

  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 TEMP auth (replace with context later)
  const isLoggedIn = !!localStorage.getItem("token");

  const menu = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/jobs", label: "My Jobs", icon: <Briefcase size={20} /> },
    { path: "/platforms", label: "Platforms", icon: <Layers size={20} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { path: "/reports", label: "Reports", icon: <MessageSquareWarning size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.navbar}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* show menu ONLY if logged in */}
          {isLoggedIn && (
            <button
              className={styles.menuBtn}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          )}

          <div className={styles.logo} onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {!isLoggedIn ? (
            <div className={styles.authButtons}>
              <button
                className={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className={styles.signupBtn}
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          ) : (
            <div
              className={styles.profile}
              onClick={() => setOpen(!open)}
            >
              <img
                src="/favicon.svg"
                alt="profile"
                className={styles.avatar}
              />

              <span className={styles.name}>Sakshi Kumari</span>

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
          )}
        </div>
      </nav>

      {/* MOBILE SIDEBAR (only if logged in) */}
      {mobileOpen && isLoggedIn && (
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