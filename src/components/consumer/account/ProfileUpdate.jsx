import React, { useState } from "react";
import Styles from "../../../assets/css/home.module.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../../../common/TextInput";
import { API, uploadImage } from "../../../utils/Constants";
import { updateUserProfile } from "../../../data_manager/dataManage";
import { updateUserDetails } from "../../../redux/authSlice";
import { Spinner } from "react-bootstrap";
import Deliveryboyprofile from "../../../common/Deliveryboyprofile";
import Consumerprofile from "../../../common/Consumerprofile";
import Enterpriseprofile from "../../../common/Enterpriseprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function ProfileUpdate() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(
    `${API.viewImageUrl}${user?.userDetails?.profile_pic?.replace(/\.png$/, "")}`
  );

  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    phoneNumber: yup.string().required("Phone number is required").matches(/^\d+$/, "Phone number should contain only digits").min(8, "Phone number must be at least 8 digits"),
    file: yup.mixed().test("fileSize", "File size is too large", (value) =>!value || (value[0] && value[0].size <= FILE_SIZE)).test("fileType", "Unsupported file type", (value) =>!value || (value[0] && SUPPORTED_FORMATS.includes(value[0].type))),
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters long"),
    ...(user?.userDetails?.role === "ENTERPRISE" && {
      industry: yup.object({ value: yup.string().required("Industry is required") }).required(),
      deliveries: yup.string().required("Delivery Deliveries per month is required").matches(/^\d+$/, "Delivery should contain only digits")
    }),
    ...(user?.userDetails?.role === "DELIVERY_BOY" && {
        lastname: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters long"),
        company: yup.string().required("Company name is required"),
    }),
  });

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("file", [file]);
    }
  };

  const updateProfile = async (role, params, profilePicId) => {
    try {
      updateUserProfile(
        role,
        params,
        (successResponse) => {
          setLoading(false);
          const updatedDetails = {
            ...user.userDetails,
            ...params,
            ...(profilePicId && { profile_pic: profilePicId }),
          };
          dispatch(updateUserDetails({ userDetails: updatedDetails }));
          setMessage("Profile updated successfully");
          setTimeout(() => setMessage(""), 2200);
        },
        (errorResponse) => {
          setLoading(false);
          console.error("updateUserProfile error:", errorResponse);
        }
      );
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let profilePicId = "";

    if (data.file?.[0]) {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      profilePicId = await uploadImage(formData);
    }

    const profileParams = {
      ext_id: user.userDetails.ext_id,
      first_name: data.name,
      phone: `+${data.phoneNumber}`,
      email: data.email,
      ...(user?.userDetails?.role === "ENTERPRISE" && {
        industry_type_id: parseInt(data.industry.value),
        deliveryMonthHours: data.deliveries,
      }),
      ...(user?.userDetails?.role === "DELIVERY_BOY" && {
        last_name: data.lastname,
        company_name: data.company,
      }),
    };
    updateProfile(user.userDetails.role, profileParams, profilePicId);
  };

  return (
    <section className={Styles.addressBookMainSec}>
      <div>
      <div className={`row ${Styles.manageRow}`}>
        <div className="col-md-12 tex-center">
          <div className={Styles.profileImageContainer}>
            <img
              className={Styles.pickupAccountUserProfileUpdate}
              src={imagePreview}
              alt="Profile"
            />
            <label htmlFor="fileInput" className={Styles.changeImageLabel}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className={Styles.plusIcon}
              />
            </label>
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
      </div>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-12">
            <div className={Styles.pickupAddpickupDetailsMaincard}>
              <h2 className={Styles.addPickupDetailsText}>Update Profile</h2>
              <p className={Styles.pickupPersonalDetails}>Personal Details</p>

              {user.userDetails.role === "DELIVERY_BOY" && (
                <Deliveryboyprofile
                  user={user}
                  control={control}
                  errors={errors}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                />
              )}
              {user.userDetails.role === "CONSUMER" && (
                <Consumerprofile
                  user={user}
                  control={control}
                  errors={errors}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                />
              )}
              {user.userDetails.role === "ENTERPRISE" && (
                <Enterpriseprofile
                  user={user}
                  control={control}
                  errors={errors}
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                />
              )}

              <div className={`row ${Styles.manageRow}`}>
                <div className="col-md-12">
                  <p className="text-success">{message}</p>
                  <div className={`${Styles.addPickupDetailsBtnCard} d-flex justify-content-end`}>
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className={Styles.addPickupDetailsNextBtn}
                    >
                      {loading ? <Spinner /> : "Update"}
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
  );
}

export default ProfileUpdate;
