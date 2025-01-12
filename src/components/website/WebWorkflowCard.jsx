import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import OnDemandCard from "../../assets/webImages/OnDemandCard.json";
import TrackOrder from "../../assets/webImages/TrackOrderCard.json";
import TrackOrderEnglish from "../../assets/webImages/TrackYourOrderEnglish.json";
import ShiftBased from "../../assets/webImages/Shift-Based-Card.json";
import ShiftBasedEnglish from "../../assets/webImages/ShiftBasedEnglish.json";
import DeliveryVehicle from "../../assets/webImages/ChooseDeliveryVehicle.json";
import SpecializedVehicle from "../../assets/webImages/SpecializedVehicleCard.json";
import IsolationMode from "../../assets/webImages/Isolation_Mode.png";
import SecurePayment from "../../assets/webImages/SecurePayment.json";
import SecurePaymentEnglish from "../../assets/webImages/BookNowEnglish.json";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

const WebWorkflowCard = () => {
  const { t, i18n } = useTranslation();

  // Determine which animation to use based on the selected language
  const trackOrderAnimation =
    i18n.language === "fr" ? TrackOrder : TrackOrderEnglish;
  const shiftBasedAnimation =
    i18n.language === "fr" ? ShiftBased : ShiftBasedEnglish;
  const securePaymentAnimation =
    i18n.language === "fr" ? SecurePayment : SecurePaymentEnglish;

  return (
    <>
      <section className={Styles.WebWorkflowSec}>
        <div>
          <h1 className={Styles.workFlowMainText}>
            {t("deliveries_per_month")} <span>Rapidmate:</span> <br />{" "}
            {t("transforming_workflow")}
          </h1>
        </div>
        <div>
          <div className={Styles.workFlowMainBorderCard}>
            <div className={Styles.workFlowMainBorderCard}>
              <img
                className={Styles.workFlowIsolationModeCard}
                src={IsolationMode}
                alt="img"
              />
            </div>
            <div className={Styles.workFlowDeliverySolutionRow}>
              <div className="col-md-8">
                <div className={Styles.workFlowDeliverySolutionCard}>
                  <h2>
                    <span>{t("on_demand")}</span> {t("delivery")} <br />{" "}
                    {t("solution_for_everyone")}
                  </h2>

                  <p>{t("on_demand_description")}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <Lottie animationData={OnDemandCard} loop={true} />
                </div>
              </div>
            </div>

            <div className={Styles.workFlowOrderTrackRow}>
              <div className="col-md-6">
                <div>
                  <Lottie animationData={trackOrderAnimation} loop={true} />
                </div>
              </div>
              <div className="col-md-6">
                <div className={Styles.workFlowTrackOrderCard}>
                  <h2>
                    {t("track_your")} <br />
                    {t("orders_in")} <span>{t("real_time")}</span>
                  </h2>
                  <p>{t("track_your_description")}</p>
                </div>
              </div>
            </div>

            <div className={Styles.workFlowShiftBasedRow}>
              <div className="col-md-8">
                <div className={Styles.workFlowDeliverySolutionCard}>
                  <h2>
                    <span>{t("efficient_shift_based")}</span> <br />
                    {t("deliveries")}
                  </h2>
                  <p>{t("efficient_shift_description")}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <Lottie animationData={shiftBasedAnimation} loop={true} />
                </div>
              </div>
            </div>

            <div className={Styles.workFlowDeliveryVehicleRow}>
              <div className="col-md-6">
                <div>
                  <Lottie animationData={DeliveryVehicle} loop={true} />
                </div>
              </div>
              <div className="col-md-6">
                <div className={Styles.workFlowDeliveryVehicleCard}>
                  <h2>
                    {t("choose_your")} <br />{" "}
                    <span>{t("delivery_vehicle")}</span>
                  </h2>
                  <p>{t("choose_your_description")}</p>
                </div>
              </div>
            </div>

            <div className={Styles.workFlowSecurePaymentRow}>
              <div className="col-md-8">
                <div className={Styles.workFlowDeliverySolutionCard}>
                  <h2>
                    {t("secure_payments")}
                    <br />
                    <span>{t("effortless_booking")}</span>
                  </h2>
                  <p>{t("effortless_booking_description")}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <Lottie animationData={securePaymentAnimation} loop={true} />
                </div>
              </div>
            </div>

            <div className={Styles.workFlowSpecializedVehicleRow}>
              <div className="col-md-6">
                <div>
                  <Lottie animationData={SpecializedVehicle} loop={true} />
                </div>
              </div>
              <div className="col-md-6">
                <div className={Styles.workFlowDeliveryVehicleCard}>
                  <h2>
                    <span>{t("specialized_vehicle")}</span> <br />{" "}
                    {t("specialized_assistance")}
                  </h2>
                  <p>{t("specialized_assistance_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebWorkflowCard;
