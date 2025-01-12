import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../assets/css/home.module.css";
import Logo from "../assets/images/Logo-icon.png";
import Home from "../assets/images/home-icon.png";
import Pickup from "../assets/images/pickup-icon.png";
import Deliveryboy from "../assets/images/deliveryboy.png";
import HomeBanner from "../assets/images/home-banner.png";
import { useTranslation } from "react-i18next";
import localforage from "localforage";
const ProfileChoose = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = async (option) => {
    try {
      const storedRole = await localforage.getItem("roleName");
      if (storedRole === option) {
        setSelectedOption(storedRole);
      } else {
        await localforage.setItem("roleName", option);
        setSelectedOption(option);
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  useEffect(() => {
    const removeData  = async () => {
      try {
        await localforage.removeItem('roleName');
        setSelectedOption(null);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    removeData();
  }, []);

  const handleContinue = () => {
    if (selectedOption == "CONSUMER") {
      navigate("/pickup-signup");
    } else if (selectedOption == "ENTERPRISE") {
      navigate("/enterprises-signup");
    } else if (selectedOption == "DELIVERY_BOY") {
      navigate("/deliveryboy-signup");
    }
  };

  return (
    <>
      <section className={Styles.profileChooseSec}>
        <div className="container">
          <div>
            <Link className={Styles.logoCard} to="/">
              <img className={Styles.logo} src={Logo} alt="logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.chooseMainCard}>
                <div className={Styles.chooseProfileCard}>
                  <h2 className={Styles.chooseProfileHeading}>
                    {t("choose_profile")}
                  </h2>
                  <p className={Styles.chooseProfileSubheading}>
                    {t("before_creating_profile")}
                  </p>
                </div>

                <div>
                  <div
                    className={`${Styles.categoryCards} ${
                      selectedOption === "ENTERPRISE" ? Styles.selected : ""
                    }`}
                    onClick={() => handleCardClick("ENTERPRISE")}
                  >
                    <img
                      className={Styles.EnterpriseIcon}
                      src={Home}
                      alt="icon"
                    />
                    <div className={Styles.categoryTypesCard}>
                      <p className={Styles.hereText}>{t("i_am_here_as")}</p>
                      <h2 className={Styles.categoryTypes}>
                        {t("enterprise")}
                      </h2>
                    </div>
                    <div
                      className={`${Styles.circleChoose} ${
                        selectedOption === "ENTERPRISE" ? Styles.selected : ""
                      }`}
                    >
                      {selectedOption === "ENTERPRISE" && (
                        <FontAwesomeIcon
                          className={Styles.selectedCheck}
                          icon={faCheck}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`${Styles.categoryCards} ${
                      selectedOption === "CONSUMER" ? Styles.selected : ""
                    }`}
                    onClick={() => handleCardClick("CONSUMER")}
                  >
                    <img
                      className={Styles.PickupIcon}
                      src={Pickup}
                      alt="icon"
                    />
                    <div className={Styles.categoryTypesCard}>
                      <p className={Styles.hereText}>{t("i_am_here_as")}</p>
                      <h2 className={Styles.categoryTypes}>
                        {t("pickup_dropoff")}
                      </h2>
                    </div>
                    <div
                      className={`${Styles.circleChoose} ${
                        selectedOption === "CONSUMER" ? Styles.selected : ""
                      }`}
                    >
                      {selectedOption === "CONSUMER" && (
                        <FontAwesomeIcon
                          className={Styles.selectedCheck}
                          icon={faCheck}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`${Styles.categoryCards} ${
                      selectedOption === "DELIVERY_BOY" ? Styles.selected : ""
                    }`}
                    onClick={() => handleCardClick("DELIVERY_BOY")}
                  >
                    <img
                      className={Styles.DeliveryboyIcon}
                      src={Deliveryboy}
                      alt="icon"
                    />
                    <div className={Styles.categoryTypesCard}>
                      <p className={Styles.hereText}>{t("i_am_here_as")}</p>
                      <h2 className={Styles.categoryTypes}>
                        {t("delivery_boy")}
                      </h2>
                    </div>
                    <div
                      className={`${Styles.circleChoose} ${
                        selectedOption === "DELIVERY_BOY" ? Styles.selected : ""
                      }`}
                    >
                      {selectedOption === "DELIVERY_BOY" && (
                        <FontAwesomeIcon
                          className={Styles.selectedCheck}
                          icon={faCheck}
                        />
                      )}
                    </div>
                  </div>

                  <div className={Styles.chooseContinueCard}>
                    <button
                      className={Styles.chooseContinueBtn}
                      onClick={handleContinue}
                    >
                      {t("continue")}
                    </button>
                  </div>

                  <div>
                    <p className={Styles.accountLogin}>
                      {t("already_have_an_account")}{" "}
                      <Link to="/login" className={Styles.loginGoBtn}>
                        {t("login")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.profileChooseBannerCard}>
                <img
                  className={Styles.chooseBanner}
                  src={HomeBanner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileChoose;
