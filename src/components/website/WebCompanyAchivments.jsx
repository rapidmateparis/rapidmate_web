import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import { useTranslation } from "react-i18next";

const WebCompanyAchivments = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className={Styles.WebCompaniesSec}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>40K+</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  {t("deliveries_per_month")}
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>99.9%</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  {t("successful_deliveries")}
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>24/7</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  {t("availability")}
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.homeCompanyPartnerCountsMainCard}>
                <h4 className={Styles.homeCompanyPartnerCounts}>25 Min</h4>
                <p className={Styles.homeCompanyPartnerCountsText}>
                  {t("average_delivery_time")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebCompanyAchivments;
