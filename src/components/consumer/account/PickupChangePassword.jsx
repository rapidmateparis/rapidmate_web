import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeUserPassword } from "../../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../../utils/Toastify";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
const PickupChangePassword = () => {
  const user = useSelector((state)=>state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    let params = {
      info: {
        userName: user.userDetails.username,
        oldPassword: data.currentPassword,
        newPassword: data.password,
      },
    };
    setLoading(true);
    changeUserPassword(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response.name == "NotAuthorizedException") {
            showErrorToast(successResponse[0]._response.name);
          } else {
            showSuccessToast("Password changed successfully.");
            setTimeout(() => {
              dispatch(logout());
              localforage.clear();
              navigate("/login");
            }, 2000);
          }
          setLoading(false);
        }
      },
      (errorResponse) => {
        setLoading(false);
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
            <p className={Styles.addressBookHeaderTitleText}>Change password</p>
          </div>

          <div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="currentPassword"
                        className={Styles.pickupChangePasswordLabelText}
                      >
                        Before setting up a new password, please confirm your
                        current password
                      </label>
                      <div className={Styles.pickupChangePasswordCard}>
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordLockIcon}
                          icon={faLock}
                        />
                        <Controller
                          name="currentPassword"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder={`Current password`}
                              style={{
                                width: "100%",
                                padding: "5px",
                              }}
                              className={Styles.pickupChangePasswordInputs}
                            />
                          )}
                        />
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordEyeIcon}
                          icon={showCurrentPassword ? faEye : faEyeSlash}
                          onClick={() => togglePasswordVisibility("current")}
                        />
                      </div>

                      {errors.currentPassword && (
                        <p className={Styles.termsCheck}>
                          {errors.currentPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className={Styles.changepasswordLinkCard}>
                      <Link className={Styles.changePasswordForgotPassword}>
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="currentPassword"
                        className={Styles.pickupChangePasswordLabelText}
                      >
                        Use at least 6 characters, mixing uppercase, lowercase,
                        numbers, and symbols.
                      </label>
                      <div className={`${Styles.pickupChangePasswordCard}`}>
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordLockIcon}
                          icon={faLock}
                        />
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              placeholder={`password`}
                              style={{
                                width: "100%",
                                padding: "5px",
                              }}
                              className={Styles.pickupChangePasswordInputs}
                            />
                          )}
                        />
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordEyeIcon}
                          icon={showNewPassword ? faEye : faEyeSlash}
                          onClick={() => togglePasswordVisibility("new")}
                        />
                      </div>

                      {errors.password && (
                        <p className={Styles.termsCheck}>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <div className={`${Styles.pickupChangePasswordCard}`}>
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordLockIcon}
                          icon={faLock}
                        />
                        <Controller
                          name="confirmPassword"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder={`Confirm new password`}
                              style={{
                                width: "100%",
                                padding: "5px",
                              }}
                              className={Styles.pickupChangePasswordInputs}
                            />
                          )}
                        />
                        <FontAwesomeIcon
                          className={Styles.pickupChangePasswordEyeIcon}
                          icon={showConfirmPassword ? faEye : faEyeSlash}
                          onClick={() => togglePasswordVisibility("confirm")}
                        />
                      </div>

                      {errors.confirmPassword && (
                        <p className={Styles.termsCheck}>
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={Styles.pickupUpdatePasswordCard}>
                  <button
                    type="submit"
                    className={Styles.pickupUpdatePasswordBtn}
                    disabled={loading}
                  >
                    {loading ? "Updating ...":"Update password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default PickupChangePassword;
