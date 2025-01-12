import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import DownloadCard from "../../assets/webImages/WebAppDownloadCard.png";
import PlayAndAppStoreCard from "../../assets/webImages/PlayAndAppStoreCard.png";
import { useTranslation } from "react-i18next";

const WebPlayStoreCard = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <section className={Styles.WebApplicationDownloadSec}>
        <div className={Styles.WebApplicationDownloadRow}>
          <div className="col-md-6">
            <div className={Styles.WebApplicationDownloadImageCard}>
              <img src={DownloadCard} alt="img" />
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebApplicationDownloadMainCard}>
              <h2>
                <span>Rapidmate </span>
                {t("now_your_fingertips")}
              </h2>
              <p>{t("now_your_fingertips_description")}</p>
              <img src={PlayAndAppStoreCard} alt="img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebPlayStoreCard;
