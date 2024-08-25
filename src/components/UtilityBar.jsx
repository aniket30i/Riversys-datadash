import { useContext, useState } from "react";
import styles from "../css-modules/UtilityBar.module.css";
import { ContextProvider } from "../context/ContextProvider.jsx";
import FilterUtil from "./FilterUtil.jsx";
function UtilityBar() {
  const { setSearchQuery } = useContext(ContextProvider);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div id="container">
      <div id="upper" className={styles["upper-hold"]}>
        <div id="counts" className={styles["counts"]}>
          <p>Response Awaited #</p>
          <p>Accepted #</p>
          <p>Rejected #</p>
          <p>Review Requested #</p>
          <p>GRN Done #</p>
          <p>Delayed #</p>
        </div>
        <div id="search">
          *ico*
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Search..."
          />
          *ico*
        </div>
        <div className={styles["export"]}>
          <p>Export</p>
        </div>
      </div>
      <FilterUtil />
    </div>
  );
}
export default UtilityBar;
