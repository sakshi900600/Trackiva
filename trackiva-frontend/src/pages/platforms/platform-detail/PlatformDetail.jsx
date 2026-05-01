import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlatformJobs } from "../../../api/platform";
import TableView from "../../../components/common/list-view/table-view/TableView";
import StatCard from "../../../components/stat-card/StatCard";

import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineBadgeCheck,
  HiOutlineChartBar
} from "react-icons/hi";

import styles from "./PlatformDetail.module.css";

const PlatformDetail = () => {
  const { platformName } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPlatformJobs(platformName);
        if (res.success) {
          setJobs(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platformName]);

  // ===== STATS =====
  const total = jobs.length;
  const interviews = jobs.filter(j => j.status === "interview").length;
  const offers = jobs.filter(j => j.status === "offer").length;

  const responseRate = total
    ? (((interviews + offers) / total) * 100).toFixed(1)
    : 0;

  // ===== TABLE DATA =====
  const tableData = jobs.map(job => ({
    role: job.role,
    company: job.company,
    status: job.status,
    platform: job.platform,
    appliedDate: new Date(job.appliedDate).toLocaleDateString(),

    onClick: () => navigate(`/jobs/${job._id}`),
  }));

  // ===== TABLE COLUMNS =====
  const columns = [
    { header: "Role", accessor: "role" },
    { header: "Company", accessor: "company" },
    { header: "Platform", accessor: "platform" },
    { header: "Status", accessor: "status" },
    { header: "Applied Date", accessor: "appliedDate" },
  ];

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>

      {/* 🔙 BACK */}
      <Link to="/platforms" className={styles.back}>
        ← Back to Platforms
      </Link>

      {/* 🔥 HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{platformName}</h1>
          <p className={styles.subtitle}>
            {total} applications on {platformName}
          </p>
        </div>
      </div>

      {/* 🔥 STATS CARDS */}
      <div className={styles.statsGrid}>

        <StatCard
          title="Total Applications"
          value={total}
          changeText=""
          icon={HiOutlineBriefcase}
          color="blue"
        />

        <StatCard
          title="Interviews"
          value={interviews}
          changeText=""
          icon={HiOutlineUserGroup}
          color="purple"
        />

        <StatCard
          title="Offers"
          value={offers}
          changeText=""
          icon={HiOutlineBadgeCheck}
          color="green"
        />

        <StatCard
          title="Response Rate"
          value={`${responseRate}%`}
          changeText=""
          icon={HiOutlineChartBar}
          color="orange"
        />

      </div>

      {/* 🔥 TABLE */}
      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>All Applications</h2>

        <TableView
          columns={columns}
          data={tableData}
          loading={loading}
          onRowClick={(row) => row.onClick()}
        />
      </div>

    </div>
  );
};

export default PlatformDetail;