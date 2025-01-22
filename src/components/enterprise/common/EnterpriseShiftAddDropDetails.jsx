import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../../assets/images/Pickup-Detail-SideImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../../common/CommonHeader";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-input-2";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";


const FILE_SIZE = 5 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
const schema = yup.object().shape({
    company: yup.string().required("Company name is required"),
    packageId: yup
      .string()
      .required("Package id is required")
      .min(3, "Package id must be at least 3 characters long"),
    pickupnote: yup.string(),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number should contain only digits")
      .test("length", "Phone number length is invalid", function (value) {
        const { country } = this.parent; // Assuming country is selected in the form
        const phoneLengthByCountry = {
          in: { min: 12, max: 12 }, // Example for France: minimum and maximum length is 10
          fr: { min: 11, max: 11 },
          ru: { min: 11, max: 11 }, // Example for the US: 10 digits
          // Add other countries and their phone number lengths here
        };
        const countryCode = country ? country : null;
        if (countryCode && phoneLengthByCountry[countryCode]) {
          const { min, max } = phoneLengthByCountry[countryCode];
          return value.length >= min && value.length <= max;
        }
        return true; // If no country is selected, do not apply length validation
      }),
    file: yup
      .mixed()
      .required("A file is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value[0] && value[0].size <= FILE_SIZE;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }),
   
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    lastname: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    
  });

const EnterpriseShiftAddDropDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const defaultEmail = user?.userDetails?.email || "";
  const defaultCompany = user?.userDetails?.company_name || "";
  const defaultPhone = user?.userDetails?.phone.replace("+", "") || "";
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

 
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    
    // Handle form submission logic
    //enterprise/shift-order-preview
    navigate("/enterprise/shift-order-preview", {
      state: {
        ...location.state,
        dropoffDetail: data,
      },
    });
  };

  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.addPickupDetailsSec}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="name"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        First name: <span className={Styles.textColor}>*</span>
                      </label>
                      <TextInput
                        control={control}
                        name="name"
                        placeholder="Name"
                        error={errors.name}
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
                        Last name: <span className={Styles.textColor}>*</span>
                      </label>
                      <TextInput
                        control={control}
                        name="lastname"
                        placeholder="Lastname"
                        error={errors.lastname}
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
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
                        placeholder="Company"
                        error={errors.company}
                        defaultValue={""}
                      />
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
                      <TextInput
                        control={control}
                        name="email"
                        placeholder="email"
                        error={errors.email}
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="packageId"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Package ID <span className={Styles.textColor}>*</span>
                      </label>
                      <TextInput
                        control={control}
                        name="packageId"
                        placeholder="Package Id ..."
                        error={errors.packageId}
                        defaultValue=""
                      />
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
                              onlyCountries={["fr", "in", "ru"]}
                              countryCodeEditable={false}
                              isValid={(value, country) => {
                                setValue("country", country.iso2);
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

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <label
                      htmlFor="file"
                      className={Styles.addPickupDetailFormLabels}
                    >
                      Package photo <span className={Styles.textColor}>*</span>
                    </label>
                    {imagePreview ? (
                      <div style={{ position: "relative" }} className="mt-2">
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
                            setImagePreview(null);
                            resetField("file");
                          }}
                          style={{
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
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
                              ref={ref}
                              type="file"
                              className={Styles.addPickupFileInput}
                              style={{ width: "100%", padding: "5px" }}
                              onChange={(e) => {
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
                          textAlign: "center",
                        }}
                      >
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-12">
                    <div className={`mb-1 ${Styles.addPickupDetailsInputs}`}>
                      <label
                        htmlFor="pickupnote"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        Drop notes
                      </label>
                      <TextInput
                          control={control}
                          name="pickupnote"
                          placeholder="Type here ..."
                          error={errors.pickupnote}
                          defaultValue=""
                        />
                    </div>
                  </div>
                </div>

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailsBtnCard}>
                      <Link
                        className={Styles.addPickupDetailsCancelBTn}
                        style={{ color: "#000" }}
                        to="#"
                        onClick={() => navigate(-1)}
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
          <ToastContainer />
        </form>
      </section>
    </>
  );
};

export default EnterpriseShiftAddDropDetails;
