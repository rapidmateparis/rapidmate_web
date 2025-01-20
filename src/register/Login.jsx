import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Loginbanner from "../assets/images/Login-banner.png";
import Logo from "../assets/images/Logo-icon.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordEmailModal from "./ForgotPasswordEmailModal";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailed } from "../redux/authSlice";
import { authenticateUser, getLookupData } from "../data_manager/dataManage";
import localforage from "localforage";
import { commonDataList } from "../redux/commonDataSlice";

import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { UseFetch } from "../utils/UseFetch";

const Login = () => {
  const { isAuthenticated, loading, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [lookup, setLookup] = useState(null);  // Set the initial state of lookup to null.
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState('');
  const [errors, setErrors] = useState({});
  const [iserror, setIserror] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = t("email_required");
    } else if (!emailRegex.test(email)) {
      errors.email = t("email_invalid");
    }
    if (!password) {
      errors.password = t("password_required");
    } else if (password.length < 6) {
      errors.password = t("password_min_length");
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      dispatch(loginFailed());
      return;
    }
    let params = {
      info: {
        userName: email,
        password: password,
        token: fcmToken,
      },
    };
    authenticateUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name === "NotAuthorizedException") {
              showErrorToast(t("username_or_password_incorrect"));
              dispatch(loginFailed());
            } else if (successResponse[0]._response.name === "UserNotConfirmedException") {
              showErrorToast(t("verification_pending"));
              dispatch(loginFailed());
            } else {
              const dataRes = successResponse[0]._response.user?.idToken?.payload;
              let userDetail = successResponse[0]._response.user_profile[0];
              userDetail.vehicleAdd = true;
              const userData = {
                userInfo: {
                  username: dataRes["cognito:username"],
                  email: dataRes.email,
                  name: dataRes.name,
                  email_verify: dataRes.email_verified,
                  auth_time: dataRes.auth_time,
                  exp: dataRes.exp,
                },
                userDetails: userDetail,
              };
              const getToken = successResponse[0]._response?.rapid_token;
              const refreshToken = successResponse[0]._response?.refreshtoken;
              if (getToken && userData) {
                localforage.setItem("1", getToken);
                dispatch(loginSuccess({ role: userDetail.role, user: userData }));
                showSuccessToast(t("login_successful"));
              } else {
                showErrorToast(t("login_failed"));
                dispatch(loginFailed());
              }
            }
          }
        } else {
          showErrorToast(t("invalid_credentials"));
          dispatch(loginFailed());
        }
      },
      (errorResponse) => {
        const errorMsg = errorResponse.errors?.msg?.[0]?.msg || errorResponse[0]?._errors?.message || t("login_failed");
        showErrorToast(errorMsg);
        dispatch(loginFailed());
      }
    );
  };

  const navigateBasedOnRole = (role) => {
    const baseUrl = role?.toLowerCase().replace(/_/g, '');
    setTimeout(() => {
      navigate("/" + baseUrl + "/dashboard");
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const token = await localforage.getItem("1");
          if (token) {
            // Only fetch lookup if authenticated
            const {lookup} = UseFetch();  // Use the UseFetch hook to fetch lookup data
            setLookup(lookup);  // Set the lookup data once fetched
            dispatch(commonDataList(lookup));  // Dispatch common data with the lookup
            navigateBasedOnRole(role);  // Navigate based on the user's role
          }
        } catch (error) {
          console.error(t("login_failed"));
        }
      }
    };
    fetchData();
  }, [isAuthenticated, role]);  // Dependency array includes all relevant values

  return (
    <>
      <section className={Styles.loginSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-5">
            <div className={Styles.loginMain}>
              <div>
                <Link className={Styles.logoCard} to="/">
                  <img className={Styles.logo} src={Logo} alt="banner" />
                  <h2 className={Styles.companyName}>Rapidmate</h2>
                </Link>
              </div>

              <div className={Styles.loginCard}>
                <div className={Styles.welcomeuserCard}>
                  <h1 className={Styles.welcomeLogin}>{t("welcome")}</h1>
                  <p className={Styles.loginInfo}>{t("login_with_email")}</p>
                </div>

                <div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={`${Styles.loginLabels} ${errors.email ? Styles.forgotPassword : ''}`}>
                        {errors.email || t("email")}
                      </Form.Label>
                      <Form.Control
                        className={Styles.loginInputs}
                        type="email"
                        placeholder={t("email") + "..." }
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label className={`${Styles.loginLabels} ${errors.password ? Styles.forgotPassword : ''}`}>
                        {errors.password || t("password")}
                      </Form.Label>
                      <div className={Styles.passwordInputContainer}>
                        <Form.Control
                          className={`password-field ${Styles.loginInputs}`}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password") + "..." }
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!errors.password}
                        />
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          onClick={togglePasswordVisibility}
                          className={Styles.eyeIcon}
                        />
                      </div>
                    </Form.Group>
                  </Form>
                  <div className={Styles.forgotCard}>
                    <Link
                      onClick={handleShowModal}
                      className={Styles.forgotPassword}
                      to="#"
                    >
                      {t("forgot_password")}
                    </Link>
                  </div>
                </div>
                <div>
                  <Link
                    className={Styles.signinBtn}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Logging in..." : t("sign_in")}
                  </Link>
                </div>
              </div>

              <div className={Styles.registerCard}>
                <p className={Styles.noAccount}>
                  {t("dont_have_account")}{" "}
                  <Link to="/profile-choose" className={Styles.registerText}>
                    {t("register")}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div>
              <img
                className={Styles.loginBanner}
                src={Loginbanner}
                alt="banner"
              />
            </div>
          </div>

          <ForgotPasswordEmailModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
