import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Styles from "../../assets/css/home.module.css";
import ScheduleImg from "../../assets/images/schedule-calender.png";
import OneTime from "../../assets/images/One-TimePackage.png";
import Calender from "../../assets/images/Calender-withBg.png";
import CalenderClock from "../../assets/images/Calender-Clock.png";
import CommonHeader from "../../common/CommonHeader";
import { useTranslation } from "react-i18next";

function EnterprisesNewSchedule() {
  const user = useSelector((state) => state.auth.user);
  const { enterpriseDeliveryType } = useSelector(
    (state) => state.commonData.commonData
  );
  const navigate = useNavigate();
  const {t}=useTranslation()

  // Memoized function for getting icons
  const getIcon = useMemo(
    () => (id) => {
      switch (id) {
        case 1:
          return OneTime;
        case 2:
          return Calender;
        case 3:
          return CalenderClock;
        default:
          return OneTime;
      }
    },
    []
  );

  // Navigation handler
  const PageHandler = (serviceType) => {
    if (!serviceType) return;
    navigate("/enterprise/select-branch", { state: { servicetype: serviceType } });
  };

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            {/* Left Section */}
            <div className="col-md-4">
              <div className={Styles.enterpriseNewScheduleTitleCard}>
                <div>
                  <h4 className={Styles.enterpriseNewScheduleText}>
                    {t("new_schedule")}
                  </h4>
                  <p className={Styles.enterpriseNewScheduleDiscription}>
                    {t("create_new_schedule")}
                  </p>
                </div>
                <div>
                  <img
                    className={Styles.enterpriseNewScheduleImg}
                    src={ScheduleImg}
                    alt="Schedule Illustration"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  {t("select_schedule_type")}
                </h4>
                <div className={Styles.enterpriseNewScheduleMainLinkCards}>
                  {enterpriseDeliveryType?.map((servicetype, key) => (
                    <div
                      className={Styles.enterpriseNewScheduleLinkCard}
                      key={key}
                      onClick={() => PageHandler(servicetype)}
                      style={{
                        cursor: "pointer",
                        paddingLeft: servicetype?.id === 1 ? "15px" : "35px",
                      }}
                    >
                      <img
                        className={Styles.enterpriseNewScheduleOneTimeImg}
                        src={getIcon(servicetype?.id)}
                        alt={`${servicetype?.delivery_type} Icon`}
                      />
                      <div>
                        <h4 className={Styles.enterpriseNewScheduleDeliveryTitle}>
                          {servicetype?.delivery_type}
                        </h4>
                        <p className={Styles.enterpriseNewScheduleDeliveryDiscription}>
                          {servicetype?.delivery_type_desc}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        className={Styles.enterpriseNewScheduleRightArrow}
                        icon={faArrowRight}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EnterprisesNewSchedule;
