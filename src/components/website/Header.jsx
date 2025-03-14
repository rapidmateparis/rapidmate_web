import React, { useState } from "react";
import Styles from "../../assets/webcss/WebHeader.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import WebContactModal from "./WebContactModal";
import HeaderLanguageSwitcher from "../../common/HeaderlanguageOptions";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Header = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [lang, setLang] = useState(i18n.language); // Set initial language from i18n
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const switchLanguage = (newLang) => {
    i18n.changeLanguage(newLang); // Update i18n language
    setLang(newLang); // Update the language in state
  };

  return (
    <>
      {/* contact modal link here */}
      <WebContactModal show={showModal} handleClose={handleClose} />
      {/*  */}
      <div className={Styles.homeHeader}>
        <div className={Styles.headerOffterCard}>
          <p>{t("header_offertext")}</p>
        </div>
        <nav className={Styles.nav}>
          <input type="checkbox" id={Styles.navCheck} />
          <div className={Styles.navHeader}>
            <Link to="/" className={Styles.homeHeaderLogoCard}>
              <img className={Styles.homeHeaderLogo} src={Logo} alt="logo" />
              <h4 className={Styles.homeHeaderCompanyName}>Rapidmate</h4>
            </Link>
          </div>
          <div className={Styles.navBtn}>
            <label htmlFor={Styles.navCheck}>
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <ul className={Styles.navList}>
            <li className={`${Styles.dropdown} ${Styles.dropdownHover}`}>
              <button className={Styles.dropdownToggle}>
                {t("business_solutions")}{" "}
                <FontAwesomeIcon
                  className={Styles.iconDrop}
                  icon={faChevronDown}
                />
              </button>
              <ul className={Styles.dropdownMenu}>
                <li>
                  <Link to="/web-restaurants">{t("restaurants")}</Link>
                </li>
                <li>
                  <Link to="/web-grocery">{t("grocery")}</Link>
                </li>
                <li>
                  <Link to="/web-pharmacy-meds">{t("pharmacy")}</Link>
                </li>
                <li>
                  <Link to="/web-gifts">{t("gifts")}</Link>
                </li>
                <li>
                  <Link to="/web-e-commerce">{t("e_commerce")}</Link>
                </li>
                <li>
                  <Link to="/web-more">{t("more")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/web-individuals">{t("individual")}</Link>
            </li>
            <li>
              <Link to="/web-become-courier">{t("become_courier")}</Link>
            </li>
            <li>
              <Link to="/web-about-us">{t("about_us")}</Link>
            </li>
            <li>
              <Link to="#" onClick={handleShow}>
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <div className={Styles.headerLangueSelecter}>
                <HeaderLanguageSwitcher lang={lang} switcher={switchLanguage} />
              </div>
            </li>
            <li>
              <button
                type="button"
                className={Styles.headGetTouchBtn}
                onClick={handleShow}
              >
                {t("get_in_touch")}
              </button>
            </li>
            {!isAuthenticated && !role ? (
                <>
                  <li>
                    <Link to="/login">{t("login")}</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to={`/${baseUrl}/dashboard`}>{t("dashboard")}</Link>
                </li>
              )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
