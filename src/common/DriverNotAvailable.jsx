import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Styles from "../assets/css/home.module.css";
import DriverCircle from "../assets/images/DriverBackgroun-Circle.png";
import DriverProfiles from "../assets/images/driver-not-available-Icon.png";
import { useSelector } from "react-redux";

const DriverNotAvailable = () => {
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber } = location.state || {};
  const tryAgainHandler = () => {
    navigate(`/${baseUrl}/find-driver`, {
      state: {
        orderNumber: orderNumber,
      },
    });
  };
  return (
    <>
      <section className={Styles.lookingDriverSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.driverBackgroundMiddleCard}>
                  <img
                    className={Styles.backgroundDriverCircle}
                    src={DriverCircle}
                    alt="Icon"
                  />
                  <div className={Styles.DriverProfileCardMainBg}>
                    <img
                      className={Styles.driverDotAvailableImg}
                      src={DriverProfiles}
                      alt="Icon"
                    />
                    <h1 className={Styles.lookingDriverText}>
                      Couldn’t find driver
                    </h1>
                    <p className={Styles.lookingDriverSubText}>
                      No drivers available in your area for now, please try
                      again later
                    </p>
                  </div>
                </div>
                <div className={Styles.driverNotAvailableHeadCard}>
                  <Link
                    to={`/${baseUrl}/dashboard`}
                    className={Styles.driverFindCancelBtn}
                    type="button"
                  >
                    Go home
                  </Link>
                  <button
                    onClick={tryAgainHandler}
                    className={Styles.pickupSignupContinueBtn}
                    type="button"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DriverNotAvailable;
