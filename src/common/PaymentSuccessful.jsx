import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/Payment-Successful-Icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { useTranslation } from "react-i18next";

const PaymentSuccessful = () => {
  const user = useSelector((state) => state.auth.user);
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const {t}=useTranslation()
  const location = useLocation();
  const navigate = useNavigate();
  const {orderNumber,date,isSchedule} = location.state || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      if(isSchedule){
        navigate(`/${baseUrl}/schedule-created`, {
          state: {
            date: date,
          },
        });
      }else{
        navigate(`/${baseUrl}/find-driver`, {
          state: {
            orderNumber: orderNumber,
          },
        });
      }
      
    }, 4000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <>
    <CommonHeader userData={user}/>
      <section className={Styles.deliveryboyThankyouSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.deliveryboyThankyoumainCard}>
                <div>
                  <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                    <img
                      className={Styles.PaymentSuccessfulImage}
                      src={Payment}
                      alt="Payment-Img"
                    />
                  </div>
                  <div>
                    <h4 className={Styles.deliveryboyThankyouSignupText}>
                      {t("payment_successful")}
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                     {t("payment_successful_message")}
                    </p>
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

export default PaymentSuccessful;
