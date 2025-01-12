import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import GroceryBanner from "../../assets/webImages/GroceryBannerCard.png";
import GroceryBannerEnglish from "../../assets/webImages/GroceryBannerEnglish.svg";
import QuickDeliveries from "../../assets/webImages/QuickEfficientDeliveries.png";
import MultipleDelivery from "../../assets/webImages/MultipleDeliveryPoints.png";
import MultipleDeliveryEnglish from "../../assets/webImages/MultipleDeliveryPointsEnglish.svg";
import VehicleOptions from "../../assets/webImages/VaryingVehicleOptions.png";
import GroceryTracking from "../../assets/webImages/GroceryTrackingCard.png";
import GroceryTrackingEnglish from "../../assets/webImages/GroceryTrackingEnglish.svg";
import CustomerSatisfaction from "../../assets/webImages/CustomerSatisfaction.png";
import WebOurPartnerCard from "./WebOurPartnerCard";
import WebBannerCards from "./WebBannerCards";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import WebRightImageTextCard from "./WebRightImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebGrocery() {
  const { t, i18n } = useTranslation();

  const groceryBanner =
    i18n.language === "fr" ? GroceryBanner : GroceryBannerEnglish;
  const multipleDeliveryImage =
    i18n.language === "fr" ? MultipleDelivery : MultipleDeliveryEnglish;
  const groceryTrackingImage =
    i18n.language === "fr" ? GroceryTracking : GroceryTrackingEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <WebBannerCards
        title={t("grocery")}
        description={t("grocery_banner_description")}
        imageSrc={groceryBanner}
        altText="Grocery Banner"
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
                  <h2>{t("smart_integration")}</h2>
                  <p>{t("smart_integration_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("comprehensive_platform")}</h2>
                  <p>{t("comprehensive_platform_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("adaptable_size")}</h2>
                  <p>{t("adaptable_size_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("versatile_fleet")}</h2>
                  <p>{t("versatile_fleet_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>5</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("convenient_scheduling")}</h2>
                  <p>{t("convenient_scheduling_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shift Based Delivery Card Start Here  */}
      <WebLeftImageTextCard
        imageSrc={QuickDeliveries}
        altText="Shift-based delivery"
        title={t("quickand")}
        subtitle={t("quickand_delivery")}
        description={t("quickand_delivery_description")}
      />
      {/* Schedule Request Card  */}
      <section className={Styles.RestaurantScheduleSec}>
        <div className={Styles.RestaurantScheduleMainCard}>
          <div className={Styles.RestaurantScheduleTextCard}>
            <h2>
              {t("Multiple_delivery")} <br />{" "}
              <span>{t("Multiple_delivery_options")}</span>
            </h2>
            <p>{t("Multiple_delivery_options_description")}</p>
          </div>
          <div className={Styles.WebGroceryMultipleDeliveryCard}>
            <img className="w-75" src={multipleDeliveryImage} alt="img" />
          </div>
        </div>
      </section>
      {/* RealTime Tracking Card Start Here  */}
      <WebRightImageTextCard
        heading={t("varying_vehicle")}
        subHeading={t("varying_vehicle_options")}
        text={t("varying_vehicle_options_description")}
        image={VehicleOptions}
        altText="Vehicle Options"
      />
      {/* Order History & Tracking Crad  */}
      <WebLeftImageTextCard
        imageSrc={groceryTrackingImage}
        altText="Order Tracking"
        title={t("order_history")}
        subtitle={t("order_history_tracking")}
        description={t("order_history_tracking_description")}
      />
      {/* Profile Feedback Card Start Here  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div className={Styles.GroceryCustomerSatisfactionTextCard}>
              <h2>
                {t("customer")} <br />
                <span>{t("Satisfaction")}</span>
              </h2>
              <p>{t("customer_satisfaction_description")}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.GroceryCustomerSatisfactionImgCard}>
              <img src={CustomerSatisfaction} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/* Our Partner Card Start Here  */}
      <WebOurPartnerCard />
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
}

export default WebGrocery;
