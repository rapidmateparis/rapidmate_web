import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";
import { updateUserProfile } from "../../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../../redux/authSlice";

const PickupNotificationSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isPushNotificationChecked, setIsPushNotificationChecked] =useState(user?.userDetails?.enable_push_notification == 1 ? true : false);
  const [isPromotionalEmailChecked, setIsPromotionalEmailChecked] =useState(user?.userDetails?.enable_email_notification == 1 ? true : false);

  const handlePushNotificationChange = () => {
    setIsPushNotificationChecked(!isPushNotificationChecked);
    // Additional logic for push notifications toggle
    updateProfile(!isPushNotificationChecked, isPromotionalEmailChecked);
  };

  const handlePromotionalEmailChange = () => {
    setIsPromotionalEmailChecked(!isPromotionalEmailChecked);
    // Additional logic for promotional emails toggle
    updateProfile(isPushNotificationChecked, !isPromotionalEmailChecked);
  };

  const updateProfile = (pushNotifications, promoEmails) => {
    const profileParams = {
      ext_id: user.userDetails.ext_id,
      enable_push_notification: pushNotifications ? 1 : 0,
      enable_email_notification: promoEmails ? 1 : 0,
    };

    updateUserProfile(
      user.userDetails.role,
      profileParams,
      (successResponse) => {
        const userDetailsData = {
          ...user.userDetails,
          enable_push_notification: pushNotifications ? 1 : 0,
          enable_email_notification: promoEmails ? 1 : 0,
        };
        dispatch(updateUserDetails({userDetails:userDetailsData}))
        showSuccessToast(successResponse[0]._response);
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
      }
    );
  };

  return (
    <section className={Styles.addressBookMainSec}>
      <div className="row">
        <div className="col-md-12">
          <div className={Styles.addressBookAddressCard}>
            <p className={Styles.addressBookHeaderTitleText}>Notifications</p>
          </div>

          <div>
            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>
                Receive push notifications
              </p>
              <Form>
                <Form.Check
                  type="switch"
                  id="push-notification-switch"
                  checked={isPushNotificationChecked}
                  onChange={handlePushNotificationChange}
                  className={
                    isPushNotificationChecked
                      ? Styles.pushNotificationsSwitch
                      : ""
                  }
                />
              </Form>
            </div>

            <div className={Styles.pickupPushNotificationEnableCard}>
              <p className={Styles.pickupPushNotificationSettings}>
                Receive promotional emails
              </p>
              <Form>
                <Form.Check
                  type="switch"
                  id="promotional-email-switch"
                  checked={isPromotionalEmailChecked}
                  onChange={handlePromotionalEmailChange}
                  className={
                    isPromotionalEmailChecked
                      ? Styles.promotionalEmailSwitch
                      : ""
                  }
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default PickupNotificationSettings;
