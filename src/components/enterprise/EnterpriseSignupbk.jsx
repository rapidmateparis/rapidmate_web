import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCheck,
  faLocationDot,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faBuilding,
} from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Flag from "../../assets/images/numberFlag.png";
import Banner from "../../assets/images/EnterpriseSignup-banner.png";
import { Link, useNavigate } from "react-router-dom";
import localforage from "localforage";
import {
  getCityList,
  getCountryList,
  getStateList,
  signUpUser,
} from "../../data_manager/dataManage";
import Select from "react-select";
import { useTranslation } from "react-i18next";
const EnterpriseSignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const checkboxTypes = ["checkbox"];
  const [ermessage, setErmessage] = useState("");
  const [hitButton, setHitButton] = useState(false);
  const [failedError, setFailedError] = useState(false);
  const [masterCountryList, setMasterCountryList] = useState(null);
  
  const [masterStateList, setMasterStateList] = useState(null);
  const [masterCityList, setMasterCityList] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [dropdownStateValue, setDropdownStateValue] = useState(null);
  const [dropdownCityValue, setDropdownCityValue] = useState(null);

  // input value
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deliveries, setDeliveries] = useState("");
  const [code, setCode] = useState("+33");
  const [number, setNumber] = useState("");
  const [siret, setSiret] = useState("");
  const [comments, setComments] = useState("");
  const [termone, setTermone] = useState("");
  const [termtwo, setTermtwo] = useState("");
  const [role, setRole] = useState("");
  const [dropdownIndustryValue, setDropdownIndustryValue] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [industry, setIndustry] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

    getStateList(
      (param = {}),
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterStateList(successResponse[0]._response);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );

    getCityList(
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              setErmessage(successResponse[0]._response.name);
            } else {
              setMasterCityList(successResponse[0]._response);
            }
          }
        }
      },
      (errorResponse) => {
        console.log("errorResponse", errorResponse[0]._errors.message);
        setErmessage(errorResponse[0]._errors.message);
      }
    );
    const roleName = localforage.getItem("roleName");
    setRole(roleName);
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setDropdownCountryValue(selectedCountry);
    setCountry(selectedCountry.value);
    const filteredStates = masterStateList
      .filter((state) => state.country_id === selectedCountry.value)
      .map((state) => ({ label: state.state_name, value: state.id }));
    setStateList(filteredStates);
    setDropdownStateValue(null);
    setCityList([]);
  };
  const handleIndustryChange = (selectedIndustry) => {
    setDropdownIndustryValue(selectedIndustry);
    setIndustry(selectedIndustry.value);
  };

  const handleStateChange = (selectedState) => {
    setDropdownStateValue(selectedState);
    setState(selectedState.value);
    const filteredCities = masterCityList
      .filter((city) => city.state_id === selectedState.value)
      .map((city) => ({ label: city.city_name, value: city.id }));
    setCityList(filteredCities);
    setDropdownCityValue(null);
  };
  const handleCityChange = (selectedCity) => {
    setDropdownCityValue(selectedCity);
    setCity(selectedCity.value);
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{9,15}$/;
    let errors = {};
    if (!name.trim()) {
      errors.name = "First name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword.length < 6) {
      errors.confirmPassword =
        "Confirm password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords does not match";
    }
    if (!number.trim()) {
      errors.number = "Number is required";
    } else if (isNaN(number)) {
      errors.number = "Number should be numeric";
    }
    if (!companyName.trim()) {
      errors.companyName = "Company name is required";
    }
    if (!deliveries.trim()) {
      errors.deliveries = "Deliveries per month is required";
    }
    if (!dropdownCountryValue) {
      errors.dropdownCountryValue = "Please select a country";
    }
    if (!dropdownStateValue) {
      errors.dropdownStateValue = "Please select a state";
    }
    if (!dropdownCityValue) {
      errors.dropdownCityValue = "Please select a city";
    }
    if (!dropdownIndustryValue) {
      errors.dropdownIndustryValue = "Please select a industry";
    }
    if (!comments) {
      errors.comments = "Please describe your projects";
    }
    if (!siret) {
      errors.siret = "Please enter siret";
    }
    if (!termone) {
      errors.termone = "You must agree to the terms";
    }
    if (!termtwo) {
      errors.termtwo = "You must agree to the terms";
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // setHitButton(true)

    let params = {
      info: {
        userName: email,
        email: email,
        phoneNumber: code + number,
        password: password,
        userrole: "ENTERPRISE",
        firstName: name,
        lastName: lastname,
        companyName: companyName,
        deliveryMonthHours: deliveries + " hours",
        description: comments,
        industryId: industry,
        city: city,
        state: state,
        country: country,
        siretNo: siret,
        termone: termone === true ? 1 : 0,
        termtwo: termtwo === true ? 1 : 0,
      },
    };
    console.log(params);
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
    { label: "+91", value: "+01" },
  ];

  const industryList = [
    { label: "Restaurant and takeaway", value: 1 },
    { label: "Grocery and speciality", value: 2 },
    { label: "Gift delivery", value: 3 },
    { label: "Health and beauty", value: 4 },
    { label: "Tech and electronics", value: 5 },
    { label: "Retail and shopping", value: 6 },
    { label: "Professional services", value: 7 },
    { label: "Other", value: 8 },
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
                      Enterprise signup
                    </h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Let’s create your profile so you can request continuous
                      scheduled deliveries
                    </p>
                  </div>
                </div>
                <div>
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext1">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faUser}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="First Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        {errors.name && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.name}</p>}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext2">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faUser}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Last Name"
                              onChange={(e) => setLastname(e.target.value)}
                              isInvalid={!!errors.lastName}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-12">
                        <Form.Group className="mb-3" controlId="formPlaintext3">
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
                        {errors.email && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.email}</p>}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext4">
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
                        {errors.password && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.password}</p>}

                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext5">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLock}
                            />
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            <FontAwesomeIcon
                              icon={showConfirmPassword ? faEye : faEyeSlash}
                              onClick={toggleConfirmPasswordVisibility}
                              className={Styles.signupPasswordEyeIcon}
                            />
                          </div>
                        </Form.Group>
                        {errors.confirmPassword && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.confirmPassword}</p>}
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <div className={Styles.pickupSignupContainer}>
                            <Form.Select
                              className={Styles.selectNumberByCountry}
                              aria-label="Default select example"
                              onChange={(e) => setCode(e.target.value)}
                            >
                              <option value="+33">+33</option>
                              <option value="+91">+91</option>
                            </Form.Select>
                            <Form.Control
                              className={`password-field ${Styles.signupUserName}`}
                              type="text"
                              placeholder="0 00 00 00 00"
                              onChange={(e) => setNumber(e.target.value)}
                              isInvalid={!!errors.number}
                            />
                          </div>
                        </Form.Group>
                        {errors.number && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.number}</p>}

                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext6">
                          <Select
                            value={dropdownCountryValue}
                            onChange={handleCountryChange}
                            options={countryList}
                            placeholder="Select a country"
                            isSearchable
                            className={!!errors.dropdownCountryValue ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.dropdownCountryValue}
                            </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="col-md-12">
                        <Form.Group className="mb-3" controlId="formPlaintext7">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faBuilding}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Company name"
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        {errors.companyName && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.companyName}</p>}

                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext8">
                          <Select
                            value={dropdownIndustryValue}
                            options={industryList}
                            placeholder="Industry"
                            isSearchable={true}
                            onChange={handleIndustryChange}
                            className={!!errors.dropdownIndustryValue ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.dropdownIndustryValue}
                            </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formPlaintext9">
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faTruckFast}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Deliveries per month / Hours per month"
                              onChange={(e) => setDeliveries(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        {errors.deliveries && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.deliveries}</p>}

                      </div>

                      <div className="col-md-6">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintext10"
                        >
                          <Select
                            value={dropdownStateValue}
                            options={stateList}
                            placeholder="Ain"
                            isSearchable={true}
                            onChange={handleStateChange}
                            className={!!errors.dropdownStateValue ? 'is-invalid' : ''}

                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.dropdownStateValue}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                      </div>

                      <div className="col-md-6">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintext11"
                        >
                          <Select
                            value={dropdownCityValue}
                            options={cityList}
                            placeholder="ambérieu-e..."
                            isSearchable={true}
                            onChange={handleCityChange}
                            className={!!errors.dropdownCityValue ? 'is-invalid' : ''}
                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.dropdownCityValue}
                            </Form.Control.Feedback>
                        </Form.Group>

                      </div>

                      <div className="col-md-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintext12"
                        >
                          <div className={Styles.pickupSignupContainer}>
                            <FontAwesomeIcon
                              className={Styles.pickupSignupFieldsIcons}
                              icon={faLocationDot}
                            />
                            <Form.Control
                              className={Styles.signupUserName}
                              type="text"
                              placeholder="Siret"
                              onChange={(e) => setSiret(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                        {errors.siret && <p className="text-danger lh-1" style={{fontSize:"0.820em"}}>{errors.siret}</p>}
                      </div>

                      <div className="col-md-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintext13"
                        >
                          <div className={Styles.pickupSignupContainer}>
                            <Form.Control
                              className={Styles.signupUserName}
                              placeholder="Describe your projects here"
                              as="textarea"
                              rows={2}
                              onChange={(e) => setComments(e.target.value)}
                            />
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-md-12">
                        {checkboxTypes.map((type) => (
                          <div
                            key={`default-${type}`}
                            className={`mb-2 ${Styles.deliveryBoySignupCheckboxCard}`}
                          >
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={null}
                              className={Styles.DeliveryboySignupCustomcheckbox}
                              onChange={(e) => setTermone(e.target.checked)}
                              isInvalid={!!errors.termone}
                            />
                            <p
                              className={Styles.checkText}
                              style={{ fontSize: "11px" }}
                            >
                              We collect this data for the purposes of
                              processing your application to become a courier.
                              By clicking this box, you acknowledge that you
                              have read and understood the
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="col-md-12">
                        {checkboxTypes.map((type) => (
                          <div
                            key={`default1-${type}`}
                            className={`mb-2 ${Styles.deliveryBoySignupCheckboxCard}`}
                          >
                            <Form.Check
                              type={type}
                              id={`default1-${type}`}
                              label={null}
                              className={Styles.DeliveryboySignupCustomcheckbox}
                              onChange={(e) => setTermtwo(e.target.checked)}
                              isInvalid={!!errors.termtwo}
                            />
                            <p
                              className={Styles.checkText}
                              style={{ fontSize: "11px" }}
                            >
                              By clicking on this on this box, you acknowledge
                              that you have read and understood the{" "}
                              <a className={Styles.loginTextSignup} href="#">
                                Privacy Policy
                              </a>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {failedError && (
                      <div className={Styles.checkText}>
                        <p className={Styles.termsCheck}>{ermessage}</p>
                      </div>
                    )}
                    <Link
                      to="#"
                      className={Styles.pickupSignupContinueBtn}
                      style={{ marginBottom: "15px" }}
                      type="button"
                      onClick={submitHandler}
                      disabled={hitButton}
                    >
                      {hitButton ? "Loading ..." : t("continue")}
                    </Link>
                  </Form>

                  <div>
                    <p className={Styles.pickupSignupAcLoginText}>
                      Already have an account?{" "}
                      <Link to="/login" className={Styles.loginTextSignup}>
                        {t("login")}
                      </Link>
                    </p>
                    {/* <p className={Styles.pickupSignupAcLoginText}>
                      By signing up you agree to{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Privacy policy
                      </Link>{" "}
                      &{" "}
                      <Link className={Styles.loginTextSignup} to="#">
                        Terms
                      </Link>{" "}
                      of RapidMate{" "}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={Styles.profileChooseBannerCard}>
                <img
                  className={Styles.enterpriseSignupBannerimg}
                  src={Banner}
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

export default EnterpriseSignup;
