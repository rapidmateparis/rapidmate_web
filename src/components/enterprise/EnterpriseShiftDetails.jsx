import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import SlotCss from "../../assets/css/shiftDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faGear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Home from "../../assets/images/home-icon.png";
import Driver from "../../assets/images/Driver-Image.jpeg";
import Calender from "../../assets/images/Calender-withBg.png";
import CommonHeader from "../../common/CommonHeader";
import MasterCard from "../../assets/images/MasterCard-Logo.png";
import OrderTag from "../../assets/images/OrderFare-Tag.png";
import Invoice from "../../assets/images/Invoice-Img.png";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getAVehicleByTypeId,
  getLocationById,
  getViewEnterpriseOrderDetail,
} from "../../data_manager/dataManage";
import { buildAddress, formatDate } from "../../utils/Constants";
import moment from "moment";
import DeliveryboyAssignedModal from "./common/DeliveryboyAssignedModal";

const EnterpriseShiftDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { vehicleType } = useSelector((state) => state.commonData.commonData);
  const location = useLocation();
  const { order, branches,tabId } = location.state || {}; // Adding fallback in case location.state is undefined or null.
  const [orders, setOrders] = useState({});
  const [viewType, setViewType] = useState("table");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  

  const getBranch = (branchId) => {
    let result = branches?.filter((branch) => branch.id == branchId);
    if (result == undefined) {
      return {
        branch_name: "not found",
        address: "not found",
      };
    } else {
      return {
        branch_name: result && result[0]?.branch_name,
        address: buildAddress(
          result[0]?.address,
          result[0]?.city,
          result[0]?.state,
          result[0]?.country,
          result[0]?.postal_code
        ),
      };
    }
  };

  const getVehicleType = (vehicleId) => {
    let result = vehicleType?.filter((vehicle) => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  const orderDetail = async () => {
    setOrders(order);
  };

  useEffect(() => {
    // If location.state is null or undefined, navigate back
    if (!location.state) {
      navigate("/enteprise/orders",{state:{tabId:tabId}}); // Go back to the previous page
    } else {
      orderDetail();
    }
  }, [location.state, order, navigate]); // Add location.state to dependencies

  const AssignDelivery = (slots) => {
    navigate("/enterprise/deliveryboy-shift-details", {
      state: {
        slot: slots,
        vehicle_type_id: orders?.vehicle_type_id,
        orderNumber: orders?.order_number,
        branchId: orders?.branch_id,
        branchAddress: getBranch(orders?.branch_id) || " ",
      },
    });
  };
  const goBack = () => {
    navigate("/enterprise/orders",{state:{tabId:tabId}}); // Navigate back to the previous page
  };
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.pickupHistorySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className={Styles.enterpriseShiftDetailsHeaderCard}>
                  
                  <div className={`${Styles.pickupHistoryHeaderTitle} d-flex `}>
                    <div  onClick={goBack} style={{cursor:"pointer"}}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryBackspaceButton}
                        icon={faArrowLeft}
                      />
                    </div>
                    {t("shift_details")} 
                  </div>
                  <Link>
                    <FontAwesomeIcon
                      className={Styles.enterpriseShiftDetailGearIcon}
                      icon={faGear}
                    />
                  </Link>
                </div>
                <div className={Styles.enterpriseShiftDetailCompanyDetailCard}>
                  <div className={Styles.enterpriseShiftDetailHomeIconCard}>
                    <img
                      className={Styles.enterpriseShiftDetailHomeIcon}
                      src={Home}
                      alt="homeIcon"
                    />
                    <h4 className={Styles.enterpriseShiftDetailCompanyName}>
                      {getBranch(order?.branch_id)?.branch_name}
                    </h4>
                  </div>
                  <div className={Styles.enterpriseShiftDetailAddresCard}>
                    <FontAwesomeIcon
                      className={Styles.enterpriseShiftDetailLocDotIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.enterpriseShiftDetailAddressText}>
                      {getBranch(order?.branch_id)?.address}
                    </p>
                  </div>
                </div>

                <div className={Styles.enterpriseShiftDetailCalenderCardMain}>
                  <div className={Styles.enterpriseShiftDetailCalenderCard}>
                    <img
                      className={Styles.enterpriseShiftDetailCalenderImg}
                      src={Calender}
                      alt="calender-icon"
                    />
                    <p className={Styles.enterpriseShiftDetailStarteddatetime}>
                      {t("started")} {moment(formatDate(orders.shift_from_date).date).format(
                                  "DD-MM-YYYY"
                                )} To{" "}
                      {moment(formatDate(orders.shift_tp_date).date).format(
                                  "DD-MM-YYYY"
                                )}
                    </p>
                  </div>
                  <div
                    className={Styles.enterpriseShiftDetailShiftDurationCard}
                  >
                    <p
                      className={Styles.enterpriseShiftDetailShiftDurationText}
                    >
                      {t("total_duration")} :{" "}
                      <b>
                      {order?.slots?.reduce((sum, slot) => sum + (slot.total_hours || 0), 0).toFixed(2)}{" "}
                        {t("hours")}
                      </b>
                    </p>
                    <p
                      className={Styles.enterpriseShiftDetailShiftDurationText}
                    >
                      {t("total_days")}: <b>{orders?.slots?.length || 0}</b>
                    </p>
                  </div>
                  <p className={Styles.enterpriseShiftDetailVehiclenameType}>
                    {getVehicleType(orders?.vehicle_type_id)}
                  </p>
                </div>
                {/* Slot Details */}
                <div>
                  {/* <h3 className={SlotCss.slotsContainer}>Slots</h3> */}
                  {/* <div className={SlotCss.viewToggle}>
                    <button
                      className={
                        viewType === "table" ? SlotCss.activeButton : ""
                      }
                      onClick={() => setViewType("table")}
                    >
                      Table View
                    </button>
                    <button
                      className={
                        viewType === "grid" ? SlotCss.activeButton : ""
                      }
                      onClick={() => setViewType("grid")}
                    >
                      Grid View
                    </button>
                  </div> */}
                  {viewType === "grid" ? (
                    <div className={SlotCss.slotsGrid}>
                      {order?.slots?.map((slot, index) => (
                        <div
                          key={slot.id}
                          className={SlotCss.slotCard}
                          onClick={() => AssignDelivery(slot)}
                        >
                          <div className={SlotCss.slotHeader}>
                            <h4>{slot.day}</h4>
                            <p>
                              {moment(formatDate(slot.slot_date).date).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                          </div>
                          <div className={SlotCss.slotBody}>
                            <p>
                              <strong>{t("times")}:</strong> {slot.from_time} -{" "}
                              {slot.to_time}
                            </p>
                            <p>
                              <strong>{t("total_hours")}:</strong>{" "}
                              {slot.total_hours
                                ? `${slot.total_hours} hrs`
                                : "N/A"}
                            </p>
                            <p>
                              <strong>{t("order_status")}:</strong>{" "}
                              <span
                                className={
                                  slot.order_status === "ORDER_PLACED"
                                    ? SlotCss.statusPlaced
                                    : slot.order_status === "ORDER_IN_PROGRESS"
                                    ? SlotCss.statusInProgress
                                    : slot.order_status === "COMPLETED"
                                    ? SlotCss.statusCompleted
                                    : SlotCss.statusError
                                }
                              >
                                {slot.order_status}
                              </span>
                            </p>
                            <p>
                              <strong>{t("next_action")}:</strong>{" "}
                              {slot.next_action_status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Table bordered hover responsive>
                        <thead className="table-success">
                          <tr>
                            <th>#</th>
                            <th>{t("date")}</th>
                            <th>{t("day")}</th>
                            <th>{t("fromDate")}</th>
                            <th>{t("toDate")}</th>
                            <th>{t("hours")}</th>
                            <th>{t("delivery_boy")}</th>
                            <th>{t("status")}</th>
                            <th>{t("next_status")}</th>
                            <th>{t("Actions")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.slots?.map((slot, index) => (
                            <tr key={slot.id}>
                              <td>{index + 1}</td>
                              <td>
                                {moment(formatDate(slot.slot_date).date).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>{slot.day}</td>
                              <td>{slot.from_time}</td>
                              <td>{slot.to_time}</td>
                              <td>
                                {slot.total_hours
                                  ? `${slot.total_hours?.toFixed(2)} hrs`
                                  : "N/A"}{" "}
                              </td>
                              <td>
                                {slot?.ext_id ? (
                                  <div
                                    className={
                                      Styles.enterpriseShiftDetailDriverCard
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShowModal}
                                  >
                                    <img
                                      className={
                                        Styles.enterpriseShiftDetailDriverImg
                                      }
                                      src={Driver}
                                      alt="img"
                                    />
                                    <div>
                                      <h4
                                        className={
                                          Styles.enterpriseShiftDetailDriverName
                                        }
                                      >
                                        {slot?.first_name +
                                          " " +
                                          slot?.last_name}
                                      </h4>
                                      <p
                                        className={
                                          Styles.enterpriseShiftDetailDrivertruckDetails
                                        }
                                      >
                                        {getVehicleType(
                                          orders?.vehicle_type_id
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  t("not_assign")
                                )}
                              </td>
                              <td>
                                <span
                                  className={
                                    slot.order_status === "ORDER_PLACED"
                                      ? "badge bg-warning text-dark"
                                      : slot.order_status ===
                                        "ORDER_IN_PROGRESS"
                                      ? "badge bg-info text-dark"
                                      : slot.order_status === "COMPLETED"
                                      ? "badge bg-success text-dark"
                                      : "badge bg-danger text-dark"
                                  }
                                >
                                  {slot.order_status}
                                </span>
                              </td>
                              <td>{slot.next_action_status}</td>
                              <td>
                                {slot?.ext_id ? (
                                  <Button
                                    onClick={() => AssignDelivery(slot)}
                                    variant="outline-primary"
                                    className={SlotCss.customAssignButton}
                                  >
                                    {t("assign_deliveries")}
                                  </Button>
                                ) : (
                                  <span
                                    className={"badge bg-warning text-dark"}
                                  >
                                    {t("waiting_for_deliveryboy")}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeliveryboyAssignedModal
        show={showModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default EnterpriseShiftDetails;
