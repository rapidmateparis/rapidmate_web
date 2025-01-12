import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import GiftsBanner from "../../assets/webImages/GiftsBanner.png";
import SpecializedDelivery from "../../assets/webImages/SpecializedDelivery.png";
import ScheduledDeliveries from "../../assets/webImages/GiftsScheduledDeliveries.png";
import ScheduledDeliveriesEnglish from "../../assets/webImages/GiftsScheduledDeliveriesEnglish.svg";
import CustomNotes from "../../assets/webImages/GiftsCustomNotes.png";
import VehicleCard from "../../assets/webImages/DeliveryVehicleImage.png";
import LiveTracking from "../../assets/webImages/GiftsLiveTracking.png";
import LiveTrackingEnglish from "../../assets/webImages/GiftsLiveTrackingEnglish.svg";
import WebOurPartnerCard from "./WebOurPartnerCard";
import WebBannerCards from "./WebBannerCards";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebGifts() {
  const { t, i18n } = useTranslation();

  const scheduledDeliveriesImage =
    i18n.language === "fr" ? ScheduledDeliveries : ScheduledDeliveriesEnglish;
  const liveTrackingImage =
    i18n.language === "fr" ? LiveTracking : LiveTrackingEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <WebBannerCards
        title={t("gifts")}
        description={t("gifts_baanner_description")}
        imageSrc={GiftsBanner}
        altText="Gifts Banner"
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
                  <h2>{t("seamless_delivery")}</h2>
                  <p>{t("seamless_delivery_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("customizable_routes")}</h2>
                  <p>{t("customizable_routes_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("professional_fleet_services")}</h2>
                  <p>{t("professional_fleet_services_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("real_time_tracking")}</h2>
                  <p>{t("real_time_tracking_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>5</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("service_availability")}</h2>
                  <p>{t("service_availability_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Secure Deliveries Card Start Here  */}
      <WebLeftImageTextCard
        imageSrc={SpecializedDelivery}
        altText="Specialized Delivery"
        title={t("specialized")}
        subtitle={t("delivery")}
        description={t("specialized_delivery_description")}
      />
      {/* Urgent & Scheduled Deliveries Card Start Here  */}
      <section className={Styles.WebPharmacyUrgentDeliverySec}>
        <div className={Styles.WebPharmacyUrgentDeliveryMainCard}>
          <div className="col-md-4">
            <div className={Styles.WebPharmacyUrgentDeliveryTextCard}>
              <h2>
                {t("same_day_and")}
                <br /> <span>{t("scheduled_deliveries")}</span>
              </h2>
              <p>{t("same_day_and_description")}</p>
            </div>
          </div>

          <div className="col-md-8">
            <div className={Styles.WebPharmacyUrgentDeliveryImageCard}>
              <img src={scheduledDeliveriesImage} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Order History & Tracking Crad  */}
      <WebLeftImageTextCard
        imageSrc={CustomNotes}
        altText="Custom Notes"
        title={t("custom_notes_and")}
        subtitle={t("instructions")}
        description={t("instructions_description")}
      />
      {/* Pharmacy Live Order Tracking  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div className={Styles.RestaurantProfileFeedbackTextCard}>
              <h2>
                {t("wide_range_of")}
                <br />
                <span>{t("varying_vehicle_options")}</span>
              </h2>
              <p>{t("wide_range_of_description")}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={VehicleCard} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Reliable Service Card Start here */}
      <WebLeftImageTextCard
        imageSrc={liveTrackingImage}
        altText="Live Tracking"
        title={t("live_tracking_and")}
        subtitle={t("updates")}
        description={t("updates_description")}
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

export default WebGifts;
