import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Approved from "../assets/images/undraw_booking.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { localToUTC } from "../utils/Constants";

const ScheduleSuccess = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state || {};
  const handleGoHome = () => {
    navigate("/consumer/dashboard", { replace: true, state: {} });
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
                      Schedule Order Successful!
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      {`Delivery boy will be allocated on ${localToUTC(
                        date
                      )} ...`}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center"> 
                    <button className={Styles.addPickupDetailsCancelBTn} onClick={handleGoHome}>
                      Go home
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
