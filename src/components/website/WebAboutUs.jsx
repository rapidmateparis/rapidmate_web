import React, { useState } from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import Banner from "../../assets/webImages/AboutUsBanner.png";
import WhoWeAreCard from "../../assets/webImages/AboutWhoWeAreCard.png";
import OurMission from "../../assets/webImages/AboutOurMission.png";
import OurVision from "../../assets/webImages/OurVision.png";
import FlexibleDelivery from "../../assets/webImages/FlexibleDeliveryOptions.png";
import WideRangeVehicles from "../../assets/webImages/AboutWideRangeVehicles.png";
import SecureReliable from "../../assets/webImages/SecureReliable.png";
import PaymentOptions from "../../assets/webImages/VersatilePaymentOptions.png";
import PaymentOptionsEnglish from "../../assets/webImages/VersatilePaymentOptionsEnglish.svg";
import CentricApproach from "../../assets/webImages/CustomerCentricApproach.png";
import Team1 from "../../assets/webImages/Team-1.png";
import Team2 from "../../assets/webImages/Team-2.png";
import Team3 from "../../assets/webImages/Team-3.png";
import Team4 from "../../assets/webImages/Team-4.png";
import Excellence from "../../assets/webImages/ExcellenceDelivered.png";
import OnTimeEveryTime from "../../assets/webImages/OnTimeEveryTime.png";
import CustomersFirst from "../../assets/webImages/CustomersFirst.png";
import InnovatingAhead from "../../assets/webImages/InnovatingAhead.png";
import WebLeftImageTextCard from "./WebLeftImageTextCard";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebAboutUs() {
  const { t, i18n } = useTranslation();

  const paymentOptionsImages =
    i18n.language === "fr" ? PaymentOptions : PaymentOptionsEnglish;

  return (
    <>
      {/* Header Start Here */}
      <Header />
      {/* Banner Card Start Here */}
      <section className={Styles.WebBecomeCourierSec}>
        <div className={Styles.WebAboutUsTitleTextCard}>
          <h2>{t("about_us")}</h2>
          <img className="w-100" src={Banner} alt="Banner" />
        </div>
      </section>
      {/*  */}
      <WebLeftImageTextCard
        imageSrc={WhoWeAreCard}
        altText="Who We Are"
        title={t("who_we")}
        subtitle={t("who_we_are")}
        description={t("who_we_are_description")}
      />
      {/*  */}
      <section className={Styles.RestaurantProfileFeedbackSec}>
        <div className={Styles.RestaurantProfileFeedbackRow}>
          <div className="col-md-6">
            <div className={Styles.WebIndividualsScheduledMainCard}>
              <h2>
                {t("our")} <span>{t("mission")}</span>
              </h2>
              <p>{t("our_mission_description")}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <img className="w-100" src={OurMission} alt="img" />
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <WebLeftImageTextCard
        imageSrc={OurVision}
        altText="Our Vision"
        title={t("vision")}
        subtitle={""}
        description={t("our_vision_description")}
      />
      {/*  */}
      <section className={Styles.WebWhyChooseUsSec}>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsTitleCard}>
              <h2>
                {t("why")} <br /> <span>{t("choose_us")}</span>
              </h2>
              <p>{t("why_choose_us_description")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsFlexibleMainCard}>
              <div className={Styles.WebWhyChooseUsFlexibleDelivery}>
                <img className="w-100" src={FlexibleDelivery} alt="img" />
              </div>
              <p>{t("flexible_delivery_options")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsFlexibleMainCard}>
              <div className={Styles.WebWhyChooseUsFlexibleDelivery}>
                <img className="w-100" src={WideRangeVehicles} alt="img" />
              </div>
              <p>{t("wide_range_vehicles")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsFlexibleMainCard}>
              <div className={Styles.WebWhyChooseUsFlexibleDelivery}>
                <img className="w-100" src={SecureReliable} alt="img" />
              </div>
              <p>{t("secure_and_reliable")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsFlexibleMainCard}>
              <div className={Styles.WebWhyChooseUsFlexibleDelivery}>
                <img className="w-75" src={paymentOptionsImages} alt="img" />
              </div>
              <p>{t("versatile_payment_options")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className={Styles.WebWhyChooseUsFlexibleMainCard}>
              <div className={Styles.WebWhyChooseUsFlexibleDelivery}>
                <img className="w-75" src={CentricApproach} alt="img" />
              </div>
              <p>{t("customer_centric_approach")}</p>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className={Styles.WebOurTeamSec}>
        <h2 className={Styles.WebOurTeamTitleText}>
          {t("our")} <span>{t("team")}</span>
        </h2>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-3">
            <div className={Styles.WebOurTeamMainCard}>
              <div className={Styles.WebOurTeamImagesCard}>
                <img src={Team1} alt="img" />
              </div>
              <div className={Styles.WebOurTeamDesignationCard}>
                <h2>{t("designation")}</h2>
                <p>{t("designation")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurTeamMainCard}>
              <div className={Styles.WebOurTeamImagesCard}>
                <img src={Team2} alt="img" />
              </div>
              <div className={Styles.WebOurTeamDesignationCard}>
                <h2>{t("designation")}</h2>
                <p>{t("designation")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurTeamMainCard}>
              <div className={Styles.WebOurTeamImagesCard}>
                <img src={Team3} alt="img" />
              </div>
              <div className={Styles.WebOurTeamDesignationCard}>
                <h2>{t("designation")}</h2>
                <p>{t("designation")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurTeamMainCard}>
              <div className={Styles.WebOurTeamImagesCard}>
                <img src={Team4} alt="img" />
              </div>
              <div className={Styles.WebOurTeamDesignationCard}>
                <h2>{t("designation")}</h2>
                <p>{t("designation")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className={Styles.WebOurCoreValuesSec}>
        <h2 className={Styles.WebOurCoreValuesTitleText}>
          {t("our_core")} <span>{t("our_core_values")}</span>
        </h2>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-3">
            <div className={Styles.WebOurCoreValuesMainCard}>
              <img src={Excellence} alt="Excellence" />
              <h2>{t("excellence_delivered")}</h2>
              <p>{t("excellence_delivered_description")}</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurCoreValuesMainCard}>
              <img src={OnTimeEveryTime} alt="OnTimeEveryTime" />
              <h2>{t("on_time_every_time")}</h2>
              <p>{t("on_time_every_time_description")}</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurCoreValuesMainCard}>
              <img src={CustomersFirst} alt="CustomersFirst" />
              <h2>{t("customers_first")}</h2>
              <p>{t("customers_first_description")}</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className={Styles.WebOurCoreValuesMainCard}>
              <img src={InnovatingAhead} alt="InnovatingAhead" />
              <h2>{t("innovating_ahead")}</h2>
              <p>{t("innovating_ahead_description")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/*  */}
      {/* Footer Start here */}
      <WebFooter />
    </>
  );
}

export default WebAboutUs;
