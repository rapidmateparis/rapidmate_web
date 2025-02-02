import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faPaperclip,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../assets/images/Pickup-Detail-SideImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { formatPhoneNumber } from "../../utils/Constants";

const AddPickupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { order } = location.state || {};
  const [selectedOption, setSelectedOption] = useState("Myself");
  const [selectCheckOption, setSelectedCheckOption] = useState("custom");
  const [isFocused, setIsFocused] = useState(false);
  const handleRadioChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedOption(seletedValue);
  };
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    lastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    company: yup.string(),
    packageId: yup
      .string()
      .required("Package id is required")
      .min(3, "Package id must be at least 3 characters long"),
    pickupnote: yup.string(),
    email: yup
      .string()
      .email("Please enter a valid email"),
    phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number should contain only digits")
    .test("length", "Phone number length is invalid", function (value) {
      const { pcountry } = this.parent; // Assuming country is selected in the form
      const phoneLengthByCountry = {
        in: { min: 12, max: 12 }, // Example for France: minimum and maximum length is 10
        fr: { min: 11, max: 11 },
        ru: { min: 11, max: 11 }, // Example for the US: 10 digits
        us: { min: 11, max: 11 }, // Example for the US: 10 digits
        nz: { min: 12, max: 12 }, // Example for the US: 10 digits
        // Add other countries and their phone number lengths here
      };
      const countryCode = pcountry ? pcountry : null;
      if (countryCode && phoneLengthByCountry[countryCode]) {
        const { min, max } = phoneLengthByCountry[countryCode];
        return value.length >= min && value.length <= max;
      }
      return true; // If no country is selected, do not apply length validation
    }),
    file: yup
      .mixed()
      .required("A file is required")
      .test("fileSize", "File size is too large. Max size 5MB", (value) => {
        return value && value[0] && value[0].size <= FILE_SIZE;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }),
    dropoffnote: yup.string(),
    dcompany: yup.string(),
    dname: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    dlastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    demail: yup
      .string()
      .email("Please enter a valid email"),
    dphoneNumber: yup
       .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .test("length", "Phone number length is invalid", function (value) {
        const { dcountry } = this.parent;
        const phoneLengthByCountry = {
          in: { min: 12, max: 12 }, // Example for France: minimum and maximum length is 10
          fr: { min: 11, max: 11 },
          ru: { min: 11, max: 11 }, // Example for the US: 10 digits
          us: { min: 10, max: 10 }, // Example for the US: 10 digits
          nz: { min: 12, max: 12 }, // Example for the US: 10 digits
          // Add other countries and their phone number lengths here
        };
        const countryCode = dcountry ? dcountry : null;
        if (countryCode && phoneLengthByCountry[countryCode]) {
          const { min, max } = phoneLengthByCountry[countryCode];
          return value.length >= min && value.length <= max;
        }
        return true; // If no country is selected, do not apply length validation
      }),
  });
  const handleCheckboxChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedCheckOption(seletedValue);
    setValue("selectCheckOption", seletedValue);
  };
 
  const defaultFirstName = user?.userDetails?.first_name || "";
  const defaultLastName = user?.userDetails?.last_name || "";
  const defaultEmail = user?.userDetails?.email || "";
  const defaultPhone = user?.userDetails?.phone?.replace("+", "") || "";
  const [imagePreview, setImagePreview] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { selectCheckOption: "" },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
      setValue("file", [file]); // Pass the file array to the form
    }
  };
  const onSubmit = (data) => {
    setValue("imageView", imagePreview);
    setValue("selectedOption", selectedOption);
    let dropoffDetail = "";
    if (selectCheckOption == "" || selectCheckOption == undefined) {
      showErrorToast("Select dropoff location detail.");
      return;
    }
    if (selectCheckOption == "custom") {
      dropoffDetail = {
        first_name: data?.dname,
        last_name: data?.dlastname,
        phone: data?.dphoneNumber,
        email: data?.demail,
        company: data?.dcompany,
        dropoff_note: data?.dropoffnote,
      };
      setValue("dropoffdetail", true);
    } else {
      setValue("dropoffdetail", false);
    }

    navigate("/consumer/order-preview", {
      state: {
        order: order,
        orderCustomerDetails: data,
        dropoffDetail,
      },
    });
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    if (selectedOption === "Myself") {
      setValue("name", defaultFirstName);
      setValue("lastname", defaultLastName);
      setValue("email", defaultEmail);
      setValue("phoneNumber", defaultPhone);
    } else {
      setValue("name", "");
      setValue("lastname", "");
      setValue("email", "");
      setValue("phoneNumber", "");
    }
  }, [selectedOption]);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.addPickupDetailsSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <div className={Styles.addpickupDetailSidecardMain}>
                <img
                  className={Styles.addpickupDetailSidecardboxIcon}
                  src={SidebarImg}
                  alt="icon"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className={Styles.pickupAddpickupDetailsMaincard}>
                <div>
                  <h2 className={Styles.addPickupDetailsText}>
                    Add Pickup Details
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    You have entered pickup and drop-off addresses, time of
                    pickup, and vehicle type
                  </p>
                  <p className={Styles.pickupPersonalDetails}>
                    Personal details
                  </p>
                </div>

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailRadioCard}>
                      {["Myself", "Other"].map((label, index) => (
                        <div key={`radio-${index}`} className="mb-3">
                          <input
                            type="radio"
                            id={`radio-${index}`}
                            name="custom-radio-group"
                            value={label}
                            checked={selectedOption === label}
                            onChange={handleRadioChange}
                            className={Styles.addPickupDetailRadioBtn}
                          />
                          <label
                            htmlFor={`radio-${index}`}
                            style={{ paddingLeft: "8px" }}
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="name"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        First name: <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="First name"
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.name && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="lastname"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Last name: <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="lastname"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Last name"
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.lastname && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="company"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Company :
                      </label>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Company"
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.company && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="email"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Email: <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Email"
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.email && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="phoneNumber"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Phone Number:{" "}
                        <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            country={"fr"}
                            value={value}
                            onlyCountries={["fr", "in","ru","us","nz"]}
                            countryCodeEditable={false}
                            isValid={(value, country) => {
                              setValue("pcountry", country.iso2);
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={onChange}
                            inputStyle={{
                              width: "100%",
                              paddingLeft: "42px",
                              borderColor: isFocused ? "#ff4081" : "#ccc", // Border color changes on focus
                              boxShadow: isFocused
                                ? "0 0 5px rgba(255, 64, 129, 0.5)"
                                : "none", // Glowing effect
                              transition:
                                "border-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                            }}
                            buttonStyle={{
                              border: "none", // Removes border from the flag dropdown
                              background: "transparent", // Keeps flag dropdown appearance intact
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
                  </div>
                </div>

                <p className={Styles.pickupPersonalDetails}>Package details</p>

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <label
                      htmlFor="file"
                      className={Styles.addPickupDetailFormLabels}
                    >
                      Package photo <span className={Styles.textColor}>*</span> : <span className={Styles.textColor}>Max size: 5mb</span>
                    </label>

                    {imagePreview ? (
                      // Show only the package preview if an image has been uploaded
                      <div style={{position: 'relative',}} className="mt-2">
                        <p>Image Preview:</p>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: "auto",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                        <button
                          type="button"
                          className={Styles.removeImageButton}
                          onClick={() => {
                            setImagePreview(null); // Clear the image preview
                            resetField("file"); // Reset the file input field in react-hook-form
                          }}
                          style={{
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            // padding: "5px 5px",
                            cursor: "pointer",
                            position: "absolute",
                            height: "24px",
                            width: "24px",
                            marginLeft: "-16px",
                            borderRadius: "50%",
                          }}
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      // Show the upload UI when no image has been uploaded
                      <div className={Styles.addPickupUploadPhoto}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <p className={Styles.addPickupDragText}>
                          Drag or click to attach a photo
                        </p>
                        <Controller
                          name="file"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, ref } }) => (
                            <input
                              ref={ref} // Ensure correct ref assignment
                              type="file"
                              className={Styles.addPickupFileInput}
                              style={{ width: "100%", padding: "5px" }}
                              onChange={(e) => {
                                // Pass the selected files to the react-hook-form
                                onChange(e.target.files);
                                handleImageChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    )}

                    {errors.file && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "13px",
                          textAlign: imagePreview ? "left" : "center",
                        }}
                      >
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="packageId"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Package ID <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="packageId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Package Id ..."
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.packageId && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.packageId.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="pickupnote"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Pickup notes
                      </label>
                      <Controller
                        name="pickupnote"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Type here..."
                            style={{ width: "100%", padding: "5px" }}
                            className="dynamic-border-input"
                          />
                        )}
                      />
                      {errors.pickupnote && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                          {errors.pickupnote.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className={Styles.addPickupDetailsText}>
                    Add Drop Details
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    You have entered your drop details here 
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-start",
                  }}
                ></div>
                {selectCheckOption == "custom" && (
                  <div className={`row ${Styles.manageRow}`}>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dname"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          First name:{" "}
                          <span className={Styles.textColor}>*</span>
                        </label>
                        <Controller
                          name="dname"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="First name"
                              style={{ width: "100%", padding: "5px" }}
                              className="dynamic-border-input"
                            />
                          )}
                        />
                        {errors.dname && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dname.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dlastname"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Last name: <span className={Styles.textColor}>*</span>
                        </label>
                        <Controller
                          name="dlastname"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Last name"
                              style={{ width: "100%", padding: "5px" }}
                              className="dynamic-border-input"
                            />
                          )}
                        />
                        {errors.dlastname && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dlastname.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dcompany"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Company :
                        </label>
                        <Controller
                          name="dcompany"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Company"
                              style={{ width: "100%", padding: "5px" }}
                              className="dynamic-border-input"
                            />
                          )}
                        />
                        {errors.dcompany && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dcompany.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="demail"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Email: <span className={Styles.textColor}>*</span>
                        </label>
                        <Controller
                          name="demail"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Email"
                              style={{ width: "100%", padding: "5px" }}
                              className="dynamic-border-input"
                            />
                          )}
                        />
                        {errors.demail && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.demail.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dphoneNumber"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Phone Number:{" "}
                          <span className={Styles.textColor}>*</span>
                        </label>
                        <Controller
                          name="dphoneNumber"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              country={"fr"}
                              value={value}
                              onlyCountries={["fr", "in","ru","us","nz"]}
                              isValid={(value, country) => {
                                setValue("dcountry", country.iso2);
                              }}
                              countryCodeEditable={false}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              onChange={onChange}
                              inputStyle={{
                                width: "100%",
                                paddingLeft: "42px",
                                borderColor: isFocused ? "#ff4081" : "#ccc", // Border color changes on focus
                                boxShadow: isFocused
                                  ? "0 0 5px rgba(255, 64, 129, 0.5)"
                                  : "none", // Glowing effect
                                transition:
                                  "border-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                              }}
                              buttonStyle={{
                                border: "none", // Removes border from the flag dropdown
                                background: "transparent", // Keeps flag dropdown appearance intact
                              }}
                              dropdownStyle={{ borderColor: "#ccc" }}
                              enableSearch
                              searchPlaceholder="Search country"
                              specialLabel=""
                            />
                          )}
                        />
                        {errors.dphoneNumber && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dphoneNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                        <label
                          htmlFor="dropoffnote"
                          className={Styles.addPickupDetailFormLabels}
                        >
                          Dropoff notes
                        </label>
                        <Controller
                          name="dropoffnote"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Type here..."
                              style={{ width: "100%", padding: "5px" }}
                              className="dynamic-border-input"
                            />
                          )}
                        />
                        {errors.dropnote && (
                          <p style={{ color: "red", fontSize: "13px" }}>
                            {errors.dropnote.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailsBtnCard}>
                      <Link
                        className={Styles.addPickupDetailsCancelBTn}
                        style={{ color: "#000" }}
                        to="#"
                        onClick={goBack}
                      >
                        Back
                      </Link>
                      <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className={Styles.addPickupDetailsNextBtn}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddPickupDetails;
