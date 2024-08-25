import styles from "../css-modules/UpperNav.module.css";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import usic from "../assets/a-icon.png";
function UpperNav() {
  return (
    <div id="container" className={styles["bg-nav"]}>
      <div id="names-container" className={styles["nav-items"]}>
        <div id="branding" className={styles["branding"]}>
          <h1>Riversys</h1>
        </div>
        <div id="top-icons" className={styles["nav-icons"]}>
          <div className={styles["purchase"]}>
            <EditNoteOutlinedIcon sx={{ fontSize: 35 }} />
            <p>Purchase order</p>
          </div>
          <div className={styles["dashboard"]}>
            <InsertChartOutlinedTwoToneIcon sx={{ fontSize: 30 }} />
            <p>Dashboard</p>
          </div>
          <div className={styles["reports"]}>
            <DescriptionOutlinedIcon sx={{ fontSize: 30 }} />
            <p>Reports</p>
          </div>
          <div className={styles["rfq"]}>
            <StyleOutlinedIcon sx={{ fontSize: 30 }} />
            <p>RFQ</p>
          </div>
          <div className={styles["invoice"]}>
            <ReceiptOutlinedIcon sx={{ fontSize: 30 }} />
            <p>Invoice</p>
          </div>
        </div>
        <div id="user-icon" className={styles["user-ico"]}>
          <img src={usic} alt="username" className={styles["round-ico"]} />
          <p>Aayush GC</p>
        </div>
      </div>
    </div>
  );
}

export default UpperNav;
