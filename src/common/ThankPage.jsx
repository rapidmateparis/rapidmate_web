import React, { useState } from "react";
import Styles from "../assets/css/home.module.css";
import Loader from "../assets/images/Signup-Loader.png";
import Logo from "../assets/images/Logo-icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ThankPage = ({baseUrl}) => {
    const role=useSelector((state)=>state.auth.role)
    let baseU='/'
    if(baseUrl){
        if(role==='DELIVERY_BOY'){
          baseU='/'+baseUrl+'/add-vehicle'
        }else{
          baseU='/'+baseUrl+'/dashboard'
        }
    }
    
  return (
    <>
      <section className={Styles.deliveryboyThankyouSec}>
        <div className="container">
          <div>
            <Link className={Styles.logoCard} to="/">
              <img className={Styles.logo} src={Logo} alt="logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.deliveryboyThankyoumainCard}>
                <div>
                  <div className={Styles.deliveryboyThankyouLoaderImgCard}>
                    <img
                      className={Styles.deliveryboyThankyouLoaderImg}
                      src={Loader}
                      alt="Loader-Img"
                    />
                  </div>
                  <div>
                    <h4 className={Styles.deliveryboyThankyouSignupText}>
                      Thank you for signing up
                    </h4>
                    <p className={Styles.deliveryboyThankyouSignupDiscription}>
                      We are reviewing your request and we will update you about
                      it shortly.
                    </p>

                    <div className={Styles.deliveryboyThankyouSignupBtnCard}>
                      <Link
                        to={`${baseU}`}
                        className={Styles.pickupSignupContinueBtn}
                        type="button"
                      >
                        Ok
                      </Link>
                    </div>
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

export default ThankPage;
