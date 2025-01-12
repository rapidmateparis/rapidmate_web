import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Truck from "../../assets/webImages/EcoFleetTruck.json";
import TruckEnglish from "../../assets/webImages/ElectricCarEnglish.json";
import Scooter from "../../assets/webImages/EcoFleetScooter.json";
import Cycle from "../../assets/webImages/EcoFleetCycle.json";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

const WebEcoFriendlyFleet = () => {
  const { t, i18n } = useTranslation();

  const truckAnimation = i18n.language === "fr" ? Truck : TruckEnglish;
  return (
    <>
      <section className={Styles.EcoFriendlyFleetSec}>
        <div>
          <h1 className={Styles.ecoFriendlyFleetText}>
            {t("commitment_sustainability")} <br />{" "}
            <span>{t("our_eco_fleet")}</span>
          </h1>
          <div className={Styles.EcoFriendlyFleetRow}>
            <div className="col-md-4">
              <div className={Styles.EcoRouteOptimizationCard}>
                <div>
                  <Lottie animationData={truckAnimation} loop={true} />
                </div>
                <h2 className={Styles.EcoRouteOptimizationTitle}>
                  {t("route_optimization")}
                </h2>
                <p className={Styles.EcoRouteOptimizationDescription}>
                  {t("route_optimization_description")}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.EcoRouteOptimizationCard}>
                <div className="text-center">
                  <Lottie
                    className={Styles.EcoRouteOptimizationEScooterCard}
                    animationData={Scooter}
                    loop={true}
                  />
                </div>
                <h2 className={Styles.EcoRouteOptimizationTitle}>
                  {t("e_scooter")}
                </h2>
                <p className={Styles.EcoRouteOptimizationDescription}>
                  {t("e_scooter_description")}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className={Styles.EcoRouteOptimizationCard}>
                electric_hybrid
                <div className="text-center">
                  <Lottie
                    className={Styles.EcoRouteOptimizationEScooterCard}
                    animationData={Cycle}
                    loop={true}
                  />
                </div>
                <h2 className={Styles.EcoRouteOptimizationTitle}>
                  {t("electric_vehicles")} <br /> {t("hybrid_vehicles")}
                </h2>
                <p className={Styles.EcoRouteOptimizationDescription}>
                  {t("hybrid_vehicles_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebEcoFriendlyFleet;
