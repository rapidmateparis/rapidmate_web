import React, { useEffect, useState } from "react";
import LogoFooter from "../../assets/webImages/FooterLogo.png";
import Twitter from "../../assets/webImages/Twitter-icon.png";
import Tiktok from "../../assets/webImages/Tiktok-icon.png";
import Insta from "../../assets/webImages/Insta-icon.png";
import Linkdin from "../../assets/webImages/Linkdin-icon.png";
import Styles from "../../assets/webcss/WebHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import WebContactModal from "./WebContactModal";
import { useTranslation } from "react-i18next";

const WebFooter = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const privacyPolicyLink =
    i18n.language === "fr" ? "/french-privacy-policy" : "/web-privacy-policy";
  const termOfServicesLink =
    i18n.language === "fr" ? "/french-terms-service" : "/web-terms-service";
  const cookiesLink =
    i18n.language === "fr" ? "/french-cookies" : "/web-cookies";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* contact modal link here  */}
      <WebContactModal show={showModal} handleClose={handleClose} />
      {/*  */}
      <section className={Styles.HomeFooterSec}>
        <div className="container">
          <div className="row">
            <div className={Styles.HomeFooterlogotitleCard}>
              <h4 className={Styles.HomeFooterCompanyName}>
                {t("footer_seamless_text")} <br /> {t("footer_logistics_text")}{" "}
                <span>{t("footer_tapaway_text")}</span>
              </h4>
              <div>
                <button
                  onClick={handleShow}
                  className={Styles.HomeFooterContactBtn}
                >
                  {t("get_in_touch")}
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <img className="w-50" src={LogoFooter} alt="img" />
                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faPhone}
                  />
                  <a
                    className={Styles.HomeFooterReachText}
                    href="tel:+33752371022"
                  >
                    +33752371022
                  </a>
                </div>

                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faEnvelope}
                  />
                  <a
                    className={Styles.HomeFooterReachText}
                    href="mailto:contact@rapidmate.fr"
                  >
                    contact@rapidmate.fr
                  </a>
                </div>

                <div className={Styles.HomeFooterReachCard}>
                  <FontAwesomeIcon
                    className={Styles.HomeFooterReachCallIcon}
                    icon={faLocationDot}
                  />
                  <p className={Styles.HomeFooterReachText}>
                    8B Avenue Danielle Casanova, <br /> 95210 Saint-Gratien,
                    France
                  </p>
                </div>

                <div className={Styles.HomeFooterSocialMediaCard}>
                  <img src={Twitter} alt="Twitter" />
                  <img src={Tiktok} alt="Tiktok" />
                  <img src={Insta} alt="Insta" />
                  <img src={Linkdin} alt="Linkdin" />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>
                  {t("business_solutions")}
                </h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-restaurants"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("restaurants")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-grocery"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("grocery")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-pharmacy-meds"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("pharmacy")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-gifts"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("gifts")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-e-commerce"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("e_commerce")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-more"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("more")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>
                  {t("individual")}
                </h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-individuals"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("book_delivery")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-individuals"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("customized_schedule_delivery")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-individuals"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("vehicle_assistance")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-individuals"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("packers_and_movers")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h4 className={Styles.HomeFooterReachTexttitle}>
                  {t("company")}
                </h4>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-become-courier"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("become_courier")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link className={Styles.HomeFooterCompanyLinks}>
                    {t("our_services")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    to="/web-about-us"
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("about_us")}
                  </Link>
                </div>
                <div className={Styles.HomeFooterCompanyLinksCards}>
                  <Link
                    onClick={handleShow}
                    className={Styles.HomeFooterCompanyLinks}
                  >
                    {t("contact_us")}
                  </Link>
                </div>
              </div>
            </div>

            <div className={Styles.HomeFooterBottomNavCard}>
              <div>
                <Link className={Styles.HomeFooterBottomLinks}>
                  © 2024 rapidmate Inc.
                </Link>
              </div>
              <div className={Styles.HomeFooterPolicyCard}>
                <Link
                  to={termOfServicesLink}
                  className={Styles.HomeFooterBottomLinks}
                >
                  {t("terms_of_service")}
                </Link>
                <Link
                  to={privacyPolicyLink}
                  className={Styles.HomeFooterBottomLinks}
                >
                  {t("privacy_policy")}
                </Link>
                <Link to={cookiesLink} className={Styles.HomeFooterBottomLinks}>
                  {t("cookies")}
                </Link>
              </div>
              {showTopButton && (
                <button
                  onClick={scrollToTop}
                  className={Styles.GoToTopButton}
                  aria-label="Scroll to top"
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebFooter;
