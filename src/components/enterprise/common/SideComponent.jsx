import { memo } from "react";
import Styles from "../../../assets/css/home.module.css";
import Package from "../../../assets/images/One-TimePackage-big.png";
import Calender from "../../../assets/images/Calender-Clock.png";
import Trackorder from "../../../assets/images/Track-Order-Shift-Approved.png";
const SideComponent = memo(({icon=""}) => {
  return (
    <div className={Styles.enterpriseNewScheduleTitleCard}>
      <div>
        <h4 className={Styles.enterpriseNewScheduleText}>Create Shift</h4>
        {/* {icon && <p>Waiting for approval.</p>} */}
        {icon && (
          <img
          className={Styles.enterpriseCreateShiftTrackImg}
          src={Trackorder}
          alt="img"
        />
        )}
      </div>
      <div>
        {icon ? (<img
          className={Styles.enterpriseOneTimePackageImg}
          src={Calender}
          alt="Img"
        />):(<img
          className={Styles.enterpriseOneTimePackageImg}
          src={Package}
          alt="Img"
        />)}
        
      </div>
    </div>
  );
});


export default SideComponent