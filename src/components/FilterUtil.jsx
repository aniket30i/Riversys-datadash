import { ContextProvider } from "../context/ContextProvider";
import styles from "../css-modules/FilterUtil.module.css";
import { useState, useContext } from "react";

function FIlterUtil() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { setDateRange } = useContext(ContextProvider);
  const { dateRange } = useContext(ContextProvider);

  const handleStartDate = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // context
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      start: newStartDate,
    }));
  };

  const handleEndDate = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    // context
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      end: newEndDate,
    }));
  };

  return (
    <div className={styles["multi-filter"]}>
      <div id="full-holder" className={styles["total"]}>
        <div id="PO-badge">PO Actions</div>
        <div id="filter-holder" className={styles["filter-holder"]}>
          <div id="stat" className={styles["plc-flt"]}>
            status all
          </div>
          <div id="pack" className={styles["plc-flt"]}>
            2000 Packaging
          </div>
          <div id="supp" className={styles["plc-flt"]}>
            suppliers:All
          </div>
          <div id="dates" className={styles["custom-date-picker"]}>
            <div id="start-date" className={styles["st-dt"]}>
              <input type="date" onChange={handleStartDate} />
            </div>
            <p>To</p>
            <div id="end-date" className={styles["en-dt"]}>
              <input type="date" onChange={handleEndDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FIlterUtil;
