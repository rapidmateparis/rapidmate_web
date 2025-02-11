import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Approved from "../assets/images/undraw_booking.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { localToUTC } from "../utils/Constants";
import { useTranslation } from "react-i18next";

const ScheduleSuccess = () => {
  const user = useSelector((state) => state.auth.user);
  const userRole = useSelector((state) => state.auth.role);
  const {t}=useTranslation()
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state || {};
  const handleGoHome = () => {
    navigate(`/${baseUrl}/dashboard`, { replace: true, state: {} });
  };

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate(location.pathname, { replace: true }); 
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, location.pathname]);
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.deliveryboyThankyouSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.deliveryboyThankyoumainCard}>
                <div>
                  <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                    <img
                      className={Styles.ScheduleSuccessImage}
                      src={Approved}
                      alt="Payment-Img"
                    />
                  </div>
                  <div>
                    <h4 className={Styles.deliveryboyThankyouSignupText}>
                      {t("schedule_order_successful")}
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      {`${t("delivery_boy_allocated_on")} ${localToUTC(
                        date
                      )} ...`}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center"> 
                    <button className={Styles.addPickupDetailsCancelBTn} onClick={handleGoHome}>
                      {t("go_home")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScheduleSuccess;
