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

const BillingAddressBook = memo(
  ({ user, control, errors, setValue, billingDetails }) => {
    const [masterStateList, setMasterStateList] = useState([]);
    const [masterCityList, setMasterCityList] = useState([]);

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

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

    useEffect(() => {
      if (billingDetails) {
        setValue("firstname", billingDetails.first_name || "");
        setValue("lastname", billingDetails.last_name || "");
        setValue("address", billingDetails.address || "");
        setValue("dninumber", billingDetails.dni_number || "");
        setValue("postalcode", billingDetails.postal_code || "");
        // setValue("phoneNumber", billingDetails.phone || "");
        setSelectedCountry(
          countryList.find(
            (country) => country.value === billingDetails.country_id
          ) || null
        );
        setSelectedState(
          masterStateList.find((state) => state.value === billingDetails.state_id) ||
            null
        );
        setSelectedCity(
          masterCityList.find((city) => city.value === billingDetails.city_id) || null
        );
      }
    }, [billingDetails]);
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
                  Account:
                </label>
                <Controller
                  name="account"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={account}
                      placeholder="Select your account"
                      styles={customSelectStyles}
                      isSearchable
                      value={account.find(
                        (option) =>
                          option.value === billingDetails?.account_type
                      )}
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
                  Company:
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
                First name:
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
                Last name:
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
                Address :
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
                Country :
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
                      field.onChange(option);
                      handleCountryChange(option);
                    }}
                    value={countryList.find(
                      (option) =>
                        option.value === billingDetails?.country_id
                    )}
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
                State :
              </label>
              <Controller
                name="state"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={stateList}
                    placeholder="Select your state"
                    styles={customSelectStyles}
                    isSearchable={true}
                    onChange={(option) => {
                      field.onChange(option);
                      handleStateChange(option);
                    }}
                    isDisabled={billingDetails?.state_id ?  false : !selectedCountry}
                    value={stateList.find(
                      (option) =>
                        option.value === billingDetails?.state_id
                    )}
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
                City :
              </label>
              <Controller
                name="city"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityList}
                    placeholder="Select your city"
                    styles={customSelectStyles}
                    isSearchable={true}
                    value={cityList.find(
                      (option) =>
                        option.value === billingDetails?.city_id
                    )}
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
                Postal code:
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
                DNI Number:
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
