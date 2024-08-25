import { ContextProvider } from "../context/ContextProvider";
import styles from "../css-modules/FilterUtil.module.css";
import { useState, useContext } from "react";
import arrww from "../assets/arrw-w.png";
import arrwb from "../assets/arrw-b.png";

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
        <div id="PO-badge" className={styles["po-comp"]}>
          <p>PO Actions</p>
          <img src={arrww} alt="ico" className={styles["arr-wico"]} />
        </div>
        <div id="filter-holder" className={styles["filter-holder"]}>
          <div id="stat" className={styles["plc-flt"]}>
            <p>status all</p>
            <img src={arrwb} alt="ico" className={styles["arr-bico"]} />
          </div>
          <div id="pack" className={styles["plc-flt-lg"]}>
            <p>2000 Packaging</p>
            <img src={arrwb} alt="ico" className={styles["arr-bico"]} />
          </div>
          <div id="supp" className={styles["plc-flt-xl"]}>
            <p>suppliers:All</p>
            <img src={arrwb} alt="ico" className={styles["arr-bico"]} />
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
