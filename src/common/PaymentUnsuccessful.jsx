import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/payment-unsuccessful-icon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentUnsuccessful = () => {
  const {t}=useTranslation()
  return (
    <>
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
                      {t("payment_unsuccessful")}
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                     {t("payment_failed_message")}
                    </p>
                  </div>
                  <div className={Styles.deliveryboyThankyouSignupBtnCard}>
                    <Link
                      to="#"
                      className={Styles.pickupSignupContinueBtn}
                      type="button"
                    >
                      {t("try_again")}
                    </Link>
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

export default PaymentUnsuccessful;
