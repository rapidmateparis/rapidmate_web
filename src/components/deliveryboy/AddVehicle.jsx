import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../assets/css/home.module.css";
import Logo from "../../assets/images/Logo-icon.png";
import Bicycle from "../../assets/images/Cycle-Vehicle.png";
import Scooter from "../../assets/images/Scooter-Vehicle.png";
import Car from "../../assets/images/Car-Vehicle.png";
import Partner from "../../assets/images/Partner-Vehicle.png";
import Van from "../../assets/images/Van-Vehicle.png";
import Pickup from "../../assets/images/Pickup-Vehicle.png";
import Truck from "../../assets/images/Truck-Vehicle.png";
import Package from "../../assets/images/Package.png";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  addVehicleApi,
  getAllVehicleTypes,
} from "../../data_manager/dataManage";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadImage } from "../../utils/Constants";
const schema = yup.object().shape({
  vehicleNo: yup
    .string()
    .min(6, "Vehicle number must be at least 6 characters")
    .required("Vehicle number is required"),
  modal: yup.string().required("model is required"),
  make: yup.string().required("Make field is required"),
  variant: yup.string().required("Variant field is required"),
  vehicelTypeId: yup.string().required("Vehicle type is required"),
  reg_doc: yup.mixed().required("File is required"),
  driving_license: yup.mixed().required("File is required"),
  insurance: yup.mixed().required("File is required"),
  passport: yup.mixed().required("File is required"),
});
function AddVehicle() {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user)
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const baseUrl = role?.toLowerCase().replace(/_/g, "");
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [previews, setPreviews] = useState({
    reg_doc: null,
    driving_license: null,
    insurance: null,
    passport: null,
  });
  const handleVehicleClick = (vehicleTypeId, vehicleName) => {
    setSelectedVehicle(vehicleName);
    setVehicleId(vehicleTypeId);
    setValue("vehicelTypeId", vehicleTypeId);
  };
  useEffect(() => {
    setLoading(true);
    const getAllVehiclesType = () => {
      getAllVehicleTypes(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            setLoading(false);
            console.log(successResponse[0]._response);
            setVehicleTypeList(successResponse[0]._response);
          }
        },
        (errorResponse) => {
          setLoading(false);
          let err = "";
          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          setErrorMessage(err);
        }
      );
    };
    getAllVehiclesType();
  }, []);
  const getImage = (vehicleData) => {
    switch (vehicleData.vehicle_type_id) {
      case 1:
        return Bicycle;
      case 2:
        return Scooter;
      case 3:
        return Car;
      case 4:
        return Partner;
      case 5:
        return Van;
      case 6:
        return Pickup;
      case 7:
        return Truck;
      default:
        return Package;
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    console.log(data)
    let params = {
      delivery_boy_ext_id: user?.userDetails?.ext_id,
      vehicle_type_id: data?.vehicelTypeId || vehicleId,
      plat_no: data.vehicleNo,
      modal: data.modal,
      make: data.make,
      variant: data.variant,
    };
    if (data.reg_doc) {
      const regDocFormData = new FormData();
      regDocFormData.append("file", data.reg_doc);
      const regDocResponse = await uploadImage(regDocFormData);
      params.reg_doc = regDocResponse;
    }
    if (data.driving_license) {
      const drivingLicenseFormData = new FormData();
      drivingLicenseFormData.append("file", data.driving_license);
      const drivingLicenseResponse = await uploadImage(drivingLicenseFormData);
      params.driving_license = drivingLicenseResponse;
    }
    if (data.insurance) {
      const insuranceFormData = new FormData();
      insuranceFormData.append("file", data.insurance);
      const insuranceResponse = await uploadImage(insuranceFormData);
      console.log("insurance", insuranceResponse);
      params.insurance = insuranceResponse;
    }
    if (data.passport) {
      const passportFormData = new FormData();
      passportFormData.append("file", data.passport);
      const passportResponse = await uploadImage(passportFormData);
      console.log("passport", passportResponse);
      params.passport = passportResponse;
    }

    addVehicleApi(
      params,
      (successResponse) => {
        console.log("successResponse", successResponse);
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            console.log("print_data==>addVehicle", successResponse[0]);
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              // successResponse[0]._response.name
            } else if (successResponse[0]._httpsStatusCode == 200) {
              navigate("/deliveryboy/add-work-type");
            }
          }
        }
      },
      (errorResponse) => {
        setLoading(false);
        console.log("print_data===>", JSON.stringify(errorResponse));
        // errorResponse[0]._errors.message
      }
    );
  };
  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
        setValue(fieldName, file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <section className={Styles.profileChooseSec}>
        <div className="container">
          <div>
            <Link
              className={Styles.logoCard}
              to={!isAuthenticated && !role ? "/" : `/${baseUrl}/add-vehicle`}
            >
              <img className={Styles.logo} src={Logo} alt="logo" />
              <h2 className={Styles.companyName}>Rapidmate</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.pickupSignupFormMainCard}>
                <div className={Styles.chooseMainCard}>
                  <div className={Styles.chooseProfileCard}>
                    <h2 className={Styles.chooseProfileHeading}>Add vehicle</h2>
                    <p className={Styles.chooseProfileSubheading}>
                      Please add vehicle you will use for delivery
                    </p>
                  </div>
                </div>
                <div>
                  <p className={Styles.deliveryboyVehicleSelectText}>
                    Select vehicle type
                  </p>
                  <div className={Styles.deliveryboyAddVehicleAllImagesCard}>
                    {vehicleTypeList.map((vehicle, index) => (
                      <div
                        key={index}
                        className={`${
                          Styles.deliveryboyAddVehicleVehicleCard
                        } ${
                          selectedVehicle === vehicle.vehicle_type
                            ? Styles.selected
                            : ""
                        }`}
                        onClick={() =>
                          handleVehicleClick(
                            vehicle.vehicle_type_id,
                            vehicle.vehicle_type
                          )
                        }
                      >
                        <div
                          className={
                            Styles.deliveryboyaddVehicleVehicleImageCard
                          }
                        >
                          <img
                            className={Styles.DeliveryBicycle}
                            src={getImage(vehicle)}
                            alt={vehicle.vehicle_type}
                          />
                        </div>
                        <p className={Styles.deliveryboyVehicleName}>
                          {vehicle.vehicle_type}
                        </p>
                      </div>
                    ))}
                  </div>
                  {errors.vehicelTypeId && (
                    <p className={Styles.termsCheck}>
                      {errors.vehicelTypeId?.message}
                    </p>
                  )}
                  <div>
                    <p className={Styles.deliveryboyVehicleFormDetailText}>
                      Fill vehicle details
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        {["vehicleNo", "modal", "make", "variant"].map(
                          (field, idx) => (
                            <div className="col-md-6" key={idx}>
                              <div className="mb-3">
                                <label htmlFor={field}>{field}</label>
                                <div className={Styles.pickupSignupContainer}>
                                  <Controller
                                    name={field}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        type="text"
                                        placeholder={`Enter ${field.name}`}
                                        style={{
                                          width: "100%",
                                          padding: "5px",
                                        }}
                                        className={Styles.signupUserName}
                                      />
                                    )}
                                  />
                                </div>

                                {errors[field] && (
                                  <p className={Styles.termsCheck}>
                                    {errors[field]?.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                        {[
                          "reg_doc",
                          "driving_license",
                          "insurance",
                          "passport",
                        ].map((fileField) => (
                          <div className="col-md-6" key={fileField}>
                            <div className="mb-2">
                              <label htmlFor={fileField}>
                                {fileField.charAt(0).toUpperCase() +
                                  fileField.slice(1)}
                              </label>
                              <div className={Styles.pickupSignupContainer}>
                                <input
                                  type="file"
                                  name={fileField}
                                  onChange={(e) =>
                                    handleFileChange(e, fileField)
                                  } // Call handleFileChange
                                  className="w-full"
                                />
                              </div>
                              {previews[fileField] && (
                                <div className="mt-2">
                                  <img
                                    src={previews[fileField]} // Display preview image if available
                                    alt={`${fileField} preview`}
                                    style={{ width: "100px" }}
                                  />
                                </div>
                              )}
                              {errors[fileField] && (
                                <p className={Styles.termsCheck}>
                                  {errors[fileField]?.message}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className={Styles.pickupSignupContinueBtn}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddVehicle;
