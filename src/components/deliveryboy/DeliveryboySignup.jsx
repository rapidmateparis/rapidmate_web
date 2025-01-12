import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faBuilding,
} from "@fortawesome/free-regular-svg-icons";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Banner from "../../assets/images/Deliveryboy-Signup-Banner.png";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  getCityList,
  getCountryList,
  getStateList,
  signUpUser,
} from "../../data_manager/dataManage";
import { useTranslation } from "react-i18next";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/Toastify";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("First is required")
    .min(2, "First name must be at least 2 characters long"),
  lastname: yup.string(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should contain only digits")
    .test("length", "Phone number length is invalid", function (value) {
      const { country } = this.parent; // Assuming country is selected in the form
      const phoneLengthByCountry = {
        101: { min: 12, max: 12 }, // Example for France: minimum and maximum length is 10
        75: { min: 11, max: 11 }, // Example for the US: 10 digits
        // Add other countries and their phone number lengths here
      };
      const countryCode = country ? country.value : null;
      if (countryCode && phoneLengthByCountry[countryCode]) {
        const { min, max } = phoneLengthByCountry[countryCode];
        return value.length >= min && value.length <= max;
      }
      return true; // If no country is selected, do not apply length validation
    }),
  country: yup
    .object({
      value: yup.string().required("Country is required"),
    })
    .required("Country is required"),
  city: yup
    .object({
      value: yup.string().required("ambérieu-e is required"),
    })
    .required("ambérieu-e is required"),
  state: yup
    .object({
      value: yup.string().required("Ain is required"),
    })
    .required("Ain is required"),
  siret: yup.string().required("Siret number is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
const DeliveryboySignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hitButton, setHitButton] = useState(false);
  const [masterCountryList, setMasterCountryList] = useState([]);
  const [masterStateList, setMasterStateList] = useState([]);
  const [masterCityList, setMasterCityList] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countryCode, setCountryCode] = useState("fr");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    setHitButton(true);
    let params = {
      info: {
        userName: data.email,
        email: data.email,
        phoneNumber: "+" + data.phoneNumber,
        password: data.password,
        userrole: "DELIVERY_BOY",
        firstName: data.name,
        lastName: data.lastname,
        city: data.city.value,
        state: data.state.value,
        country: data.country.value,
        siretNo: data.siret,
        termone: data.terms === true ? 1 : 0,
      },
    };

    signUpUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast(successResponse[0]._response.name);
              setHitButton(false);
            } else {
              setHitButton(false);
              navigate("/signup-verify", {
                state: {
                  user: {
                    email: data.email,
                    phoneNumber: data.number,
                    password: data.password,
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
        showErrorToast(err);
        setHitButton(false);
      }
    );
  };
  useEffect(() => {
    // Fetch Country List
    getCountryList({}, (successResponse) => {
      if (successResponse[0]._success) {
        const countries = successResponse[0]._response.map((country) => ({
          label: country.country_name,
          value: country.id,
        }));
        setCountryList(countries);
        setMasterCountryList(successResponse[0]._response);
      }
    });

    // Fetch State List
    getStateList({}, (successResponse) => {
      if (successResponse[0]._success) {
        setMasterStateList(successResponse[0]._response);
      }
    });

    // Fetch City List
    getCityList({}, (successResponse) => {
      if (successResponse[0]._success) {
        setMasterCityList(successResponse[0]._response);
      }
    });
  }, []);
  // Handle country change
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null); // Reset state selection
    setSelectedCity(null); // Reset city selection
    const countrycode = masterCountryList.filter(
      (country) => country.id === selectedOption.value
    );
    const countryCode = countrycode[0]?.country_code?.toLowerCase();
    setCountryCode(countryCode);
    // Filter states based on selected country
    const filteredStates = masterStateList.filter(
      (state) => state.country_id === selectedOption.value
    );
    const formattedStateList = filteredStates.map((state) => ({
      label: state.state_name,
      value: state.id,
    }));
    setStateList(formattedStateList);
    setCityList([]); // Clear city list
  };

  // Handle state change
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null); // Reset city selection

    // Filter cities based on selected state
    const filteredCities = masterCityList.filter(
      (city) => city.state_id === selectedOption.value
    );
    const formattedCityList = filteredCities.map((city) => ({
      label: city.city_name,
      value: city.id,
    }));
    setCityList(formattedCityList);
  };

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
                      Delivery Boy signup
                    </h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Let’s create your profile so you can have complete
                      experience of the app.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faUser}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="First name"
                                style={{ width: "100%", padding: "5px" }}
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                        </div>
                        {errors.name && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faUser}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Last name"
                                style={{ width: "100%", padding: "5px" }}
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                        </div>
                        {errors.lastname && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.lastname.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faEnvelope}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Email"
                                style={{ width: "100%", padding: "5px" }}
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                        </div>
                        {errors.email && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faLock}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password..."
                                style={{ width: "100%", padding: "5px" }}
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className={Styles.signupPasswordEyeIcon}
                            style={{
                              position: "absolute",
                              color: "#787272",
                            }}
                          />
                        </div>
                        {errors.password && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupSignupFieldsIcons}
                            icon={faLock}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                style={{ width: "100%", padding: "5px" }}
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className={Styles.signupPasswordEyeIcon}
                            style={{
                              position: "absolute",
                              color: "#787272",
                            }}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="phoneNumber"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              country={countryCode}
                              onlyCountries={["fr", "in"]}
                              value={value}
                              countryCodeEditable={false}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              onChange={onChange}
                              inputStyle={{
                                width: "100%",
                                paddingLeft: "42px",
                                borderColor: isFocused ? "#ff4081" : "#ccc",
                                boxShadow: isFocused
                                  ? "0 0 5px rgba(255, 64, 129, 0.5)"
                                  : "none",
                                transition:
                                  "border-color 0.3s ease, box-shadow 0.3s ease",
                              }}
                              buttonStyle={{
                                border: "none",
                                background: "transparent",
                              }}
                              dropdownStyle={{ borderColor: "#ccc" }}
                              enableSearch
                              searchPlaceholder="Search country"
                              specialLabel=""
                            />
                          )}
                        />
                        {errors.phoneNumber && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="country"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={countryList}
                              onChange={(option) => {
                                field.onChange(option);
                                handleCountryChange(option);
                              }}
                              placeholder="Select your country"
                              styles={customSelectStyles}
                            />
                          )}
                        />
                        {errors.country && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="state"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={stateList}
                              placeholder="Select your Ain"
                              onChange={(option) => {
                                field.onChange(option);
                                handleStateChange(option);
                              }}
                              isDisabled={!selectedCountry}
                              styles={customSelectStyles}
                              isSearchable={true}
                            />
                          )}
                        />
                        {errors.state && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <Controller
                          name="city"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={cityList}
                              placeholder="Select your ambérieu-e..."
                              styles={customSelectStyles}
                              isDisabled={!selectedState}
                              isSearchable={true}
                            />
                          )}
                        />
                        {errors.city && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div
                          className="d-flex align-items-center"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <FontAwesomeIcon
                            className={`${Styles.pickupSignupFieldsIcons}`}
                            icon={faBuilding}
                            style={{
                              position: "absolute",
                              left: "8px", // Adjust icon padding
                              color: "#787272",
                            }}
                          />
                          <Controller
                            name="siret"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Siret no..."
                                className={`${Styles.signupInput} dynamic-border-input`}
                              />
                            )}
                          />
                        </div>

                        {errors.siret && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.siret.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className={Styles.pickupSignupContainer}>
                          <Controller
                            name="terms"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <label
                                style={{
                                  marginBottom: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: " center",
                                  fontSize: "11px",
                                }}
                                htmlFor="terms"
                              >
                                <input
                                  type="checkbox"
                                  {...field}
                                  style={{ marginRight: "10px" }}
                                  className={
                                    Styles.deliveryBoySignupCheckboxCard
                                  }
                                />
                                <div>
                                  We collect this data for the purposes of
                                  processing your application to become a
                                  courier. By clicking this box, you acknowledge
                                  that you have read and understood the{" "}
                                  <Link
                                    className={Styles.deliverySignupPolicyCheck}
                                    to="#"
                                  >
                                    Privacy Policy
                                  </Link>
                                </div>
                              </label>
                            )}
                          />
                        </div>
                        {errors.terms && (
                          <p
                            className={Styles.termsCheck}
                            style={{ fontSize: "13px" }}
                          >
                            {errors.terms.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className={Styles.pickupSignupContinueBtn}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={hitButton}
                    >
                      {hitButton ? "Loading ..." : "Continue"}
                    </Link>
                    <p className={Styles.pickupSignupAcLoginText}>
                      Already have an account?{" "}
                      <Link to="/login" className={Styles.loginTextSignup}>
                        Login
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
                  className={Styles.deliveryboySignupbanner}
                  src={Banner}
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#fff",
    width: "100%",
    fontSize: "13px",
    borderColor: state.isFocused ? "#ff0058" : "#ccc",
    boxShadow: state.isFocused ? "0 0 5px rgba(255, 64, 129, 0.5)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#ff0058" : "#999",
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#ffc72b" : isFocused ? "#f8f9fa" : "#fff",
    color: "#333",
    fontSize: "14px",
  }),
};
export default DeliveryboySignup;
