// import React, { useState } from "react";
// import styles from "./PlatformDetail.module.css";
// import {
//   ArrowLeft,
//   Briefcase,
//   Users,
//   Award,
//   TrendingUp,
// } from "lucide-react";

// // Reusable ListView
// import ListView from "../../../components/common/list-view/ListView";

// // Existing components
// import JobCard from "../../jobs/job-list/job-list-view/card-view/job-card/JobCard";
// import JobTableRow from "../../jobs/job-list/job-list-view/table-view/JobTableRow";
// import StatCard from "../../../components/stat-card/StatCard";

// // Dummy data
// import jobs from "../../../data/jobs/dummyJobs";

// const PlatformDetail = () => {
//   const [view, setView] = useState("table");
//   const [search, setSearch] = useState("");

//   const platformName = "LinkedIn";

//   const platformJobs = jobs.filter(
//     (job) => job.platform === platformName
//   );

//   // Stats
//   const totalApplications = platformJobs.length;

//   const interviews = platformJobs.filter(
//     (job) => job.status === "Interview"
//   ).length;

//   const offers = platformJobs.filter(
//     (job) => job.status === "Offer"
//   ).length;

//   const responseRate =
//     totalApplications === 0
//       ? 0
//       : ((interviews + offers) / totalApplications) * 100;

//   return (
//     <div className={styles.wrapper}>
      
//       {/* Back Button */}
//       <button className={styles.backBtn}>
//         <ArrowLeft size={18} />
//         Back to Platforms
//       </button>

//       {/* Platform Info */}
//       <div className={styles.header}>
//         <h1 className={styles.title}>{platformName}</h1>
//         <p className={styles.subtitle}>
//           {totalApplications} applications on {platformName}
//         </p>
//       </div>

//       {/* ✅ Fixed Stats Section */}
//       <div className={styles.statsGrid}>
//         <StatCard
//           title="Total Applications"
//           value={totalApplications}
//           changeText="All applications"
//           icon={Briefcase}
//           color="blue"
//         />

//         <StatCard
//           title="Interviews"
//           value={interviews}
//           changeText="Shortlisted"
//           icon={Users}
//           color="purple"
//         />

//         <StatCard
//           title="Offers"
//           value={offers}
//           changeText="Successful"
//           icon={Award}
//           color="green"
//         />

//         <StatCard
//           title="Response Rate"
//           value={`${responseRate.toFixed(1)}%`}
//           changeText="Based on responses"
//           icon={TrendingUp}
//           color="orange"
//         />
//       </div>

//       {/* Divider */}
//       <div className={styles.divider} />

//       {/* ListView */}
//       <ListView
//         data={platformJobs}
//         columns={[
//           "Company",
//           "Role",
//           "Platform",
//           "Status",
//           "Location",
//           "Salary",
//           "Applied",
//           "Match",
//         ]}
//         view={view}
//         setView={setView}
//         search={search}
//         setSearch={setSearch}
//         searchPlaceholder={`Search ${platformName} jobs...`}
//         showAddButton={false}

//         renderRow={(job, index) => (
//           <JobTableRow key={index} job={job} />
//         )}

//         renderCard={(job, index) => (
//           <JobCard key={index} job={job} />
//         )}
//       />

//     </div>
//   );
// };

// export default PlatformDetail;