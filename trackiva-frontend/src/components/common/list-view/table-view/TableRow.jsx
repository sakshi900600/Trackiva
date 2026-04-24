import React from "react";
import styles from "./TableView.module.css";

const TableRow = ({ children }) => {
  return (
    <tr className={styles.row}>
      {children}
    </tr>
  );
};

export default TableRow;