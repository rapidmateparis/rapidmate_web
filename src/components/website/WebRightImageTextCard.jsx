import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";

const WebRightImageTextCard = ({
  heading,
  subHeading,
  text,
  image,
  altText,
}) => {
  return (
    <section className={Styles.RestaurantRealTimeTrackingSec}>
      <div className={Styles.RestaurantRealTimeTrackingRow}>
        <div className="col-md-6">
          <div className={Styles.RestaurantRealTimeTrackingTextCard}>
            <h2>
              {heading} <br /> <span>{subHeading}</span>
            </h2>
            <p>{text}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <img className="w-100" src={image} alt={altText} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebRightImageTextCard;
