import { memo, useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import TextInput from "./TextInput";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useSelector } from "react-redux";
import {
  getCityList,
  getCountryList,
  getStateList,
} from "../data_manager/dataManage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const BillingAddressBook = memo(
  ({ user, control, errors, setValue, billingDetails }) => {
    const {t}=useTranslation()
    const [masterStateList, setMasterStateList] = useState([]);
    const [masterCityList, setMasterCityList] = useState([]);

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedAccountType, setSelectedAccountType] = useState(null);

    const account = [
      { label: "Individual", value: 1 },
      { label: "Company", value: 2 },
    ];
    useEffect(() => {
      getCountryList({}, (successResponse) => {
        if (successResponse[0]._success) {
          const countries = successResponse[0]._response.map((country) => ({
            label: country.country_name,
            value: country.id,
          }));
          setCountryList(countries);
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
    useEffect(() => {
     
      if (billingDetails) {
        setValue("firstname", billingDetails.first_name || "");
        setValue("lastname", billingDetails.last_name || "");
        setValue("address", billingDetails.address || "");
        setValue("dninumber", billingDetails.dni_number || "");
        setValue("postalcode", billingDetails.postal_code || "");
        setValue("account",{value:billingDetails.account_type})
        setValue("country",{value:billingDetails.country_id})
        setValue("state",{value:billingDetails.state_id})
        setValue("city",{value:billingDetails.city_id})

        // setValue("phoneNumber", billingDetails.phone || "");
        setSelectedCountry(
          countryList.find(
            (country) => country.value === billingDetails.country_id
          ) || null
        );
        const filteredStates = masterStateList.filter(
          (state) => state.country_id === billingDetails.country_id
        );
        const formattedStateList = filteredStates.map((state) => ({
          label: state.state_name,
          value: state.id,
        }));
        setStateList(formattedStateList)
        setSelectedState(
          formattedStateList.find((state) => state.value === billingDetails.state_id) ||
            null
        );

        const accounttype=account.filter(
          (state) => state.value === billingDetails.account_type
        );
        setSelectedAccountType(accounttype)
        const filteredCities = masterCityList.filter(
          (city) => city.state_id === billingDetails.state_id
        );
        const formattedCityList = filteredCities.map((city) => ({
          label: city.city_name,
          value: city.id,
        }));
        setCityList(formattedCityList)
        
        const citylist=formattedCityList.find((city) => city.value === billingDetails.city_id)
        setSelectedCity(citylist);
      }
    }, [billingDetails,masterCityList]);

    // Handle country change
    const handleCountryChange = (selectedOption) => {
      setSelectedCountry(selectedOption);
      setSelectedState(null); // Reset state selection
      setSelectedCity(null); // Reset city selection

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
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-12">
            {user.userDetails.role === "CONSUMER" ||
            user.userDetails.role === "DELIVERY_BOY" ? (
              <div className={Styles.addPickupDetailsInputs}>
                <label
                  htmlFor="account"
                  className={Styles.addPickupDetailFormLabels}
                >
                  {t("account")}:
                </label>
                <Controller
                  name="account"
                  control={control}
                  defaultValue={selectedAccountType}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={account}
                      placeholder="Select your account"
                      styles={customSelectStyles}
                      isSearchable
                      onChange={(option) => {
                        field.onChange(option);
                        setSelectedAccountType(option)
                      }}
                      value={selectedAccountType}
                    />
                  )}
                />
                {errors.account && (
                  <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                    {errors.account.message}
                  </p>
                )}
              </div>
            ) : (
              <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                <label
                  htmlFor="company"
                  className={Styles.addPickupDetailFormLabels}
                >
                  {t("company")}:
                </label>
                <TextInput
                  control={control}
                  name="company"
                  placeholder="Company name"
                  error={errors.company}
                  defaultValue=""
                />
              </div>
            )}
          </div>
          
          <div className="col-md-6">
            <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
              <label
                htmlFor="firstname"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("first_name")}:
              </label>
              <TextInput
                control={control}
                name="firstname"
                placeholder="First name"
                error={errors.firstname}
                defaultValue={""}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
              <label
                htmlFor="lastname"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("last_name")}:
              </label>
              <TextInput
                control={control}
                name="lastname"
                placeholder="Last name"
                error={errors.lastname}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
              <label
                htmlFor="address"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("address")} :
              </label>
              <TextInput
                control={control}
                name="address"
                placeholder="Address..."
                error={errors.address}
                defaultValue={""}
              />
            </div>
          </div>
          {/* <div className="col-md-6">
          <div className={Styles.addPickupDetailsInputs}>
            <label
              htmlFor="phoneNumber"
              className={Styles.addPickupDetailFormLabels}
            >
              Phone Number:
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={"fr"}
                  value={value}
                  // onlyCountries={["fr", "in"]}
                  countryCodeEditable={false}
                  onChange={onChange}
                  inputStyle={{
                    width: "100%",
                    paddingLeft: "42px",
                  }}
                  dropdownStyle={{ borderColor: "#ccc" }}
                  enableSearch
                  searchPlaceholder="Search country"
                  specialLabel=""
                />
              )}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red", fontSize: "13px" }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div> */}
          <div className="col-md-6">
            <div className={Styles.addPickupDetailsInputs}>
              <label
                htmlFor="email"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("country")} :
              </label>
              <Controller
                name="country"
                control={control}
                defaultValue={selectedCountry}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryList}
                    placeholder="Select your country"
                    styles={customSelectStyles}
                    isSearchable={true}
                    onChange={(option) => {
                      field.onChange(option); // Update form value
                      setSelectedCountry(option); // Update local state
                      handleCountryChange(option);
                    }}
                    value={selectedCountry}
                  />
                )}
              />
              {errors.country && (
                <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.addPickupDetailsInputs}>
              <label
                htmlFor="state"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("state")} :
              </label>
              <Controller
                name="state"
                control={control}
                defaultValue={selectedState}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={stateList}
                    placeholder="Select your state"
                    styles={customSelectStyles}
                    isSearchable={true}
                    isDisabled={billingDetails?.state_id ?  false : !selectedCountry}
                    onChange={(option) => {
                      field.onChange(option); // Update form value
                      handleStateChange(option);
                    }}
                    value={selectedState}
                  />
                )}
              />
              {errors.state && (
                <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={Styles.addPickupDetailsInputs}>
              <label
                htmlFor="city"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("city")} :
              </label>
              <Controller
                name="city"
                control={control}
                defaultValue={selectedCity}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityList}
                    placeholder="Select your city"
                    styles={customSelectStyles}
                    isSearchable={true}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedCity(option)
                    }}
                    value={selectedCity}
                  />
                )}
              />
              {errors.city && (
                <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
              <label
                htmlFor="postalcode"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("postal_code")}:
              </label>
              <TextInput
                control={control}
                name="postalcode"
                placeholder="Postal code..."
                error={errors.postalcode}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
              <label
                htmlFor="dninumber"
                className={Styles.addPickupDetailFormLabels}
              >
                {t("dni_number")}:
              </label>
              <TextInput
                control={control}
                name="dninumber"
                placeholder="DNI Number..."
                error={errors.dninumber}
                defaultValue={""}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
);

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    width: "100%",
    fontSize: "13px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#ffc72b" : isFocused ? "#f8f9fa" : "#fff",
    color: "#333",
    fontSize: "14px",
  }),
};
export default BillingAddressBook;
