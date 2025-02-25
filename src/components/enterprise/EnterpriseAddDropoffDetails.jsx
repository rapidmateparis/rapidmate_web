import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faRepeat,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SidebarImg from "../../assets/images/Pickup-Detail-SideImg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RepeatEverySelect from "./common/RepeatEverySelect";
import DatePickerField from "../../common/DatePickerField";
import WeekDaysSelect from "./common/WeekDaysSelect";
import DaysSelect from "./common/DaysSelect";
import TextInput from "../../common/TextInput";
import { localToUTC } from "../../utils/Constants";
import { getDynamicDropoffSchema } from "../../utils/Validation";
import { useTranslation } from "react-i18next";
import { updateOrderDetails } from "../../redux/doOrderSlice";
import localforage from "localforage";
const EnterpriseAdd = () => {
  const location = useLocation();
  const {t}=useTranslation()
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { order } = useSelector((state) => state.orderDetails);
  const [selectCheckOption, setSelectedCheckOption] = useState("custom");
  const [repeatOrder, setRepeatOrder] = useState(false);
  const [instance, setInstance] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleDaySelect = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  
  const handleCheckboxChange = (event) => {
    const seletedValue = event.target.value;
    setSelectedCheckOption(seletedValue);
    setValue("selectCheckOption", seletedValue);
  };

  const defaultEmail = user?.userDetails?.email || "";
  const defaultCompany = user?.userDetails?.company_name || "";
  const defaultPhone = user?.userDetails?.phone.replace("+", "") || "";
  const [imagePreview, setImagePreview] = useState({});
  const [time, setTime] = useState("10:00");
  const [untilDate, setUntilDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const dropoffCount = order?.dropoffLoc?.length || 0;
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(getDynamicDropoffSchema(dropoffCount)),
    defaultValues: {
      isSchedule: false,
      repeatEvery: 1,
      pickupDate: new Date(),
      until: new Date(),
    },
  });


  const handleImageChange = async(e,index) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);

      // Update state to store the preview for the corresponding index
      setImagePreview((prev) => ({
        ...prev,
        [index]: previewURL,
      }));
    
      // Set form value dynamically
      setValue(`file-${index}`, [file]);

      await localforage.setItem(`file-${index}`, [file]);
    }
  };
  const onSubmit = (data) => {
    setValue("imageView", imagePreview);
    

   
    const payload = {
      ...order,
      orderCustomerDetails: data
    }
    dispatch(updateOrderDetails(payload))
  // console.log("data",data)
    navigate("/enterprise/order-preview");
  };

  const handleRepeatOrder = (event) => {
    setRepeatOrder(event.target.checked);
    setValue("repeatOrder", event.target.checked);
  };

  const handleInstanceOrder = (event) => {
    setInstance(event.target.checked);
    setValue("isSchedule", event.target.checked);
  };

  const handleUntilChange = (date) => {
    setUntilDate(moment(date).format("YYYY-MM-DD"));
    // setValue("until", date); // Update the form value dynamically
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    if (defaultCompany) {
      setValue("company", defaultCompany);
      setValue("email", defaultEmail);
      setValue("phoneNumber", defaultPhone);
    } else {
      setValue("company", "");
      setValue("email", "");
      setValue("phoneNumber", "");
    }
  }, [user]);
  useEffect(()=>{
    const getLocalData = async ()=>{
      if(order?.orderCustomerDetails){
        
        setInstance(order?.orderCustomerDetails?.isSchedule)
        const data =order?.orderCustomerDetails
        Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
        });
        order?.dropoffLoc?.map(async(v,i)=>{
          const savedFile = await localforage.getItem("file-"+i);
          if (savedFile) {
            const urlImg=URL.createObjectURL(savedFile[0])
            setImagePreview((prev) => ({
              ...prev,
              [i]: urlImg,
            }));
            setValue("file-"+i, savedFile); 
          }
        })
      }
      
    }
    if(order){
      getLocalData()
    }
  },[])
  const handleTimeset = (e) => {
    setSelectedTime(e.target.value);
    setValue("pickupTime", e.target.value);
  };
  const repeatOption = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ];
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
                    {t("add_pickup_details")}
                  </h2>
                  <p className={Styles.addPickupDetailsSubtext}>
                    {t("pickup_dropoff_entered")}
                  </p>
                  <p className={Styles.pickupPersonalDetails}>
                    {t("personal_details")}
                  </p>
                </div>

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="company"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        {t("company")} : <span className={Styles.textColor}>*</span>
                      </label>
                      <TextInput
                        control={control}
                        name="company"
                        placeholder={t("company")}
                        error={errors.company}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="email"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        {t("email")}: <span className={Styles.textColor}>*</span>
                      </label>
                      <TextInput
                        control={control}
                        name="email"
                        placeholder={t("email")}
                        error={errors.email}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.addPickupDetailsInputs}>
                      <label
                        htmlFor="phoneNumber"
                        className={Styles.addPickupDetailFormLabels}
                      >
                        {t("phone_number")}:{" "}
                        <span className={Styles.textColor}>*</span>
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={""}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            country={"fr"}
                            value={value}
                            onlyCountries={["fr", "in", "ru","us","nz"]}
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
                    <div
                      className={Styles.enterpriseSelectServiceRepeatOrderCard}
                    >
                      <p
                        className={
                          Styles.enterpriseSelectServiceRepeatOrderText
                        }
                      >
                        {t("is_instant_date")}
                      </p>

                      <Form.Check
                        type="switch"
                        id="instance-switch"
                        checked={instance}
                        onChange={handleInstanceOrder}
                        className={Styles.customSwitch}
                      />
                    </div>
                  </div>
                  {!instance ? (
                    <>
                      {/* Pickup Date Section */}
                      <div className="col-md-6">
                        <div className={Styles.addPickupDetailsInputs}>
                          <label
                            htmlFor="pickupDate"
                            className={Styles.enterpriseSelectServicePickupDate}
                          >
                            {t("pickup_date")}{" "}
                          </label>
                          <Controller
                            name="pickupDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                selected={field.value}
                                onChange={field.onChange}
                                dateFormat="dd/MM/yyyy"
                                className={`${Styles.enterpriseSelectServiceDateCard} dynamic-border-input`}
                              />
                            )}
                          />
                          {errors.pickupDate && (
                            <p className={Styles.errorText}>
                              {errors.pickupDate.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Pickup Time Section */}
                      <div className="col-md-6">
                        <div className={Styles.addPickupDetailsInputs}>
                          <label
                            htmlFor="pickupTime"
                            className={Styles.addPickupDetailFormLabels}
                          >
                            {t("pickup_time")}:
                          </label>

                          <input
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeset}
                            style={{
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              width: "50%",
                              fontSize: "14px",
                            }}
                            className="dynamic-border-input"
                          />

                          {errors.pickupTime && (
                            <p className={Styles.errorText}>
                              {errors.pickupTime.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>{t("pickup_date")}: {localToUTC()}</div>
                  )}
                </div>
                <div
                  className={Styles.enterpriseSelectServiceRepeatOrderMainCard}
                >
                  <div
                    className={Styles.enterpriseSelectServiceRepeatOrderCard}
                  >
                    <p
                      className={Styles.enterpriseSelectServiceRepeatOrderText}
                    >
                      Repeat this order
                    </p>

                    <Form.Check
                      type="switch"
                      id="repeat-switch"
                      checked={repeatOrder}
                      onChange={handleRepeatOrder}
                      className={Styles.customSwitch}
                    />
                  </div>

                  {repeatOrder && (
                    <>
                      <div
                        className={Styles.enterpriseSelectServiceDayilyCardMain}
                      >
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Daily" ? "selected" : ""}`}
                          onClick={() => handleSelect("Daily")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Daily"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Daily"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Daily
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Weekly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Weekly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Weekly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Weekly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Weekly
                          </p>
                        </div>

                        <div
                          className={`${
                            Styles.enterpriseSelectServiceDayilyCard
                          } ${selectedOption === "Monthly" ? "selected" : ""}`}
                          onClick={() => handleSelect("Monthly")}
                        >
                          <FontAwesomeIcon
                            className={`${
                              Styles.enterpriseSelectServiceRepeatCircle
                            } ${
                              selectedOption === "Monthly"
                                ? "Service-selected-icon"
                                : ""
                            }`}
                            icon={
                              selectedOption === "Monthly"
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={Styles.enterpriseSelectServiceDayilyText}
                          >
                            Monthly
                          </p>
                        </div>
                      </div>

                      {selectedOption === "Daily" && (
                        <div
                          className={
                            Styles.enterpriseSelectServiceRepeatEveryCard
                          }
                        >
                          <div
                            className={Styles.enterpriseSelectServiceDayilyCard}
                          >
                            <FontAwesomeIcon
                              className={
                                Styles.enterpriseSelectServiceRepeatCircle
                              }
                              icon={faRepeat}
                            />
                            <p
                              className={
                                Styles.enterpriseSelectServiceRepeatEveryText
                              }
                            >
                              Repeat every
                            </p>
                          </div>
                          <RepeatEverySelect
                            control={control}
                            name="repeatEvery"
                            error={errors.repeatEvery}
                            repeatList={repeatOption}
                          />
                          <div
                            className={Styles.enterpriseSelectServiceUntilCard}
                          >
                            <p
                              className={
                                Styles.enterpriseSelectServiceUntilText
                              }
                            >
                              until
                            </p>
                            <DatePickerField
                              control={control}
                              name="until"
                              selectedDate={untilDate}
                              error={errors.until}
                            />
                          </div>

                          <div>
                            <p
                              className={
                                Styles.enterpriseSelectServiceOccursday
                              }
                            >
                              {" "}
                              Occurs every day until{" "}
                              <span
                                className={
                                  Styles.enterpriseSelectServiceOccursSpan
                                }
                              >
                                {untilDate}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedOption === "Weekly" && (
                        <div>
                          <div
                            className={
                              Styles.enterpriseSelectServiceRepeatEveryCard
                            }
                          >
                            <div
                              className={
                                Styles.enterpriseSelectServiceDayilyCard
                              }
                            >
                              <FontAwesomeIcon
                                className={
                                  Styles.enterpriseSelectServiceRepeatCircle
                                }
                                icon={faRepeat}
                              />
                              <p
                                className={
                                  Styles.enterpriseSelectServiceRepeatEveryText
                                }
                              >
                                Repeat every
                              </p>
                            </div>
                            <RepeatEverySelect
                              control={control}
                              name="repeatEvery"
                              error={errors.repeatEvery}
                              repeatList={repeatOption}
                            />

                            <DaysSelect control={control} error={errors.days} />

                            <div
                              className={
                                Styles.enterpriseSelectServiceUntilCard
                              }
                            >
                              <p
                                className={
                                  Styles.enterpriseSelectServiceUntilText
                                }
                              >
                                until
                              </p>
                              <DatePickerField
                                control={control}
                                name="until"
                                selectedDate={untilDate}
                                onChange={handleUntilChange}
                                error={errors.until}
                              />
                            </div>
                            <div>
                              <p
                                className={
                                  Styles.enterpriseSelectServiceOccursday
                                }
                              >
                                Occurs every day until{" "}
                                <span
                                  className={
                                    Styles.enterpriseSelectServiceOccursSpan
                                  }
                                >
                                  {untilDate}
                                </span>
                              </p>
                            </div>
                          </div>
                          <WeekDaysSelect
                            control={control}
                            selectedDays={selectedDays}
                          />
                        </div>
                      )}

                      {selectedOption === "Monthly" && (
                        <div>
                          <div
                            className={
                              Styles.enterpriseSelectServiceRepeatEveryCard
                            }
                          >
                            <div
                              className={
                                Styles.enterpriseSelectServiceDayilyCard
                              }
                            >
                              <FontAwesomeIcon
                                className={
                                  Styles.enterpriseSelectServiceRepeatCircle
                                }
                                icon={faRepeat}
                              />
                              <p
                                className={
                                  Styles.enterpriseSelectServiceRepeatEveryText
                                }
                              >
                                Repeat every
                              </p>
                            </div>
                            <RepeatEverySelect
                              control={control}
                              name="repeatEvery"
                              error={errors.repeatEvery}
                              repeatList={repeatOption}
                            />

                            <DaysSelect control={control} error={errors.days} />

                            <div
                              className={
                                Styles.enterpriseSelectServiceDayilyCard
                              }
                            >
                              <p
                                className={
                                  Styles.enterpriseSelectServiceRepeatEveryText
                                }
                              >
                                On Day
                              </p>
                            </div>
                            <div className="me-2">
                              <Controller
                                name="onDay"
                                control={control}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    id="onDay"
                                    className="form-select"
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  >
                                    {/* <option value="">Select</option> */}
                                    {Array.from({ length: 31 }, (_, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              />
                              {errors.onDay && (
                                <p className="text-danger">
                                  {errors.onDay.message}
                                </p>
                              )}
                            </div>
                            <div
                              className={
                                Styles.enterpriseSelectServiceDayilyCard
                              }
                            >
                              <p
                                className={
                                  Styles.enterpriseSelectServiceRepeatEveryText
                                }
                              >
                                On the
                              </p>
                            </div>
                            <div className="me-2">
                              <Controller
                                name="onThe"
                                control={control}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    id="onThe"
                                    className="form-select"
                                  >
                                    <option value="">Select</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                    <option value="Last">Last</option>
                                  </select>
                                )}
                              />
                              {errors.onThe && (
                                <p className="text-danger">
                                  {errors.onThe.message}
                                </p>
                              )}
                            </div>
                            <div
                              className={
                                Styles.enterpriseSelectServiceUntilCard
                              }
                            >
                              <p
                                className={
                                  Styles.enterpriseSelectServiceUntilText
                                }
                              >
                                until
                              </p>
                              <DatePickerField
                                control={control}
                                name="until"
                                selectedDate={untilDate}
                                onChange={handleUntilChange}
                                error={errors.until}
                              />
                            </div>

                            <div>
                              <p
                                className={
                                  Styles.enterpriseSelectServiceOccursday
                                }
                              >
                                {" "}
                                Occurs every day until{" "}
                                <span
                                  className={
                                    Styles.enterpriseSelectServiceOccursSpan
                                  }
                                >
                                  {untilDate}
                                </span>
                              </p>
                            </div>
                          </div>
                          <WeekDaysSelect
                            control={control}
                            selectedDays={selectedDays}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>

             
               
                {order?.dropoffLoc &&
                  order?.dropoffLoc.map((dropoff, index) => (
                    <div
                      key={index}
                      
                    >
                         <div>
                          <h2 className={Styles.addPickupDetailsText}>
                            {t("dropoff_information")} {index + 1}
                          </h2>
                          <p className={Styles.addPickupDetailsSubtext}>
                            {t("dropoff_details_entered")}
                          </p>
                        </div>
                        <p className={Styles.pickupPersonalDetails}>{t("package_details")}</p>

                        <div className={`row ${Styles.manageRow}`}>
                          <div className="col-md-12">
                            <label
                              htmlFor="file"
                              className={Styles.addPickupDetailFormLabels}
                            >
                              {t("package_photo")} <span className={Styles.textColor}>*</span> : <span className={Styles.textColor}>Max size: 5mb</span>
                            </label>

                            { imagePreview[index] ? (
                              // Show only the package preview if an image has been uploaded
                              <div style={{ position: "relative" }} className="mt-2">
                                <p>{t("image_preview")}:</p>
                                <img
                                  src={imagePreview[index]}
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
                                    setImagePreview((prev) => ({
                                      ...prev,
                                      [index]: null, // Clear the preview
                                    }));
                                    resetField(`file-${index}`);
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
                                  {t("attach_photo")}
                                </p>
                                <Controller
                                  name={`file-${index}`}
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
                                        handleImageChange(e,index);
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
                            {errors[`file-${index}`] && <p style={{
                                  color: "red",
                                  fontSize: "13px",
                                  textAlign: "center",
                                }}>{errors[`file-${index}`].message}</p>}
                          </div>

                          <div className="col-md-6">
                            <div className={Styles.addPickupDetailsInputs}>
                              <label
                                htmlFor={`packageId-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("package_id")}
                              </label>

                              <TextInput
                                control={control}
                                name={`packageId-${index}`}
                                placeholder={t("package_id")}
                                error={errors[`packageId-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className={Styles.addPickupDetailsInputs}>
                              <label
                                htmlFor={`pickupnote-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("pickup_notes")}
                              </label>
                              <TextInput
                                control={control}
                                name={`pickupnote-${index}`}
                                placeholder={t("type_here")}
                                error={errors[`pickupnote-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className={`row ${Styles.manageRow}`}>
                          {/* First Name */}
                          <div className="col-md-6">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`dname-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("first_name")}:{" "}
                                <span className={Styles.textColor}>*</span>
                              </label>
                              <TextInput
                                control={control}
                                name={`dname-${index}`}
                                placeholder={t("first_name")}
                                error={errors[`dname-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>

                          {/* Last Name */}
                          <div className="col-md-6">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`dlastname-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("last_name")}:{" "}
                              </label>
                              <TextInput
                                control={control}
                                name={`dlastname-${index}`}
                                placeholder="Last name"
                                error={errors[`dlastname-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>

                          {/* Company */}
                          <div className="col-md-12">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`dcompany-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("company")}:
                              </label>
                              <TextInput
                                control={control}
                                name={`dcompany-${index}`}
                                placeholder={t("company")}
                                error={errors[`dcompany-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="col-md-6">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`demail-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("email")}: {" "} <span className={Styles.textColor}>*</span>
                              </label>
                              <TextInput
                                control={control}
                                name={`demail-${index}`}
                                placeholder={t("email")}
                                error={errors[`demail-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>

                          {/* Phone Number */}
                          <div className="col-md-6">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`dphoneNumber-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("phone_number")}:{" "}
                                <span className={Styles.textColor}>*</span>
                              </label>
                              <Controller
                                name={`dphoneNumber-${index}`}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                  <PhoneInput
                                    country="fr"
                                    value={value}
                                    onlyCountries={["fr", "in", "ru","us","nz"]}
                                    countryCodeEditable={false}
                                    onChange={onChange}
                                    inputStyle={{
                                      width: "100%",
                                      paddingLeft: "42px",
                                      borderColor: isFocused
                                        ? "#ff4081"
                                        : "#ccc",
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
                              {errors[`dphoneNumber-${index}`] && (
                                <p style={{ color: "red", fontSize: "13px" }}>
                                  {errors[`dphoneNumber-${index}`].message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Dropoff Notes */}
                          <div className="col-md-6">
                            <div
                              className={`mb-1 ${Styles.addPickupDetailsInputs}`}
                            >
                              <label
                                htmlFor={`dropoffnote-${index}`}
                                className={Styles.addPickupDetailFormLabels}
                              >
                                {t("dropoff_notes")}:
                              </label>
                              <TextInput
                                control={control}
                                name={`dropoffnote-${index}`}
                                placeholder={t("type_here")}
                                error={errors[`dropoffnote-${index}`]}
                                defaultValue=""
                              />
                            </div>
                          </div>
                        </div>
                       
                    </div>
                  ))}

                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-12">
                    <div className={Styles.addPickupDetailsBtnCard}>
                      <Link
                        className={Styles.addPickupDetailsCancelBTn}
                        style={{ color: "#000" }}
                        to="/enterprise/dashboard"
                      >
                        {t("back")}
                      </Link>
                      <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        className={Styles.addPickupDetailsNextBtn}
                      >
                        {t("next")}
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

export default EnterpriseAdd;
