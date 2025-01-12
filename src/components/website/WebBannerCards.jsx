import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";

const WebBannerCards = ({ title, description, imageSrc, altText, customClass }) => {
  return (
    <section className={`${Styles.RestaurantBannerMainSec} ${customClass || ""}`}>
      <div className={Styles.RestaurantBannerMainRowCard}>
        <div className="col-md-6">
          <div className={Styles.RestaurantBannerTextCard}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <img className="w-100" src={imageSrc} alt={altText || "banner"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebBannerCards;
