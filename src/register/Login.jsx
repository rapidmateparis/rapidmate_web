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
import { UseFetch } from "../utils/UseFetch";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
const Login = () => {
  const {lookup}=UseFetch()
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState('');
  const [errors, setErrors] = useState({});
  const [iserror, setIserror] = useState(false);
  const checkboxTypes = ["checkbox"];
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
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
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast("Username or password is incorrect");
              dispatch(loginFailed());
            } else if (
              successResponse[0]._response.name == "UserNotConfirmedException"
            ) {
              showErrorToast("Delivery Boy Verfication Pending");
              dispatch(loginFailed());
            } else {
              const dataRes =successResponse[0]._response.user?.idToken?.payload;
              let userDetail=successResponse[0]._response.user_profile[0];
              userDetail.vehicleAdd=true;
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
              const userRole=successResponse[0]._response.user_profile[0].role
              const refreshToken = successResponse[0]._response?.refreshtoken;
              if (getToken && userData) {
                // const userInfo={role:userRole, user: userData }
                localforage.setItem(1, getToken);
                // localforage.setItem(2, refreshToken);
                dispatch(loginSuccess({role:userRole, user: userData }));
                dispatch(commonDataList(lookup))
                showSuccessToast('Login successful! Welcome back!')
                navigateBasedOnRole(successResponse[0]._response.user_profile[0].role);
              } else {
                showErrorToast("Login failed due to missing token or user data.")
                dispatch(loginFailed());
              }
            }
          }
        } else {
          showErrorToast("Invalid credentials")
          dispatch(loginFailed());
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err)
        dispatch(loginFailed());
      }
    );
  };

  const navigateBasedOnRole = (role) => {
    const baseUrl=role?.toLowerCase().replace(/_/g, '');
    setTimeout(()=>{
      navigate("/"+baseUrl+"/dashboard")
    },2000)
    
  };
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
                      {errors.email !== undefined && errors.email !== null ? errors.email : t("email")}

                      </Form.Label>
                      
                      <Form.Control
                        className={Styles.loginInputs}
                        type="email"
                        placeholder={t("email") + "..."}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label className={`${Styles.loginLabels} ${errors.password ? Styles.forgotPassword : ''}`}>
                      {errors.password !== undefined && errors.password !== null ? errors.password : t("password")}
                      </Form.Label>
                      <div className={Styles.passwordInputContainer}>
                        <Form.Control
                          className={`password-field ${Styles.loginInputs}`}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password") + "..."}
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
                  {/* <div>
                    <Form>
                      {checkboxTypes.map((type) => (
                        <div key={`default-${type}`} className={`mb-3 ${Styles.checkboxCard}`}>
                          <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label={null}
                            className={Styles.customCheckbox}
                          />
                          <p className={Styles.checkText}>{t('i_have_read_agree')} <Link className={Styles.termsCheck} to="#">{t('terms_of_use')}</Link></p>
                        </div>
                      ))}
                    </Form>
                  </div> */}
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

          {/* ---------- Modal include here ---------  */}
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

export default Login