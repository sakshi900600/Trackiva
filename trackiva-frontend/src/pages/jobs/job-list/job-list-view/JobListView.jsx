import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListView from "../../../../components/common/list-view/ListView";
import AddApplication from "../../action-btns/AddApplication";
import styles from "../JobList.module.css";
import { useJobs } from "../../../../hooks/useJobs";

const JobListView = ({ view, setView, search, setSearch }) => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const { data = [], loading, meta, refetch } = useJobs({
    search,
    page,
    limit: 10,
    status: statusFilter,
  });

  const columns = [
    {
      header: "Job Role",
      accessor: "role",
      render: (row) => <span className={styles.role}>{row.role}</span>,
    },
    { header: "Company", accessor: "company" },
    { header: "Platform", accessor: "platform" },
    {
      header: "Status",
      render: (row) => (
        <span className={`${styles.status} ${styles[row.status]}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Applied Date",
      render: (row) => (
        <span>{new Date(row.appliedDate).toLocaleDateString()}</span>
      ),
    },
    // ✅ FIX: salary can be a number OR { expected: number }
    {
      header: "Salary",
      render: (row) => {
        const raw = row.salary;
        const amount =
          typeof raw === "object" && raw !== null
            ? raw.expected
            : typeof raw === "number"
            ? raw
            : null;

        return (
          <span className={styles.salary}>
            {amount ? `₹${amount.toLocaleString("en-IN")}` : "—"}
          </span>
        );
      },
    },
    {
      header: "Confidence",
      render: (row) => (
        <div className={styles.scoreWrapper}>
          <div
            className={styles.scoreBar}
            style={{ width: `${row.confidenceScore ?? 0}%` }}
          />
          <span className={styles.scoreLabel}>
            {row.confidenceScore ?? 0}%
          </span>
        </div>
      ),
    },
  ];

  const filters = [
    {
      value: statusFilter,
      options: [
        { label: "All", value: "" },
        { label: "Applied", value: "applied" },
        { label: "Screening", value: "screening" },
        { label: "Interview", value: "interview" },
        { label: "Offer", value: "offer" },
        { label: "Rejected", value: "rejected" },
      ],
      onChange: (val) => {
        setStatusFilter(val);
        setPage(1);
      },
      apply: () => true,
    },
  ];

  // ✅ Map data rows to include onClick for navigation
  const rowData = data.map((job) => ({
    ...job,
    onClick: () => navigate(`/jobs/${job._id}`),
  }));

  return (
    <>
      {/* ✅ ADD APPLICATION MODAL */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <AddApplication
              onClose={() => setShowAddModal(false)}
              refreshJobs={() => {
                refetch();
                setPage(1);
              }}
            />
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.containerCard}>
          <ListView
            title="Your Applications"
            subtitle="Track all your job applications in one place"
            data={rowData}
            columns={columns}
            view={view}
            setView={setView}
            search={search}
            setSearch={setSearch}
            filters={filters}
            loading={loading}
            showAddButton={true}
            onAddClick={() => setShowAddModal(true)}
          />

          {/* ✅ BACKEND PAGINATION — only when ListView's internal one won't show */}
          {!loading && meta && meta.pages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={meta.page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span className={styles.pageInfo}>
                Page {meta.page} of {meta.pages}
              </span>
              <button
                className={styles.pageBtn}
                disabled={meta.page >= meta.pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobListView;