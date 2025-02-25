import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/Payment-Successful-Icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { useTranslation } from "react-i18next";
import { setOrderDetails } from "../redux/doOrderSlice";
import localforage from "localforage";

const PaymentSuccessful = () => {
  const dispatch= useDispatch()
  const user = useSelector((state) => state.auth.user);
   const { order} = useSelector((state) => state.orderDetails);
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

    const resetData= async () =>{
      if(order?.deliveryType?.id==2){
        order?.dropoffLoc?.map(async(v,i)=>{
          await localforage.removeItem("file-"+i);
        })
      }else{
        await localforage.removeItem("uploadedFile");
      }
      dispatch(setOrderDetails(null));
    }

    resetData()

    
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
