import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/Payment-Successful-Icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";

const PaymentSuccessful = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const {orderNumber,date} = location.state || {};
  console.log(date)
  useEffect(() => {
    const timer = setTimeout(() => {
      if(date){
        navigate("/consumer/schedule-created", {
          state: {
            date: date,
          },
        });
      }else{
        navigate("/consumer/find-driver", {
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
                      Payment Successfull!
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      Your payment was successfull, let’s look for a delivery boy
                      now...
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
