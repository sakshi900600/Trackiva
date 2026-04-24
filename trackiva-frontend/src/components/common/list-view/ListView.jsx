import React, { useEffect, useState } from "react";
import styles from "./ListView.module.css";

import ListHeader from "./header/ListHeader";
import TableView from "./table-view/TableView";
import CardView from "./card-view/CardView";

const ListView = ({
  title = "",                 // 🔥 NEW
  subtitle = "",             // 🔥 NEW

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
  meta = null
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // reset page on change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, view]);

  // 🔍 SEARCH
  let processedData = [...data];

  if (search) {
    processedData = processedData.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // 🔽 FILTERS
  filters.forEach((filter) => {
    if (filter.value) {
      processedData = processedData.filter((item) =>
        filter.apply(item, filter.value)
      );
    }
  });

  // 📄 PAGINATION
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(
    processedData.length / itemsPerPage
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>

        {/* 🔥 TITLE SECTION */}
        {(title || subtitle) && (
          <div className={styles.titleSection}>
            {title && (
              <h2 className={styles.title}>{title}</h2>
            )}
            {subtitle && (
              <p className={styles.subtitle}>{subtitle}</p>
            )}
          </div>
        )}

        {/* HEADER */}
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
          />
        </div>

        <div className={styles.divider} />

        {/* VIEW */}
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

        {/* EMPTY STATE — only show when not using backend pagination */}
{!loading && processedData.length === 0 && !meta && (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>📊</div>
    <h3>No data found</h3>
    <p>Try adjusting your search or filters</p>
  </div>
)}

        {/* PAGINATION (styled like platform table) */}
        {!loading &&
          processedData.length > itemsPerPage && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.max(p - 1, 1)
                  )
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={styles.pageBtn}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
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