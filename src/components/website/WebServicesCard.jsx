import React from "react";
import RestaurantsCard from "../../assets/webImages/RestaurantsCard.json";
import Grocery from "../../assets/webImages/GroceryCard.json";
import Meds from "../../assets/webImages/Pharmacy-MedsCard.json";
import Gifts from "../../assets/webImages/GiftCard.json";
import ECommerce from "../../assets/webImages/E-CommerceCard.json";
import Styles from "../../assets/webcss/WebHome.module.css";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WebServicesCard = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className={Styles.homeCompaniesSec}>
        <div className={Styles.homeServicesMainCard}>
          <div className="col-md-2">
            <Link to="/web-restaurants">
              <div className={Styles.homerCardsImagesbg}>
                <div className={Styles.homerCardsImages}>
                  <Lottie animationData={RestaurantsCard} loop={true} />
                </div>
                <p className={Styles.homeResturentCardsText}>{t("restaurants")}</p>
              </div>
            </Link>
          </div>

          <div className="col-md-2">
            <Link to="/web-grocery">
              <div className={Styles.homerCardsImagesbg}>
                <div className={Styles.homerCardsImages}>
                  <Lottie animationData={Grocery} loop={true} />
                </div>
                <p className={Styles.homeResturentCardsText}>{t("grocery")}</p>
              </div>
            </Link>
          </div>

          <div className="col-md-2">
            <Link to="/web-e-commerce">
              <div className={Styles.homerCardsImagesbg}>
                <div className={Styles.homerCardsImages}>
                  <Lottie animationData={ECommerce} loop={true} />
                </div>
                <p className={Styles.homeResturentCardsText}>{t("e_commerce")}</p>
              </div>
            </Link>
          </div>

          <div className="col-md-2">
            <Link to="/web-pharmacy-meds">
              <div className={Styles.homerCardsImagesbg}>
                <div className={Styles.homerCardsImages}>
                  <Lottie animationData={Meds} loop={true} />
                </div>
                <p className={Styles.homeResturentCardsText}>{t("pharmacy")}</p>
              </div>
            </Link>
          </div>

          <div className="col-md-2">
            <Link to="/web-gifts">
              <div className={Styles.homerCardsImagesbg}>
                <div className={Styles.homerCardsImages}>
                  <Lottie animationData={Gifts} loop={true} />
                </div>
                <p className={Styles.homeResturentCardsText}>{t("gifts")}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebServicesCard;
