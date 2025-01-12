import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
z
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faBuilding,
} from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import SignupBanner from "../../assets/images/Pickup-Signup-Banner.png";
import { Link, useNavigate } from "react-router-dom";
import { getCountryList, signUpUser } from "../../data_manager/dataManage";
import { useTranslation } from "react-i18next";

const PickupSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [dropdownCountryValue, setDropdownCountryValue] = useState("75");
  const [code, setCode] = useState("+33");
  const [number, setNumber] = useState("");
  const [dropdownValue, setDropdownValue] = useState("+33");
  const [errors, setErrors] = useState({});
  const [ermessage, setErmessage] = useState("");
  const [hitButton, setHitButton] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [masterCountryList, setMasterCountryList] = useState(null);
  const [countryList, setCountryList] = useState([]);

  const handleSelection = (type) => {
    setSelectedAccountType(type);
  };
  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{9,15}$/; // General phone pattern (9-15 digits)

    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!selectedAccountType) {
      errors.selectedAccountType = "Please select an account type";
    }

    if (!number.trim()) {
      errors.number = "Number is required";
    } else if (isNaN(number)) {
      errors.number = "Number should be numeric";
    } else if (dropdownCountryValue === "France" && number.length !== 9) {
      errors.number = "French numbers should be exactly 9 digits long";
    } else if (dropdownCountryValue === "India" && number.length !== 10) {
      errors.number = "Indian numbers should be exactly 10 digits long";
    } else if (!phonePattern.test(number)) {
      errors.number = "Number is invalid";
    }

    if (!dropdownCountryValue) {
      errors.dropdownCountryValue = "Please select a country";
    }

    return errors;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    let param = {};
    getCountryList(
      param,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterCountryList(successResponse[0]._response);
              var formattedCountryList = [];
              successResponse[0]._response.forEach((element) => {
                formattedCountryList.push({
                  label: element.country_name,
                  value: element.id,
                });
              });
              setCountryList(formattedCountryList);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );
  }, []);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // dispatch(loginFailed());
      return;
    }
    setHitButton(true);
    let params = {
      info: {
        userName: email,
        email: email,
        phoneNumber: code + number,
        password: password,
        userrole: "CONSUMER",
        firstName: name,
        lastName: "",
        country: dropdownCountryValue.toString(),
      },
    };
    signUpUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          console.log(successResponse[0]);
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
              setFailedError(true);
              setHitButton(false);
            } else {
              setHitButton(false);
              navigate("/signup-verify", {
                state: {
                  user: {
                    email: email,
                    phoneNumber: number,
                    password: password,
                  },
                },
              });
            }
          }
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        setErmessage(err);
        setFailedError(true);
        setHitButton(false);
      }
    );
  };

  const data = [
    { label: "+33", value: "+33" },
    { label: "+91", value: "+91" },
  ];

  return (
    <>
      <section className={Styles.profileChooseSec}>
        <div className="container">
          <div>
            <Link className={Styles.logoCard} to="/">
              <img className={Styles.logo} src={Logo} alt="logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className={Styles.pickupSignupFormMainCard}>
                <div className={Styles.chooseMainCard}>
                  <div className={Styles.chooseProfileCard}>
                    <h2 className={Styles.chooseProfileHeading}>
                      Pickup & Drop-off signup
                    </h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Let’s create your profile so you can have complete
                      experience of the app
                    </p>
                  </div>
                </div>
                <div>
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        {errors.name && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.name}
                          </p>
                        )}
                        <Form.Group className="mb-3" controlId="formPlaintext1">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faUser}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Name"
                              onChange={(e) => setName(e.target.value)}
                              isInvalid={!!errors.name}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        {errors.email && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.email}
                          </p>
                        )}
                        <Form.Group className="mb-3" controlId="formPlaintext2">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faEnvelope}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        {errors.password && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.password}
                          </p>
                        )}
                        <Form.Group className="mb-3" controlId="formPlaintext3">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLock}
                            />
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                              onClick={togglePasswordVisibility}
                              className={Styles.signupPasswordEyeIcon}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        {errors.confirmPassword && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.confirmPassword}
                          </p>
                        )}
                        <Form.Group className="mb-3" controlId="formPlaintext4">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLock}
                            />
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                              onClick={togglePasswordVisibility}
                              className={Styles.signupPasswordEyeIcon}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <div className={Styles.pickupSignupContainer}>
                            <Form.Select
                              className={Styles.selectNumberByCountry}
                              aria-label="Default select example"
                              onChange={(e) => setCode(e.target.value)}
                            >
                              {data?.map((numbercode, index) => (
                                <option key={index} value={numbercode.value}>
                                  {numbercode.label}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type="text"
                              placeholder="0 00 00 00 00"
                              onChange={(e) => setNumber(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        {errors.number && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.number}
                          </p>
                        )}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext6">
                          <Form.Select
                            className={Styles.pickupSingupCountrySelect}
                            aria-label="Default select example"
                            value={dropdownCountryValue}
                            onChange={(e) =>
                              setDropdownCountryValue(e.target.value)
                            }
                          >
                            <option disabled={true}>Country</option>
                            {countryList.map((country, index) => (
                              <option key={index} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        {errors.country && (
                          <p
                            className="text-danger lh-1"
                            style={{ fontSize: "0.820em" }}
                          >
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <p className={Styles.pickupSingupAccountType}>
                        Create account as:
                      </p>
                      <div className="col-md-6">
                        <div
                          className={`${Styles.pickupSignupTypeOfAc} ${
                            selectedAccountType === "Individual"
                              ? Styles.selected
                              : ""
                          }`}
                          onClick={() => handleSelection("Individual")}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faUser}
                          />
                          <p className={Styles.acNamesType}>Individual</p>
                          <div
                            className={`${Styles.pickupSignupAcCircle} ${
                              selectedAccountType === "Individual"
                                ? Styles.selected
                                : ""
                            }`}
                          >
                            {selectedAccountType === "Individual" && (
                              <FontAwesomeIcon
                                className={Styles.selectedCheck}
                                icon={faCheck}
                              />
                            )}
                          </div>
                        </div>
                        <p
                          className={`${Styles.chooseProfileSubheading} ${
                            errors.selectedAccountType
                              ? Styles.forgotPassword
                              : ""
                          } `}
                        >
                          {errors.selectedAccountType !== undefined &&
                          errors.selectedAccountType !== null
                            ? errors.selectedAccountType
                            : ""}
                        </p>
                      </div>

                      <div className="col-md-6">
                        <div
                          className={`${Styles.pickupSignupTypeOfAc} ${
                            selectedAccountType === "Company"
                              ? Styles.selected
                              : ""
                          }`}
                          onClick={() => handleSelection("Company")}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faBuilding}
                          />
                          <p className={Styles.acNamesType}>Company</p>
                          <div
                            className={`${Styles.pickupSignupAcCircle} ${
                              selectedAccountType === "Company"
                                ? Styles.selected
                                : ""
                            }`}
                          >
                            {selectedAccountType === "Company" && (
                              <FontAwesomeIcon
                                className={Styles.selectedCheck}
                                icon={faCheck}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                  <div>
                    {failedError && (
                      <div className={Styles.checkText}>
                        <p className={Styles.termsCheck}>{ermessage}</p>
                      </div>
                    )}

                    <Link
                      to="#"
                      className={`mt-5 ${Styles.pickupSignupContinueBtn}`}
                      type="button"
                      onClick={signUpHandler}
                      disabled={hitButton}
                    >
                      {hitButton ? "Loading ..." : t("continue")}
                    </Link>
                    <p className={Styles.pickupSignupAcLoginText}>
                      {t("already_have_an_account")}{" "}
                      <Link to="/login" className={Styles.loginTextSignup}>
                        {t("login")}
                      </Link>
                    </p>
                    <p className={Styles.pickupSignupAcLoginText}>
                      By signing up you agree to{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Privacy policy
                      </Link>{" "}
                      &{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Terms
                      </Link>{" "}
                      of RapidMate{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.profileChooseBannerCard}>
                <img
                  className={Styles.PickupSignupBanner}
                  src={SignupBanner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PickupSignup;
