import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import RestaurantBanner from "../../assets/webImages/RestaurantsBanner.png";
import ShiftBased from "../../assets/webImages/ShiftBasedDeliveryCard.png";
import ShiftBasedEnglish from "../../assets/webImages/ShiftBasedDeliveryEnglish.svg";
import ScheduledCard from "../../assets/webImages/RestaurantScheduleCard.png";
import ScheduledCardEnglish from "../../assets/webImages/RestaurantScheduleEnglish.svg";
import Track from "../../assets/webImages/RealTimeTracking.png";
import TrackEnglish from "../../assets/webImages/RealTimeTrackingEnglish.svg";
import ProfileFeedback from "../../assets/webImages/ProfileFeedbackCard.png";
import SeamlessCoordination from "../../assets/webImages/SeamlessCoordination.png";
import SeamlessCoordinationEnglish from "../../assets/webImages/SeamlessCoordinationEnglish.svg";
import LoginTrackingCard from "../../assets/webImages/LoginTrackingCard.png";
import WebOurPartnerCard from "./WebOurPartnerCard";
import WebBannerCards from "./WebBannerCards";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import WebRightImageTextCard from "./WebRightImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebRestaurants() {
  const { t, i18n } = useTranslation();

  const shiftBasedImages =
    i18n.language === "fr" ? ShiftBased : ShiftBasedEnglish;
  const scheduledCardImages =
    i18n.language === "fr" ? ScheduledCard : ScheduledCardEnglish;
  const trackImages = i18n.language === "fr" ? Track : TrackEnglish;
  const seamlessCoordinationImages = i18n.language === "fr" ? SeamlessCoordination : SeamlessCoordinationEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <WebBannerCards
        title={t("restaurants")}
        description={t("restaurants_banner_description")}
        imageSrc={RestaurantBanner}
        altText="Restaurants Banner"
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
                  <h2>{t("straightforward_pricing")}</h2>
                  <p>{t("straightforward_pricing_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("lightning_fast")}</h2>
                  <p>{t("lightning_fast_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("your_data_Insights")}</h2>
                  <p>{t("your_data_Insights_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("optimized_delivery")}</h2>
                  <p>{t("optimized_delivery_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shift Based Delivery Card Start Here  */}
      <WebLeftImageTextCard
        imageSrc={shiftBasedImages}
        altText="Shift-based delivery"
        title={t("shift_based")}
        subtitle={t("delivery_service")}
        description={t("shift_based_description")}
      />
      {/* Schedule Request Card  */}
      <section className={Styles.RestaurantScheduleSec}>
        <div className={Styles.RestaurantScheduleMainCard}>
          <div className={Styles.RestaurantScheduleTextCard}>
            <h2>
              {t("immediate")} <br />{" "}
              <span>{t("immediate_schedule_request")}</span>
            </h2>

            <p>{t("immediate_schedule_request_description")}</p>
          </div>
          <div className={Styles.RestaurantScheduleImgCard}>
            <img className="w-100" src={scheduledCardImages} alt="img" />
          </div>
        </div>
      </section>
      {/* RealTime Tracking Card Start Here  */}
      <WebRightImageTextCard
        heading={t("realtime")}
        subHeading={t("tracking")}
        text={t("realtime_tracking_description")}
        image={trackImages}
        altText="Realtime Tracking"
      />
      {/* Profile Feedback Card Start Here  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={ProfileFeedback} alt="img" />
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.RestaurantProfileFeedbackTextCard}>
              <h2>
                {t("profile")} <br />
                <span>{t("feedback")}</span>
              </h2>
              <p>{t("profile_feedback_description")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Seamless Coordination Card Start Here  */}
      <WebRightImageTextCard
        heading={t("seamless")}
        subHeading={t("coordination")}
        text={t("seamless_coordination_description")}
        image={seamlessCoordinationImages}
        altText="Seamless Coordination"
      />
      {/* Login/Logout Tracking Card Start Here  */}
      <section className={Styles.RestaurantLogingTrackingSec}>
        <div className={Styles.RestaurantLogingTrackingRow}>
          <div className="col-md-4">
            <div className={Styles.RestaurantLogingTrackinImageCard}>
              <img className="w-100" src={LoginTrackingCard} alt="img" />
            </div>
          </div>

          <div className="col-md-8">
            <div className={Styles.RestaurantLogingTrackinTextCard}>
              <h2>
                {t("login_logout")} <br /> <span>{t("tracking")}</span>
              </h2>

              <p>{t("login_logout_trackin_description")}</p>
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

export default WebRestaurants;
