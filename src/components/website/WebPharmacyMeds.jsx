import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import PharmacyBanner from "../../assets/webImages/PharmacyMedsBanner.png";
import SecureDeliveries from "../../assets/webImages/SecureDiscreetDeliveries.png";
import UrgentDeliveries from "../../assets/webImages/UrgentScheduledDeliveries.png";
import ProfessionalDelivery from "../../assets/webImages/ProfessionalDeliveryPersonnel.png";
import PharmacyTracking from "../../assets/webImages/PharmacyLiveOrderTracking.png";
import PharmacyTrackingEnglish from "../../assets/webImages/PharmacyLiveOrderTrackingEnglish.svg";
import ReliableService from "../../assets/webImages/ReliableServiceCard.png";
import WebOurPartnerCard from "./WebOurPartnerCard";
import WebBannerCards from "./WebBannerCards";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebPharmacyMeds() {
  const { t, i18n } = useTranslation();

  const pharmacyTrackingImage =
    i18n.language === "fr" ? PharmacyTracking : PharmacyTrackingEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <WebBannerCards
        title={t("pharmacy")}
        description={t("pharmacy_banner_description")}
        imageSrc={PharmacyBanner}
        altText="Pharmacy Banner"
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
                  <h2>{t("prompt_medical_deliveries")}</h2>
                  <p>{t("prompt_medical_deliveries_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("handling_standards")}</h2>
                  <p>{t("handling_standards_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("wide_service_network")}</h2>
                  <p>{t("wide_service_network_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("round_clock_accessibility")}</h2>
                  <p>{t("round_clock_accessibility_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>5</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("rapidmate_cosystem")}</h2>
                  <p>{t("rapidmate_cosystem_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Secure Deliveries Card Start Here  */}
      <WebLeftImageTextCard
        imageSrc={SecureDeliveries}
        altText="Secure Deliveries"
        title={t("secure_discreet")}
        subtitle={t("deliveries")}
        description={t("secure_discreet_description")}
      />
      {/* Urgent & Scheduled Deliveries Card Start Here  */}
      <section className={Styles.WebPharmacyUrgentDeliverySec}>
        <div className={Styles.WebPharmacyUrgentDeliveryMainCard}>
          <div className="col-md-4">
            <div className={Styles.WebPharmacyUrgentDeliveryTextCard}>
              <h2>
                {t("urgent_and")}
                <br /> <span>{t("scheduled_deliveries")}</span>
              </h2>
              <p>{t("scheduled_deliveries_description")}</p>
            </div>
          </div>

          <div className="col-md-8">
            <div className={Styles.WebPharmacyUrgentDeliveryImageCard}>
              <img src={UrgentDeliveries} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Order History & Tracking Crad  */}
      <WebLeftImageTextCard
        imageSrc={ProfessionalDelivery}
        altText="Professional Delivery"
        title={t("professional")}
        subtitle={t("delivery_personnel")}
        description={t("delivery_personnel_description")}
      />
      {/* Pharmacy Live Order Tracking  */}
      <section className={Styles.WebPharmacyLiveTrackingSec}>
        <div className={Styles.WebPharmacyLiveTrackingRow}>
          <div className="col-md-6">
            <div className={Styles.WebPharmacyLiveTrackingTextCard}>
              <h2>
                {t("live_order")} <span>{t("live_tracking")}</span>
              </h2>
              <p>{t("live_tracking_description")}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebPharmacyLiveTrackingImageCard}>
              <img src={pharmacyTrackingImage} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/* Reliable Service Card Start here */}
      <WebLeftImageTextCard
        imageSrc={ReliableService}
        altText="Reliable Service"
        title={t("reliable")}
        subtitle={t("service")}
        description={t("reliable_service_description")}
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

export default WebPharmacyMeds;
