import React from "react";
import Styles from "../../../assets/css/home.module.css";
import CommonHeader from "../../../common/CommonHeader";
import UserProfile from "../../../assets/images/PickupUser-Profile.jpeg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { API } from "../../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import localforage from "localforage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
function Setting() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutHandler = () => {
    dispatch(logout());
    localforage.clear();
    navigate("/login");
  };

  const updateProfile = () => {
    navigate(`/${baseUrl}/setting/update-profile`);
  };
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.pickupAccountSec}>
        <div className="container">
          <div className={Styles.max75}>
            <div className="row">
              <div className="col-md-12">
                <div className={Styles.pickupAccountUserHeaderCard}>
                  <img
                    className={Styles.pickupAccountUserProfile}
                    src={
                      API.viewImageUrl +
                      user?.userDetails?.profile_pic?.replace(/\.png$/, "")
                    }
                    alt="Profile"
                  />
                  <div
                    className={Styles.updateProfileCard}
                    onClick={updateProfile}
                  >
                    <FontAwesomeIcon
                      className={Styles.updateProfileImg}
                      icon={faPlus}
                    />
                  </div>
                  <div>
                    <h5 className={Styles.pickupAccountHeaderUserName}>
                      {user?.userDetails?.first_name}{" "}
                      {user?.userDetails.last_name}
                    </h5>
                    <p className={Styles.pickupAccountHeaderUserEmail}>
                      {user?.userDetails?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={Styles.pickupAccountSidebarNav}>
                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("pickup-address-book")
                        ? Styles.active
                        : ""
                    }`}
                  >
                    <Link
                      to="pickup-address-book"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("pickup-address-book")
                          ? Styles.activeLink
                          : ""
                      }`}
                    >
                      {t("address_book")}
                    </Link>
                  </div>

                  {user?.userDetails?.role == "DELIVERY_BOY" && (
                    <div
                      className={`${Styles.pickupAccountSideNavBtns} ${
                        currentPath.includes("delivery-profile-type")
                          ? Styles.active
                          : ""
                      }`}
                    >
                      <Link
                        to="delivery-profile-type"
                        className={`${Styles.pickupAccountNavLinkText} ${
                          currentPath.includes("delivery-profile-type")
                            ? Styles.activeLink
                            : ""
                        }`}
                      >
                        {t("delivery_preference")}
                      </Link>
                    </div>
                  )}
                  {user?.userDetails?.role == "ENTERPRISE" && (
                    <div
                      className={`${Styles.pickupAccountSideNavBtns} ${
                        currentPath.includes("manage-company-location")
                          ? Styles.active
                          : ""
                      }`}
                    >
                      <Link
                        to="manage-company-location"
                        className={`${Styles.pickupAccountNavLinkText} ${
                          currentPath.includes("manage-company-location")
                            ? Styles.activeLink
                            : ""
                        }`}
                      >
                        {t("manage_company_locations")}
                      </Link>
                    </div>
                  )}

                  {user?.userDetails?.role !== "DELIVERY_BOY" && (
                    <div
                      className={`${Styles.pickupAccountSideNavBtns} ${
                        currentPath.includes("billing-address")
                          ? Styles.active
                          : ""
                      }`}
                    >
                      <Link
                        to="billing-address"
                        className={`${Styles.pickupAccountNavLinkText} ${
                          currentPath.includes("billing-address")
                            ? Styles.activeLink
                            : ""
                        }`}
                      >
                        {t("billing_details")}
                      </Link>
                    </div>
                  )}
                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("pickup-payment-methods")
                        ? Styles.active
                        : ""
                    }`}
                  >
                    <Link
                      to="pickup-payment-methods"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("pickup-payment-methods")
                          ? Styles.activeLink
                          : ""
                      }`}
                    >
                      {t("wallets")}
                    </Link>
                  </div>
                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("pickup-change-password")
                        ? Styles.active
                        : ""
                    }`}
                  >
                    <Link
                      to="pickup-change-password"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("pickup-change-password")
                          ? Styles.activeLink
                          : ""
                      }`}
                    >
                      {t("change_password")}
                    </Link>
                  </div>

                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("pickup-notification-settings")
                        ? Styles.active
                        : ""
                    }`}
                  >
                    <Link
                      to="pickup-notification-settings"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("pickup-notification-settings")
                          ? Styles.activeLink
                          : ""
                      }`}
                    >
                      {t("notifications")}
                    </Link>
                  </div>

                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("language") ? Styles.active : ""
                    }`}
                  >
                    <Link
                      to="language"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("language")
                          ? Styles.activeLink
                          : ""
                      }`}
                    >
                      {t("language")}
                    </Link>
                  </div>
                  <div
                    className={`${Styles.pickupAccountSideNavBtns} ${
                      currentPath.includes("logout") ? Styles.active : ""
                    }`}
                    onClick={LogoutHandler}
                  >
                    <Link
                      to="#"
                      className={`${Styles.pickupAccountNavLinkText} ${
                        currentPath.includes("logout") ? Styles.activeLink : ""
                      }`}
                      onClick={LogoutHandler}
                    >
                      {t("logout")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
const ConsumerSetting = Setting;

export default ConsumerSetting;
