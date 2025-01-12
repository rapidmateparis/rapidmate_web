import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import Payment from "../assets/images/payment-unsuccessful-icon.png";
import { Link } from "react-router-dom";

const PaymentUnsuccessful = () => {
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
                      Payment unsuccessful!
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      We're sorry, but your payment couldn't be processed at
                      this time.
                    </p>
                  </div>
                  <div className={Styles.deliveryboyThankyouSignupBtnCard}>
                    <Link
                      to=""
                      className={Styles.pickupSignupContinueBtn}
                      type="button"
                    >
                      Try again
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
