import React, { memo, useEffect, useState } from "react";
import Styles from "../assets/css/PickupHeader.module.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../assets/images/Logo-icon.png";
import Profile from "../assets/images/PickupHead-Profile.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faRightToBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { EnterpriseNotificationModal } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/Constants";
import { logout } from "../redux/authSlice";
import localforage from "localforage";
import {
  deliveryboyRoute,
  enterpriseRoute,
  consumerRoute,
} from "../utils/RoutePath";
import { persistor } from "../redux/store";
import MessageModal from "./MessageModal";
import { useTranslation } from "react-i18next";

const CommonHeader = memo(({ userData }) => {
  const location = useLocation();
  const {t}=useTranslation()
  const currentPath = location.pathname;
  const isDashboard = ["/dashboard", "/schedules"].some((route) =>
    currentPath.includes(route)
  );
  const isNotification = currentPath.includes("notifications");
  const { userDetails, userInfo } = { ...userData };
  const [showModal, setShowModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const handleLogout = async () => {
    dispatch(logout());
    try {
      await localforage.clear();
      await persistor.purge();
      console.log("LocalForage cleared");
    } catch (error) {
      console.error("Failed to clear LocalForage:", error);
    }
    navigate("/");
  };
  const openModal = () => {
    setShowModal(true);
  };

  const openSupportModal = () => {
    setSupportModal(true);
  };

  return (
    <div className={Styles.pickupHeader}>
      <nav className={Styles.nav}>
        <input type="checkbox" id={Styles.navCheck} />
        <div className={Styles.navHeader}>
          <Link
            to={!isAuthenticated && !role ? "/" : `/${baseUrl}/dashboard`}
            className={Styles.homeHeaderLogocard}
          >
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
          {userDetails?.role === "ENTERPRISE" &&
            enterpriseRoute.map((routes, index) => (
              <li key={index}>
                <Link to={routes.path}>{t(routes.title)}</Link>
              </li>
            ))}
          {userDetails?.role === "CONSUMER" &&
            consumerRoute.map((routes, index) => (
              <li key={index}>
                <Link to={routes.path}>{t(routes.title)}</Link>
              </li>
            ))}
          {userDetails?.role === "DELIVERY_BOY" &&
            deliveryboyRoute.map((routes, index) => (
              <li key={index}>
                <Link to={routes.path}>{t(routes.title)}</Link>
              </li>
            ))}

          <div className={Styles.loginNavList}>
            {userDetails?.role !== "DELIVERY_BOY" && (
              <>
                {userDetails?.role == "ENTERPRISE" && isDashboard == false && (
                  <li>
                    <Link
                      to="/enterprise/schedules"
                      className={Styles.pickupHomeSettingsBtn}
                    >
                      <FontAwesomeIcon icon={faPlus} /> {t("new_schedule")}
                    </Link>
                  </li>
                )}
              </>
            )}
            <li>
              <button
                onClick={openSupportModal}
                className={Styles.pickupHomeSettingsBtn}
              >
                {t("message")}
              </button>
            </li>
            {isNotification == false && (
              <li>
                <button
                  onClick={openModal}
                  className={Styles.pickupHomeSettingsBtn}
                >
                  <FontAwesomeIcon icon={faBell} />
                </button>
              </li>
            )}

            <li>
              <Dropdown>
                <Dropdown.Toggle
                  className={Styles.pickupHeaderProfileActionBtn}
                  id="dropdown-basic"
                >
                  <img
                    className={Styles.pickupHeaderProfileImg}
                    src={
                      API.viewImageUrl +
                      userDetails?.profile_pic?.replace(/\.png$/, "")
                    }
                    alt="Profile"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/${baseUrl}/setting`}
                    className={Styles.pickupHeaderAccountTextsActions}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faUser}
                    />{" "}
                    {t("accounts")}
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    className={Styles.pickupHeaderAccountTextsActions}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faGear}
                    />{" "}
                    Settings
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    className={Styles.pickupHeaderAccountTextsActions}
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      className={Styles.pickupHeaderAccountsIcons}
                      icon={faRightToBracket}
                    />{" "}
                    {t("sign_out")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </div>
        </ul>
      </nav>
      <EnterpriseNotificationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />

      <MessageModal
        show={supportModal}
        handleClose={() => setSupportModal(false)}
      />
    </div>
  );
});

export default CommonHeader;
