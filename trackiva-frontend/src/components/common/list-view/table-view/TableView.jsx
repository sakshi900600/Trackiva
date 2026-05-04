import React from "react";
import styles from "./TableView.module.css";

const TableView = ({
  columns = [],
  data = [],
  loading = false,
  onRowClick, // 🔥 NEW
}) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {/* HEADER */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {/* LOADING */}
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className={styles.stateBox}>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className={styles.stateBox}>
                  {/* <span>No data available</span> */}
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={onRowClick ? styles.clickableRow : ""}
                onClick={() => onRowClick && onRowClick(row)} // 🔥 CORE FIX
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={col.className || ""}
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;