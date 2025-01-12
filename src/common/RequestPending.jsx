import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Loader from "../assets/images/Signup-Loader.png";
import Logo from "../assets/images/Logo-icon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import localforage from "localforage";
import { logout } from "../redux/authSlice";
const ThankPage = ({baseUrl}) => {
    const role=useSelector((state)=>state.auth.role)
  const dispatch = useDispatch();

    let baseU='/'
    useEffect(()=>{
        dispatch(logout());
        localforage.clear();
    },[])
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
                      Profile in review.
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
