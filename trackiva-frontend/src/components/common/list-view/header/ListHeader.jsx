import React from "react";
import styles from "./ListHeader.module.css";
import {
  LayoutGrid,
  Table,
  Search,
  Plus,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

const ListHeader = ({
  view,
  setView,
  search,
  setSearch,
  filters = [],
  showAddButton = true,
  onAddClick,
  placeholder = "Search...",
  onRefresh, // ✅ NEW
}) => {
  return (
    <div className={styles.container}>
      {/* TOP ROW */}
      <div className={styles.topRow}>

        {/* VIEW TOGGLE */}
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${view === "table" ? styles.active : ""}`}
            onClick={() => setView("table")}
            title="Table view"
          >
            <Table size={18} />
          </button>
          <button
            className={`${styles.toggleBtn} ${view === "card" ? styles.active : ""}`}
            onClick={() => setView("card")}
            title="Card view"
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        <div className={styles.rightActions}>
          {/* ✅ REFRESH BUTTON */}
          {onRefresh && (
            <button
              className={styles.refreshBtn}
              onClick={onRefresh}
              title="Refresh list"
            >
              <RefreshCw size={16} />
            </button>
          )}

          {/* ADD BUTTON */}
          {showAddButton && (
            <button className={styles.addBtn} onClick={onAddClick}>
              <Plus size={18} />
              Add Application
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.bottomRow}>
        {/* SEARCH */}
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className={styles.filters}>
          {filters?.map((filter, index) => (
            <div key={index} className={styles.filterItem}>
              <SlidersHorizontal size={16} />
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
              >
                {filter.options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListHeader;