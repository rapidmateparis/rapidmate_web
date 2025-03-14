import React, { memo } from "react";
import Styles from "../../assets/css/home.module.css";
import Timeline from "../../assets/images/Signup-Loader.png";
import CommonHeader from "../../common/CommonHeader";
import { useSelector } from "react-redux";
import SideComponent from "./common/SideComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EnterpriseScheduleApproved = memo(() => {
  const navigate =useNavigate()
  const user = useSelector((state) => state.auth.user);
  const {t}=useTranslation()
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <SideComponent icon={true} />
            </div>
            <div className="col-md-8">
            <div className={Styles.enterpriseCreateShiftRequestLoaderMainCard}>
                <div className={Styles.enterpriseCreateShiftRequestLoaderImageCard}>
                  <img
                    style={{height:'150px',marginTop:"25px"}}
                    src={Timeline}
                    alt="loader"
                  />
                </div>
                <h4 className={Styles.enterpriseCreateShiftRequestSubmitText}>
                  {t("schedule_request_submitted")}
                </h4>
                <p className={Styles.enterpriseCreateShiftRequestSubmitDiscription}>
                  {t("schedule_review_message")}
                </p>
              </div>
              <div className={`${Styles.enterpriseSelectServiceNextBtnCard} m-5`}>

                <div
                  onClick={() => navigate("/enterprise/dashboard")}
                  className={Styles.enterpriseSelectServiceNextBtn}
                  style={{ cursor: "pointer" }}
                >
                  {t("ok")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default EnterpriseScheduleApproved;
