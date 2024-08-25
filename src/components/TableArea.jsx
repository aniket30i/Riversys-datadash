import DataTable from "../customs/DataTable.jsx";
import styles from "../css-modules/TableArea.module.css";
function TableArea() {
  return (
    <div className={styles["table-container"]}>
      <DataTable />
    </div>
  );
}
export default TableArea;
