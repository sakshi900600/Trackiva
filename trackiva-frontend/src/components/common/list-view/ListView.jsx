import React, { useEffect, useState } from "react";
import styles from "./ListView.module.css";

import ListHeader from "./header/ListHeader";
import TableView from "./table-view/TableView";
import CardView from "./card-view/CardView";

const ListView = ({
  title = "",
  subtitle = "",

  data = [],
  columns = [],
  view,
  setView,

  search,
  setSearch,
  filters = [],
  showAddButton = true,
  onAddClick,
  searchPlaceholder = "Search...",

  loading = false,
  meta = null,

  // ✅ NEW: when true, skip ALL client-side filtering/pagination
  // because the backend already handles it
  isBackendPaginated = false,

  // ✅ NEW: optional refresh callback passed to ListHeader
  onRefresh,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, view]);

  // ✅ FIX: if backend is paginating, skip client-side processing entirely
  let processedData = [...data];

  if (!isBackendPaginated) {
    // Client-side search
    if (search) {
      processedData = processedData.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
      );
    }

    // Client-side filters
    filters.forEach((filter) => {
      if (filter.value) {
        processedData = processedData.filter((item) =>
          filter.apply(item, filter.value)
        );
      }
    });
  }

  // Client-side pagination — only when NOT backend-paginated
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = isBackendPaginated
    ? processedData // ✅ show all rows as-is from backend
    : processedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>

        {(title || subtitle) && (
          <div className={styles.titleSection}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}

        <div className={styles.headerSection}>
          <ListHeader
            view={view}
            setView={setView}
            search={search}
            setSearch={setSearch}
            filters={filters}
            showAddButton={showAddButton}
            onAddClick={onAddClick}
            placeholder={searchPlaceholder}
            onRefresh={onRefresh} // ✅ passed down to header
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.viewSection}>
          {view === "table" ? (
            <TableView
              columns={columns}
              data={paginatedData}
              loading={loading}
              onRowClick={(row) => row?.onClick?.()}
            />
          ) : (
            <CardView
              data={paginatedData}
              loading={loading}
            />
          )}
        </div>

        {/* Empty state — only for client-side mode */}
        {!loading && !isBackendPaginated && processedData.length === 0 && !meta && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <h3>No data found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Empty state for backend mode */}
        {!loading && isBackendPaginated && data.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📊</div>
            <h3>No applications found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Client-side pagination — only when NOT backend-paginated */}
        {!isBackendPaginated && !loading && processedData.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListView;