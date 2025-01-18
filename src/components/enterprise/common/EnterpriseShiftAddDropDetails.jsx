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

const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  packageId: yup.string().required("Package ID is required"),
  file: yup.mixed().required("Package photo is required"),
});

const EnterpriseShiftAddDropDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedOption, setSelectedOption] = useState("Myself");
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleRadioChange = (event) => setSelectedOption(event.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic
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
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="First name"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.name && (
                        <p className={Styles.errorText}>
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
                          />
                        )}
                      />
                      {errors.lastname && (
                        <p className={Styles.errorText}>
                          {errors.lastname.message}
                        </p>
                      )}
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
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Company"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
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
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Email"
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className={Styles.errorText}>
                          {errors.email.message}
                        </p>
                      )}
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
                      <Controller
                        name="packageId"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Package Id ..."
                            style={{ width: "100%", padding: "5px" }}
                          />
                        )}
                      />
                      {errors.packageId && (
                        <p className={Styles.errorText}>
                          {errors.packageId.message}
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
                            countryCodeEditable={false}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
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
                        <p className={Styles.errorText}>
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
                      <p className={Styles.errorText}>{errors.file.message}</p>
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
                      <Controller
                        name="pickupnote"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            placeholder="Type here..."
                            style={{
                              width: "100%",
                              padding: "5px",
                              height: "100px",
                              textAlign: "left",
                              verticalAlign: "top",
                            }}
                          />
                        )}
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
                      <Link
                        to="/enterprise/shift-order-preview"
                        type="submit"
                        className={Styles.addPickupDetailsNextBtn}
                      >
                        Next
                      </Link>
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
