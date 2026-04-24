import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />  
        </main>
      </div>
    </div>
  );
}