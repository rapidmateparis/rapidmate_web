import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeBanner from "../../assets/webImages/HomeBanner.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faComment } from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/webcss/WebHome.module.css";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

const WebHomeBannerCard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { t } = useTranslation();
  return (
    <>
      {/* modal start here  */}
      <section className={Styles.homeSection}>
        <div className={Styles.bannerMainCard}>
          <div className={`${Styles.manageRow} row`}>
            <div className="col-md-6">
              <div className={Styles.homeInfoCard}>
                <h1 className={Styles.homeTitle}>{t("webHome_bannerTitle")}</h1>
                <p className={Styles.homeDiscription}>
                  {t("webHome_bannerDescription")}
                </p>
                <div className={Styles.homeActionBtns}>
                  <Link className={Styles.trailButton} to="/">
                  {t("webHome_bannerTrial")}
                  </Link>
                  <a className={Styles.demoBtn} href="#">
                    <FontAwesomeIcon
                      className={Styles.playIcon}
                      icon={faCirclePlay}
                    />
                    <p className={Styles.demoPlay}>{t("webHome_bannerDemo")}</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.bannerCard}>
                <Lottie animationData={HomeBanner} loop={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebHomeBannerCard;
