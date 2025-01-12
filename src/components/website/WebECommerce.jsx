import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import ECommerceBanner from "../../assets/webImages/ECommerceBanner.png";
import Integration from "../../assets/webImages/ECommrceSeamlessIntegration.png";
import MultipleDelivery from "../../assets/webImages/MultipleDeliveryPoints.png";
import MultipleDeliveryEnglish from "../../assets/webImages/RapidmateMultipleDeliveryPointsEnglish.svg";
import CustomDelivery from "../../assets/webImages/CustomDeliveryScheduling.png";
import VehicleCard from "../../assets/webImages/DeliveryVehicleImage.png";
import LiveTracking from "../../assets/webImages/ECommerceLiveTracking.png";
import LiveTrackingEnglish from "../../assets/webImages/ECommerceLiveTrackingEnglish.svg";
import WebOurPartnerCard from "./WebOurPartnerCard";
import WebBannerCards from "./WebBannerCards";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebECommerce() {
  const { t, i18n } = useTranslation();

  const multipleDeliveryImage =
    i18n.language === "fr" ? MultipleDelivery : MultipleDeliveryEnglish;
  const liveTrackingImage =
    i18n.language === "fr" ? LiveTracking : LiveTrackingEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <WebBannerCards
        title={t("e_commerce")}
        description={t("e_commerce_banner_description")}
        imageSrc={ECommerceBanner}
        altText="E-Commerce Banner"
      />
      {/* Delivery Solution Card Start Here  */}
      <section className={Styles.RestaurantDeliverySolutionSec}>
        <div>
          <h2 className={Styles.RestaurantDeliveryTitleText}>
            {t("advantages_of_partnering")}{" "}
            <span>{t("advantages_of_solution")}</span>
          </h2>
          <div className={`${Styles.manageRow} row`}>
            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>1</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("sustainable_delivery_options")}</h2>
                  <p>{t("sustainable_delivery_options_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("faster_delivery_times")}</h2>
                  <p>{t("faster_delivery_times_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("affordable_solutions")}</h2>
                  <p>{t("affordable_solutions_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("seamless_implementation")}</h2>
                  <p>{t("seamless_implementation_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>5</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("reliable_logistics_partner")}</h2>
                  <p>{t("reliable_logistics_partner_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Secure Deliveries Card Start Here  */}
      <WebLeftImageTextCard
        imageSrc={Integration}
        altText="Seamless Integration"
        title={t("seamless")}
        subtitle={t("integration")}
        description={t("integration_description")}
      />
      {/* Urgent & Scheduled Deliveries Card Start Here  */}
      <section className={Styles.CommerceMultipleDeliverySec}>
        <div className={Styles.CommerceMultipleDeliveryMainCard}>
          <div className={Styles.CommerceMultipleDeliveryTextMainCard}>
            <h2>
              {t("Multiple_delivery")} <span>{t("delivery_points")}</span>
            </h2>
            <p>{t("delivery_points_description")}</p>
            <img className="w-100" src={multipleDeliveryImage} alt="img" />
          </div>
        </div>
      </section>
      {/* Order History & Tracking Crad  */}
      <WebLeftImageTextCard
        imageSrc={CustomDelivery}
        altText="Custom Delivery Scheduling"
        title={t("custom_delivery")}
        subtitle={t("scheduling")}
        description={t("scheduling_description")}
      />
      {/* Pharmacy Live Order Tracking  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div className={Styles.RestaurantProfileFeedbackTextCard}>
              <h2>
                {t("live_order")}
                <br />
                <span>{t("live_tracking")}</span>
              </h2>
              <p>{t("e_commerce_live_tracking_description")}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={liveTrackingImage} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Reliable Service Card Start here */}
      <WebLeftImageTextCard
        imageSrc={VehicleCard}
        altText="Vehicles"
        title={t("wide_range_of")}
        subtitle={t("vehicle")}
        description={t("range_vehicle_description")}
      />
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/* Our Partner Card Start Here  */}
      <WebOurPartnerCard />
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
}

export default WebECommerce;
