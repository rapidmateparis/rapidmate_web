import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import MoreBanner from "../../assets/webImages/WebMoreBanner.png";
import Appliances from "../../assets/webImages/ElectronicsAppliances.png";
import MoreFurniture from "../../assets/webImages/MoreFurniture.png";
import ConsumerGoods from "../../assets/webImages/WebConsumerGoods.png";
import Shipments from "../../assets/webImages/WebBulkShipments.png";
import Materials from "../../assets/webImages/ConstructionMaterials.png";
import FrozenFood from "../../assets/webImages/FrozenFood.png";
import { useTranslation } from "react-i18next";
import WebPlayStoreCard from "./WebPlayStoreCard";

function WebMore() {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      {/* Banner Card Start Here  */}
      <section className={Styles.WebMoreBannerSec}>
        <div className={Styles.WebMoreBannerRowCard}>
          <div className="col-md-6">
            <div className={Styles.WebMoreBannerTextCard}>
              <h2>
                {t("other_verticals")} <span>{t("we_serve")}</span>
              </h2>
              <p>{t("other_verticals_description")}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <img className="w-100" src={MoreBanner} alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className={Styles.WebMoreAreaMainSec}>
        <h2 className={Styles.WebMoreAreaTitleText}>
          {t("our_specialization_include")}
        </h2>
        <div className={`${Styles.manageRow} row`}>
          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={Appliances} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("electronics_appliances")}</h2>
                <p>{t("electronics_appliances_description")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={ConsumerGoods} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("fmcg_consumer_goods")}</h2>
                <p>{t("fmcg_consumer_goods_description")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={Shipments} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("bulk_shipments_business_parcels")}</h2>
                <p>{t("bulk_shipments_business_parcels_description")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={MoreFurniture} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("furniture")}</h2>
                <p>{t("furniture_description")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={Materials} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("construction_materials")}</h2>
                <p>{t("construction_materials_description")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={Styles.WebMoreAreaCategoryRow}>
              <div className={Styles.WebMoreAreaCategoryImageCard}>
                <img src={FrozenFood} alt="Appliances" />
              </div>
              <div className={Styles.WebMoreAreaCategoryTextCard}>
                <h2>{t("frozen_processed_foods")}</h2>
                <p>{t("frozen_processed_foods_description")}</p>
              </div>
            </div>
          </div>
        </div>
        <p className={Styles.WebMoreAreaMainBottomText}>
          {t("more_page_bootom_description")}
        </p>
      </section>
      {/* Play Store Card Start Here */}
      <WebPlayStoreCard />
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
}

export default WebMore;
