import React, { useState } from "react";
import styles from "./PlatformTable.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAnalytics } from "../../../hooks/useAnalytics";
import TableView from "../../../components/common/list-view/table-view/TableView";

const PlatformTable = () => {
  const { data, loading } = useAnalytics("all");

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const platforms = data?.platforms || [];

  // ✅ keep formatting logic (only transform layer)
  const formattedData = platforms.map((p) => ({
    platform: p.name,
    applications: p.applications,
    interviews: p.interviews,
    offers: p.offers,
    responseRate: `${p.responseRate}%`,
    avgTime: "—",
  }));

  const start = page * rowsPerPage;
  const paginatedData = formattedData.slice(
    start,
    start + rowsPerPage
  );

  const totalPages = Math.ceil(formattedData.length / rowsPerPage);

  // ✅ columns definition (REUSABLE STYLE)
  const columns = [
    {
      header: "Platform",
      accessor: "platform",
    },
    {
      header: "Applications",
      accessor: "applications",
    },
    {
      header: "Interviews",
      accessor: "interviews",
      className: styles.interviews,
    },
    {
      header: "Offers",
      accessor: "offers",
      className: styles.offers,
    },
    {
      header: "Response Rate",
      accessor: "responseRate",
    },
    {
      header: "Avg Response Time",
      accessor: "avgTime",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Platform Comparison</h2>

      {/* ✅ TABLE VIEW */}
      <TableView
        columns={columns}
        data={paginatedData}
        loading={loading}
      />

      {/* ✅ Pagination (kept outside TableView intentionally) */}
      {!loading && formattedData.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            <FiChevronLeft /> Prev
          </button>

          <span className={styles.pageInfo}>
            Page {page + 1} of {totalPages}
          </span>

          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlatformTable;