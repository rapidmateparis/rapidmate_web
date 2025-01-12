import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";

const WebLeftImageTextCard = ({ 
  imageSrc, 
  altText, 
  title, 
  subtitle, 
  description, 
  sectionClass, 
  rowClass, 
  textCardClass 
}) => {
  return (
    <section className={sectionClass || Styles.RestaurantShiftBasedSec}>
      <div className={rowClass || Styles.RestaurantShiftBasedRow}>
        <div className="col-md-6">
          <div>
            <img className="w-100" src={imageSrc} alt={altText} />
          </div>
        </div>

        <div className="col-md-6">
          <div className={textCardClass || Styles.RestaurantShiftBasedTextCard}>
            <h2>
              {title} <br /> <span>{subtitle}</span>
            </h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebLeftImageTextCard;
