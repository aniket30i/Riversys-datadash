import styles from "../css-modules/LowerNav.module.css";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import refresh from "../assets/refresh.png";
function LowerNav() {
  return (
    <div id="container" className={styles["bg-lw-nav"]}>
      <div id="names-container" className={styles["info-items"]}>
        <div className={styles["pur-ord"]}>
          <ListAltRoundedIcon sx={{ fontSize: 35 }} />
          <h2>Purchase Orders</h2>
        </div>
        <div id="dynamic-contents" className={styles["btn-tm"]}>
          <p>Last ERP sync: Fri ,May 08, 2020 | 10:30:33 AM IST | </p>
          <div className={styles["ref-util"]}>
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
