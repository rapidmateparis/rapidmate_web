import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import Banner from "../../assets/webImages/IndividualsBanner.png";
import BannerEnglish from "../../assets/webImages/IndividualsBannerEnglish.svg";
import Individuals from "../../assets/webImages/Individuals_Page.png";
import Scheduled from "../../assets/webImages/IndivisualCustomizedScheduledDelivery.png";
import ScheduledEnglish from "../../assets/webImages/IndivisualCustomizedScheduledDeliveryEnglish.svg";
import PackersMovers from "../../assets/webImages/WebPackersMovers.png";
import VehicleAssistance from "../../assets/webImages/VehicleAssistance.png";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import WebRightImageTextCard from "./WebRightImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebIndividuals() {
  const { t, i18n } = useTranslation();

  const bannerImage = i18n.language === "fr" ? Banner : BannerEnglish;
  const scheduledImage = i18n.language === "fr" ? Scheduled : ScheduledEnglish;
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <section className={Styles.WebIndividualsSec}>
        <div className={Styles.WebIndividualsMainCard}>
          <div className={Styles.WebIndividualsMainTextCard}>
            <h2>{t("individuals_page")}</h2>
            <img className="w-100" src={bannerImage} alt="img" />
          </div>
        </div>
      </section>
      {/*  */}
      <WebLeftImageTextCard
        imageSrc={Individuals}
        altText="Image"
        title={t("book_on_demand")}
        subtitle={t("delivery")}
        description={t("book_on_demand_description")}
      />
      {/*  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div className={Styles.WebIndividualsScheduledMainCard}>
              <h2>
                {t("customized_scheduled")}{" "}
                <span>{t("scheduled_individual_delivery")}</span>
              </h2>
              <p>{t("scheduled_individual_delivery_description")}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={scheduledImage} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className={Styles.WebPackersMoversSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={PackersMovers} alt="img" />
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.WebIndividualsPackersMoversMainCard}>
              <h2>
                {t("packers_and")} <span>{t("movers")}</span>
              </h2>
              <p>{t("packers_and_movers_description")}</p>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <WebRightImageTextCard
        heading={t("specialized_vehicle")}
        subHeading={t("specialized_assistance")}
        text={t("individual_specialized_vehicle_description")}
        image={VehicleAssistance}
        altText="Vehicle Assistance"
      />
      {/* Delivery Solution Card Start Here  */}
      <section className={Styles.RestaurantDeliverySolutionSec}>
        <div>
          <h2 className={Styles.RestaurantDeliveryTitleText}>
            {t("advantages_of_partnering")}{" "}
            <span>{t("individuals_solutions")}</span>
          </h2>
          <div className={`${Styles.manageRow} row`}>
            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>1</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("broad_range_of_vehicles")}</h2>
                  <p>{t("broad_range_of_vehicles_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>2</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("reliable_and_secure_handling")}</h2>
                  <p>{t("reliable_and_secure_handling_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>3</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("real_time_tracking")}</h2>
                  <p>{t("individual_real_time_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>4</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("individual_availability")}</h2>
                  <p>{t("individual_availability_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>5</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("expert_professionals")}</h2>
                  <p>{t("expert_professionals_description")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={Styles.RestaurantDeliverySolutionMainCard}>
                <p className={Styles.RestaurantCountText}>6</p>
                <div className={Styles.RestaurantCommissionsCard}>
                  <h2>{t("transparent_affordable_pricing")}</h2>
                  <p>{t("transparent_affordable_pricing_description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
}

export default WebIndividuals;
