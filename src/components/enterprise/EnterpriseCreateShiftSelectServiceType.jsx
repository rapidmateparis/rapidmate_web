import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Info from "../../assets/images/info.png";

import CommonHeader from "../../common/CommonHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getImage from "../consumer/common/GetImage";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SideComponent from "./common/SideComponent";
import { getAllVehicleTypes } from "../../data_manager/dataManage";
import PickupVehicleDimensionsModal from "../consumer/PickupVehicleDimensionsModal";
import { useTranslation } from "react-i18next";

const EnterpriseCreateShiftSelectServiceType = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBranch, deliveryType } = location.state;
  const { enterpriseServiceType } = useSelector(
    (state) => state.commonData.commonData
  );
  const [selectedServiceType, setSelectedServiceType] = useState(
    enterpriseServiceType ? enterpriseServiceType[0] : null
  );
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(1);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleServiceTypeClick = (serviceType) => {
    if (serviceType.id == 3 || serviceType.id == 4) {
      setAmount(serviceType?.hour_amount || 0);
      setSelectedVehicle(null);
    } else {
      const vehicle = vehicleTypeList.filter((val) =>
        val.id == selectedVehicle ? selectedVehicle : 1
      )[0];
      serviceType.id == 1
        ? setAmount(vehicle.enterprise_wv_amount)
        : setAmount(vehicle.enterprise_wov_amount);
      setSelectedVehicle(selectedVehicle ? selectedVehicle : 1);
    }

    setSelectedServiceType(serviceType);
  };
  const vehicleHandler = (vehicleId) => {
    const vehicle = vehicleTypeList.filter((val) => val.id == vehicleId)[0];
    selectedServiceType.id == 1
      ? setAmount(vehicle.enterprise_wv_amount)
      : setAmount(vehicle.enterprise_wov_amount);
    setSelectedVehicle(vehicleId);
  };

  const continueHanger = async (e) => {
    e.preventDefault();
    if (selectedVehicle == null || selectedServiceType == null) {
      showErrorToast("Select service type and vehicle type");
      return;
    }

    navigate("/enterprise/set-schedule", {
      state: {
        vehicletypeId: selectedVehicle,
        serviceType: selectedServiceType,
        branch: selectedBranch,
        deliveryType: deliveryType,
        amount,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    const getAllVehiclesType = () => {
      getAllVehicleTypes(
        null,
        (successResponse) => {
          if (successResponse[0]._success) {
            setLoading(false);
            setVehicleTypeList(successResponse[0]._response);
            setAmount(successResponse[0]._response[0]?.enterprise_wv_amount);
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

  const openModal = (vehicle) => {
    setVehicleDetail(vehicle);
    setShowModal(true);
  };

  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-4">
              <SideComponent icon="yes" />
            </div>

            <div className="col-md-8">
              <div className={Styles.enterpriseNewScheduletypeMainCard}>
                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  {t("select_service_type")}
                </h4>

                <div className={Styles.enterpriseselectServicesOptionCardMain}>
                  {enterpriseServiceType?.map((item, key) => (
                    <div
                      key={key}
                      className={`${
                        Styles.enterpriseselectServicesOptionCard
                      } ${
                        selectedServiceType?.id === item?.id
                          ? Styles.selected
                          : ""
                      }`}
                      onClick={() => handleServiceTypeClick(item)}
                    >
                      <FontAwesomeIcon
                        className={Styles.enterpriseSelectServiceTypeCricle}
                        icon={
                          selectedServiceType?.id === item?.id
                            ? faCircleDot
                            : faCircle
                        }
                      />
                      <p className={Styles.enterpriseSelectServiceTypeText}>
                        {item?.service_type}
                      </p>
                    </div>
                  ))}
                </div>

                <h4 className={Styles.enterpriseNewScheduleSelectType}>
                  {t("select_vehicle_type")}
                </h4>
                <div className={Styles.enterpriseSelectServiceVehicleCardMain}>
                  <div className="row">
                    {vehicleTypeList.map((vehicle, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className={`${
                            Styles.enterpriseSelectServiceVehicleCard
                          } ${
                            selectedVehicle === vehicle.id
                              ? Styles.selected
                              : ""
                          } mt-2`}
                          onClick={
                            selectedServiceType?.id !== 3 &&
                            selectedServiceType?.id !== 4
                              ? () => vehicleHandler(vehicle.id)
                              : undefined
                          }
                        >
                          <div
                            className={Styles.infoIconMainCard}
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(vehicle);
                            }}
                          >
                            <img
                              className={Styles.homePickupInfo}
                              src={Info}
                              alt="info-Icon"
                            />
                          </div>
                          <FontAwesomeIcon
                            className={Styles.enterpriseSelectVehicleCircleIcon}
                            icon={
                              selectedVehicle === vehicle.id
                                ? faCircleDot
                                : faCircle
                            }
                          />
                          <p
                            className={
                              Styles.enterpriseSelectServiceVehicleName
                            }
                          >
                            {vehicle.vehicle_type}
                          </p>
                          {selectedVehicle == vehicle.id && (
                            <p
                              className={`${Styles.enterpriseSelectServicePrices} ${Styles.textColor}`}
                            >
                              €{amount}/Hrs
                            </p>
                          )}

                          <img
                            className={Styles.enterpriseVehilces}
                            src={getImage(vehicle)}
                            alt={vehicle.vehicle_type}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={Styles.enterpriseSelectServiceNextBtnCard}>
                  <div
                    onClick={continueHanger}
                    className={Styles.enterpriseSelectServiceNextBtn}
                    style={{ cursor: "pointer" }}
                  >
                    {t("next")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PickupVehicleDimensionsModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          vehicle={vehicleDetail}
        />
        <ToastContainer />
      </section>
    </>
  );
};

export default EnterpriseCreateShiftSelectServiceType;
