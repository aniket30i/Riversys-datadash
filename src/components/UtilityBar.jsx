import { useContext, useEffect, useState } from "react";
import styles from "../css-modules/UtilityBar.module.css";
import { ContextProvider } from "../context/ContextProvider.jsx";
import FilterUtil from "./FilterUtil.jsx";
import { data } from "../data/data";
import * as XLSX from "xlsx";
import flt from "../assets/flt.png";
import search from "../assets/search.png";
import expt from "../assets/expt.png";

function UtilityBar() {
  const { setSearchQuery } = useContext(ContextProvider);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [headings, setHeadings] = useState({
    ResponseAwaited: 0,
    Accepted: 0,
    Rejected: 0,
    ReviewRequested: 0,
    GrnDone: 0,
    Delayed: 0,
  });

  useEffect(() => {
    // const counts
  });

  /// Exporting data as excel
  // 1 Convert data to a worksheet
  // 2 Create a new workbook and append the worksheet
  // 3 Generate the Excel file and store it in a Blob
  // 4 Convert the Blob to a base64 string
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      // Save the base64 string to local storage
      localStorage.setItem("excelFile", base64data);

      // trigger a download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dataset.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };
  return (
    <div id="container" className={styles["all-holder"]}>
      <div id="upper" className={styles["upper-hold"]}>
        <div id="counts" className={styles["counts"]}>
          <p>Response Awaited #</p>
          <p>Accepted #</p>
          <p>Rejected #</p>
          <p>Review Requested #</p>
          <p>GRN Done #</p>
          <p>Delayed #</p>
        </div>
        <div id="search" className={styles["sr-box"]}>
          <img src={flt} alt="ico" className={styles["filter-ico"]} />
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Search..."
          />
          <div className={styles["sr-bg"]}>
            <img src={search} alt="ico" className={styles["sr-ico"]} />
          </div>
        </div>
        <div className={styles["export"]} onClick={handleExport}>
          <img src={expt} alt="" />
          <p>Export</p>
        </div>
      </div>
      <FilterUtil />
    </div>
  );
}
export default UtilityBar;
