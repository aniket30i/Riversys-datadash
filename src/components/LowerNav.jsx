import styles from "../css-modules/LowerNav.module.css";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import refresh from "../assets/refresh.png";
import { useState, useEffect } from "react";
function LowerNav() {
  const formatDate = () => {
    const dateOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const now = new Date();
    return now.toLocaleDateString("en-IN", dateOptions);
  };

  const formatTime = () => {
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const now = new Date();
    let timeString = now.toLocaleTimeString("en-IN", timeOptions);
    timeString = timeString.replace(/am|pm/i, (match) => match.toUpperCase());
    return timeString;
  };

  const formatDateTime = () => {
    const date = formatDate();
    const time = formatTime();
    return `${date} | ${time} |`;
  };
  const handleRefresh = () => {
    const currentTime = formatDateTime();
    localStorage.setItem("lastRefreshTime", currentTime);
    window.location.reload();
  };

  const [refreshTime, setRefreshTime] = useState("");

  useEffect(() => {
    const storedTime = localStorage.getItem("lastRefreshTime");
    if (storedTime) {
      setRefreshTime(storedTime);
    }
  }, []);

  return (
    <div id="container" className={styles["bg-lw-nav"]}>
      <div id="names-container" className={styles["info-items"]}>
        <div className={styles["pur-ord"]}>
          <ListAltRoundedIcon sx={{ fontSize: 35 }} />
          <h2>Purchase Orders</h2>
        </div>
        <div id="dynamic-contents" className={styles["btn-tm"]}>
          <p>{refreshTime}</p>
          <div className={styles["ref-util"]} onClick={handleRefresh}>
            <img
              src={refresh}
              alt="refresh-ico"
              className={styles["refresh"]}
            />
            <p className={styles["re-sync"]}>Re-Sync</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LowerNav;
