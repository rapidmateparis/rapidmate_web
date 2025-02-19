import React, { memo, useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faFilter,
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocations, searchOrderApi } from "../../data_manager/dataManage";
import CommonHeader from "../../common/CommonHeader";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import NoDataImage from "../../assets/images/NoOrder.png";
import Package from "../../assets/images/Package.png";
import Calender from "../../assets/images/Calender-withBg.png";
import {
  buildAddress,
  formatDate,
  localToUTC,
  titleFormat,
} from "../../utils/Constants";
import moment from "moment";
import EnterpriseOrderFilterModal from "./common/EnterpriseOrderFilterModal";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";

const OneTime = memo(({ orders, locations, vehicles, navigation, t }) => {
  const getLocationAddress = (locationId) => {
    let result = locations?.filter((location) => location.id == locationId);
    return buildAddress(
      result[0]?.address,
      result[0]?.city,
      result[0]?.state,
      result[0]?.country,
      result[0]?.postal_code
    );
  };

  const getVehicleType = (vehicleId) => {
    let result = vehicles?.filter((vehicle) => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };
  const detailHandler = (order_number) => {
    navigation("/enterprise/order-detail", {
      state: {
        order: order_number,
        tabId: 1,
      },
    });
  };
  return (
    <section id="content1">
      <div className="row">
        <div className="col-md-12">
          {orders && orders?.length > 0 ? (
            orders.map((item, index) => (
              <div key={index}>
                <div className={Styles.pickuphistoryMainCard}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => detailHandler(item.order_number)}
                  >
                    <div className={Styles.pickupHistoryPackageCard}>
                      <img
                        className={Styles.pickupHistoryPackageIcon}
                        src={Package}
                        alt="icon"
                      />
                      <h4 className={Styles.pickupHistoryDeliveredText}>
                        {item?.consumer_order_title}{" "}
                        {item?.is_show_datetime_in_title == 1
                          ? item?.order_status === "ORDER_PLACED"
                            ? titleFormat(
                                item?.schedule_date_time || item?.order_date
                              )
                            : titleFormat(item?.updated_on)
                          : ""}
                      </h4>
                    </div>

                    <div className={Styles.pickupHistoryLocationCard}>
                      <div className={Styles.pickupHistoryFromLocaCard}>
                        <FontAwesomeIcon
                          className={Styles.pickupHistoryLocIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.pickupHistoryFromLoc}>
                          {" "}
                          {t("from")}:{" "}
                          <b>{getLocationAddress(item.pickup_location)}</b>
                        </p>
                      </div>

                      <div className={Styles.pickupHistoryShowOff} />

                      <div className={Styles.pickupHistoryFromLocaCard}>
                        <FontAwesomeIcon
                          className={Styles.pickupHistoryLocIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.pickupHistoryFromLoc}>
                          {t("to")}:{" "}
                          <b>{getLocationAddress(item.dropoff_location)}</b>
                        </p>
                      </div>
                    </div>

                    <div className={Styles.oneTimeVehicleCard}>
                      <p className={Styles.onleTimeVehicleNameText}>
                        {getVehicleType(item.vehicle_type_id)}
                      </p>
                      <div>
                        <p className={Styles.oneTimeActiveText}>Active</p>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.pickupHistoryOrderMoneyCard}>
                    <p className={Styles.pickupHistoryOrderId}>
                      {t("order_id")}: <span>{item.order_number}</span>
                    </p>
                    <h4 className={Styles.pickupHistoryMoneyText}>
                      €{item.amount ? item.amount.toFixed(2) : "0.00"}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={Styles.pickupHistoryNoDataMainCard}>
              <div className={Styles.pickupHistoryNoDataCard}>
                <img
                  className={Styles.pickupHistoryNodataImage}
                  src={NoDataImage}
                  alt="No-Data"
                />
              </div>
              <div>
                <h4 className={Styles.pickupHistoryNoDatatext}>
                  {t("no_orders_to_show")}
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  {t("active_order_message")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

const MultipleTimeOrder = memo(
  ({ orders, locations, vehicles, navigation, t }) => {
    const [searchText, setSearchText] = useState("");
    const [index, setIndex] = useState(0);
    const getLocationAddress = (locationId) => {
      let result = locations?.filter((location) => location.id == locationId);
      return buildAddress(
        result[0]?.address,
        result[0]?.city,
        result[0]?.state,
        result[0]?.country,
        result[0]?.postal_code
      );
    };

    const getVehicleType = (vehicleId) => {
      let result = vehicles?.filter((vehicle) => vehicle.id == vehicleId);
      return result[0]?.vehicle_type;
    };
    const detailHandler = (order_number) => {
      navigation("/enterprise/order-detail", {
        state: {
          order: order_number,
          tabId: 2,
        },
      });
    };
    return (
      <section id="content2">
        <div className="row">
          <div className="col-md-12">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <div key={index}>
                  <div className={Styles.pickuphistoryMainCard}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => detailHandler(item.order_number)}
                    >
                      <div className={Styles.pickupHistoryPackageCard}>
                        <img
                          className={Styles.pickupHistoryPackageIcon}
                          src={Package}
                          alt="icon"
                        />
                        <h4 className={Styles.pickupHistoryDeliveredText}>
                          {/* {item.consumer_order_title} */}
                          {item?.consumer_order_title}{" "}
                          {item?.is_show_datetime_in_title == 1
                            ? item?.order_status === "ORDER_PLACED"
                              ? titleFormat(
                                  item?.schedule_date_time || item?.order_date
                                )
                              : titleFormat(item?.updated_on)
                            : ""}
                        </h4>
                      </div>
                      <div>
                        <div
                          className={Styles.pickupHistoryMultipleLocationCard}
                        >
                          <FontAwesomeIcon
                            className={Styles.pickupHistoryLocIcon}
                            icon={faLocationDot}
                          />
                          <p className={Styles.pickupHistoryFromLoc}>
                            {" "}
                            {t("from")}:{" "}
                            <b>{getLocationAddress(item.pickup_location)}</b>
                          </p>
                        </div>

                        {item?.locations &&
                          item?.locations?.length > 0 &&
                          item.locations?.map((location, index) => (
                            <div
                              className={
                                Styles.pickupHistoryMultipleLocationCard
                              }
                            >
                              <FontAwesomeIcon
                                className={Styles.pickupHistoryLocIcon}
                                icon={faLocationCrosshairs}
                              />
                              <p
                                className={Styles.pickupHistoryFromLoc}
                                key={index}
                              >
                                {t("to")}:{" "}
                                <b>
                                  {getLocationAddress(
                                    location.dropoff_location
                                  )}
                                </b>
                              </p>
                            </div>
                          ))}
                      </div>
                      <div className={Styles.oneTimeVehicleCard}>
                        <p className={Styles.onleTimeVehicleNameText}>
                          {getVehicleType(item.vehicle_type_id)}
                        </p>
                        <div>
                          <p className={Styles.oneTimeActiveText}>Active</p>
                        </div>
                      </div>
                    </div>

                    <div className={Styles.pickupHistoryBorderBottomShow} />

                    <div className={Styles.pickupHistoryOrderMoneyCard}>
                      <p className={Styles.pickupHistoryOrderId}>
                        {t("order_id")}: <span>{item.order_number}</span>
                      </p>
                      <h4 className={Styles.pickupHistoryMoneyText}>
                        €{item.amount ? item.amount.toFixed(2) : "0.00"}
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={Styles.pickupHistoryNoDataMainCard}>
                <div className={Styles.pickupHistoryNoDataCard}>
                  <img
                    className={Styles.pickupHistoryNodataImage}
                    src={NoDataImage}
                    alt="No-Data"
                  />
                </div>
                <div>
                  <h4 className={Styles.pickupHistoryNoDatatext}>
                    {t("no_orders_to_show")}
                  </h4>
                  <p className={Styles.pickupHistoryNodataSubText}>
                    {t("active_order_message")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

const ShiftOrder = memo(({ orders, branches, vehicles, navigation, t }) => {
  const getBranchAddress = (branchId) => {
    let result = branches?.filter((branch) => branch.branch_id == branchId);
    if (result?.length > 0) {
      return buildAddress(
        result[0]?.address,
        result[0]?.city,
        result[0]?.state,
        result[0]?.country,
        result[0]?.postal_code
      );
    }
    return null;
  };

  const getVehicleType = (vehicleId) => {
    let result = vehicles?.filter((vehicle) => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  const detailShiftHandler = (orders) => {
    navigation("/enterprise/shift-details", {
      state: {
        order: orders,
        branches: branches,
        tabId: 3,
      },
    });
  };

  return (
    <section id="content3">
      <div className="row">
        <div className="col-md-12">
          {orders.length > 0 ? (
            orders.map((item, index) => (
              <div
                key={index}
                onClick={() => detailShiftHandler(item)}
                style={{ cursor: "pointer" }}
              >
                <div className={Styles.pickuphistoryMainCard}>
                  <div className={Styles.shiftOrderHeaderMainCard}>
                    <div className={Styles.pickupHistoryPackageCard}>
                      <img
                        className={Styles.pickupHistoryPackageIcon}
                        src={Calender}
                        alt="icon"
                      />
                      <h4 className={Styles.pickupHistoryDeliveredText}>
                        {moment(formatDate(item.shift_from_date).date).format(
                          "DD-MM-YYYY"
                        )}
                        {t("to")}
                        {moment(formatDate(item.shift_tp_date).date).format(
                          "DD-MM-YYYY"
                        )}
                      </h4>
                    </div>
                    <p className={Styles.shiftOrderhoursText}>
                      {" "}
                      <b>
                        {" "}
                        {item?.slots
                          ?.reduce(
                            (sum, slot) => sum + (slot.total_hours || 0),
                            0
                          )
                          .toFixed(2)}{" "}
                        {t("hours_shift")}
                      </b>
                    </p>
                  </div>

                  <div>
                    <div className={Styles.pickupHistoryFromLocaCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryLocIcon}
                        icon={faLocationDot}
                      />
                      <p className={Styles.pickupHistoryFromLoc}>
                        <b>{getBranchAddress(item.branch_id)}</b>
                      </p>
                    </div>
                  </div>

                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.oneTimeVehicleCard}>
                    <p className={Styles.onleTimeVehicleNameText}>
                     {t("order_id")} : {item?.order_number} {/* {getVehicleType(item.vehicle_type_id)} */}
                    </p>
                    <div>
                      <p className={Styles.oneTimePendingText}>
                        {item?.order_status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={Styles.pickupHistoryNoDataMainCard}>
              <div className={Styles.pickupHistoryNoDataCard}>
                <img
                  className={Styles.pickupHistoryNodataImage}
                  src={NoDataImage}
                  alt="No-Data"
                />
              </div>
              <div>
                <h4 className={Styles.pickupHistoryNoDatatext}>
                  {t("no_orders_to_show")}
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  {t("active_order_message")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

const PastOrder = memo(
  ({ orders, locations, vehicles, navigation, branches, t }) => {
    const getLocationAddress = (locationId) => {
      let result = locations?.filter((location) => location.id == locationId);
      return buildAddress(
        result[0]?.address,
        result[0]?.city,
        result[0]?.state,
        result[0]?.country,
        result[0]?.postal_code
      );
    };

    const getBranchAddress = (branchId) => {
      let result = branches?.filter((branch) => branch.branch_id == branchId);
      if (result?.length > 0) {
        return buildAddress(
          result[0]?.address,
          result[0]?.city,
          result[0]?.state,
          result[0]?.country,
          result[0]?.postal_code
        );
      }
      return null;
    };

    const getVehicleType = (vehicleId) => {
      let result = vehicles?.filter((vehicle) => vehicle.id == vehicleId);
      return result[0]?.vehicle_type;
    };
    const detailHandler = (order_number, deliveryTypeId, order) => {
      if (deliveryTypeId == 3) {
        navigation("/enterprise/shift-details", {
          state: {
            order,
            branches: branches,
            tabId: 4,
          },
        });
      } else {
        navigation("/enterprise/order-detail", {
          state: {
            order: order_number,
            tabId: 4,
          },
        });
      }
    };

    return (
      <section id="content4">
        <div className="row">
          <div className="col-md-12">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <div key={index}>
                  {item?.delivery_type_id == 3 ? (
                    <div className={Styles.pickuphistoryMainCard}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          detailHandler(
                            item.order_number,
                            item?.delivery_type_id,
                            item
                          )
                        }
                      >
                        <div className={Styles.shiftOrderHeaderMainCard}>
                          <div className={Styles.pickupHistoryPackageCard}>
                            <img
                              className={Styles.pickupHistoryPackageIcon}
                              src={Calender}
                              alt="icon"
                            />
                            <h4 className={Styles.pickupHistoryDeliveredText}>
                              {moment(
                                formatDate(item.shift_from_date).date
                              ).format("DD-MM-YYYY")}
                              {" To "}
                              {moment(
                                formatDate(item.shift_tp_date).date
                              ).format("DD-MM-YYYY")}
                            </h4>
                          </div>
                          <p className={Styles.shiftOrderhoursText}>
                            {" "}
                            <b>
                              {" "}
                              {item?.slots
                                ?.reduce(
                                  (sum, slot) => sum + (slot.total_hours || 0),
                                  0
                                )
                                .toFixed(2)}{" "}
                              {t("hours_shift")}
                            </b>
                          </p>
                        </div>

                        <div>
                          <div className={Styles.pickupHistoryFromLocaCard}>
                            <FontAwesomeIcon
                              className={Styles.pickupHistoryLocIcon}
                              icon={faLocationDot}
                            />
                            <p className={Styles.pickupHistoryFromLoc}>
                              <b>{getBranchAddress(item.branch_id)}</b>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.pickupHistoryBorderBottomShow} />

                      <div className={Styles.oneTimeVehicleCard}>
                        <p className={Styles.onleTimeVehicleNameText}>
                          {t("order_id")} : {item?.order_number}{/* {getVehicleType(item.vehicle_type_id)} */}
                        </p>
                        <div>
                          <p className={Styles.oneTimePendingText}>
                            {item?.order_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={Styles.pickuphistoryMainCard}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          detailHandler(
                            item.order_number,
                            item?.delivery_type_id,
                            item
                          )
                        }
                      >
                        <div className={Styles.pickupHistoryPackageCard}>
                          <img
                            className={Styles.pickupHistoryPackageIcon}
                            src={Package}
                            alt="icon"
                          />
                          <h4 className={Styles.pickupHistoryDeliveredText}>
                            {item?.consumer_order_title}{" "}
                            {item?.is_show_datetime_in_title == 1
                              ? item?.order_status === "ORDER_PLACED"
                                ? titleFormat(
                                    item?.schedule_date_time || item?.order_date
                                  )
                                : titleFormat(item?.updated_on)
                              : ""}
                          </h4>
                        </div>

                        <div className={Styles.pickupHistoryLocationCard}>
                          <div className={Styles.pickupHistoryFromLocaCard}>
                            <FontAwesomeIcon
                              className={Styles.pickupHistoryLocIcon}
                              icon={faLocationDot}
                            />
                            <p className={Styles.pickupHistoryFromLoc}>
                              {" "}
                              {t("from")}:{" "}
                              <b>{getLocationAddress(item.pickup_location)}</b>
                            </p>
                          </div>

                          <div className={Styles.pickupHistoryShowOff} />

                          {item?.delivery_type_id ===2 ? (
                            item?.locations &&
                              item?.locations?.length > 0 &&
                              item.locations?.map((location, index) => (
                                <div
                                  className={
                                    Styles.pickupHistoryMultipleLocationCard
                                  }
                                >
                                  <FontAwesomeIcon
                                    className={Styles.pickupHistoryLocIcon}
                                    icon={faLocationCrosshairs}
                                  />
                                  <p
                                    className={Styles.pickupHistoryFromLoc}
                                    key={index}
                                  >
                                    {t("to")}:{" "}
                                    <b>
                                      {getLocationAddress(
                                        location.dropoff_location
                                      )}
                                    </b>
                                  </p>
                                </div>
                              ))
                          ) : (
                            <div className={Styles.pickupHistoryFromLocaCard}>
                            <FontAwesomeIcon
                              className={Styles.pickupHistoryLocIcon}
                              icon={faLocationCrosshairs}
                            />
                            <p className={Styles.pickupHistoryFromLoc}>
                              {t("to")}:{" "}
                              <b>{getLocationAddress(item.dropoff_location)}</b>
                            </p>
                          </div>
                          ) }
                          
                        </div>
                        <p className={Styles.pickupHistoryPastVehicleText}>
                          {getVehicleType(item.vehicle_type_id)}
                        </p>
                      </div>

                      <div className={Styles.pickupHistoryBorderBottomShow} />

                      <div className={Styles.pickupHistoryOrderMoneyCard}>
                        <p className={Styles.pickupHistoryOrderId}>
                          {t("order_id")}: <span>{item.order_number}</span>
                        </p>
                        <h4 className={Styles.pickupHistoryMoneyText}>
                          €{item.amount ? item.amount.toFixed(2) : "0.00"}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={Styles.pickupHistoryNoDataMainCard}>
                <div className={Styles.pickupHistoryNoDataCard}>
                  <img
                    className={Styles.pickupHistoryNodataImage}
                    src={NoDataImage}
                    alt="No-Data"
                  />
                </div>
                <div>
                  <h4 className={Styles.pickupHistoryNoDatatext}>
                    {t("no_orders_to_show")}
                  </h4>
                  <p className={Styles.pickupHistoryNodataSubText}>
                    {t("active_order_message")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const { branches } = useSelector((state) => state.enterprise);
  const { vehicleType } = useSelector((state) => state.commonData.commonData);
  const navigation = useNavigate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paramList, setParamList] = useState({ tab_id: 1 });
  const [enterpriseOrderList, setEnterpriseOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { tabId } = location.state || {};
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    getLocationsData();
  }, []);

  const getLocationsData = () => {
    setLoading(true);
    setLocationList([]);
    getLocations(
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
        setLoading(false);
      },
      (errorResponse) => {
        setLoading(false);
        if (errorResponse[0]._errors.message) {
          setLocationList([]);
        }
      }
    );
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(event.target.value);
    if (value.trim().length === 0) {
      const params = {
        order_number: value,
        tab_id: paramList?.tab_id,
      };
      searchFunction(params);
      return;
    }
    searchFunction({ tab_id: paramList?.tab_id });
  };

  const handleTabChange = (event) => {
    const newTab = event.target.id;
    setSelectedTab(newTab);
    let params = {};
    if (newTab === "tab1") {
      params = { tab_id: 1 };
    } else if (newTab === "tab2") {
      params = { tab_id: 2 };
    } else if (newTab === "tab3") {
      params = { tab_id: 3 };
    } else if (newTab === "tab4") {
      params = { tab_id: 4 };
    }

    setParamList(params);
  };

  const searchFunction = (params) => {
    params.enterprise_ext_id = user.userDetails.ext_id;
    setLoading(true);
    searchOrderApi(
      params,
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (params.tab_id == 3) {
            setEnterpriseOrderList(
              successResponse[0]._response.filter(
                (item) => item.slots.length > 0
              )
            );
          } else {
            setEnterpriseOrderList(successResponse[0]._response);
          }
        }
      },
      (errorResponse) => {
        setLoading(false);
        setEnterpriseOrderList([]);
        // showErrorToast(errorResponse[0]._errors.message);
      }
    );
  };

  useEffect(() => {
    searchFunction(paramList);
  }, [selectedTab]);
  useEffect(() => {
    if (location.state) {
      setParamList({ tab_id: tabId });
      setSelectedTab("tab" + tabId);
    }
  }, [location.state]);

  const onFilterSelected = (date) => {
    let params = {
      tab_id: paramList?.tab_id,
      from_date: moment(localToUTC(date.fromDate)).format("YYYY-MM-DD"),
      to_date: moment(localToUTC(date.toDate)).format("YYYY-MM-DD"),
    };
    searchFunction(params);
    setShowModal(false);
  };
  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.pickupHistorySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.max75}>
                <div className={Styles.pickupHistoryHeaderCard}>
                  <div className={Styles.pickupHistoryTitleHeaderCard}>
                    <Link to="#" onClick={goBack}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryBackspaceButton}
                        icon={faArrowLeft}
                      />
                    </Link>
                    <h4 className={Styles.pickupHistoryHeaderTitle}>
                      {t("order_history")}
                    </h4>
                  </div>
                  <div className={Styles.pickupHistorySearchFillterCard}>
                    <div className={Styles.pickupHistorySearchCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistorySearchIcon}
                        icon={faMagnifyingGlass}
                      />
                      <input
                        className={Styles.pickupHistorySearchInput}
                        type="text"
                        placeholder={t("search_your_deliveries")}
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      onClick={handleOpenModal}
                      className={Styles.pickupHistoryFillterIcon}
                    >
                      <FontAwesomeIcon icon={faFilter} />
                    </button>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="tabs">
                  <input
                    type="radio"
                    id="tab1"
                    name="tab-control"
                    checked={selectedTab === "tab1"}
                    onChange={handleTabChange}
                  />
                  <input
                    type="radio"
                    id="tab2"
                    name="tab-control"
                    checked={selectedTab === "tab2"}
                    onChange={handleTabChange}
                  />
                  <input
                    type="radio"
                    id="tab3"
                    name="tab-control"
                    checked={selectedTab === "tab3"}
                    onChange={handleTabChange}
                  />
                  <input
                    type="radio"
                    id="tab4"
                    name="tab-control"
                    checked={selectedTab === "tab4"}
                    onChange={handleTabChange}
                  />
                  <ul>
                    <li
                      title="One time order"
                      className={`${selectedTab == "tab1" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab1" role="button" className="tab-label">
                        <span>{t("oneTime")}</span>
                      </label>
                    </li>
                    <li
                      title="Multiple order "
                      className={`${selectedTab == "tab2" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab2" role="button" className="tab-label">
                        <span>{t("multiples")}</span>
                      </label>
                    </li>
                    <li
                      title="Shift order "
                      className={`${selectedTab == "tab3" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab3" role="button" className="tab-label">
                        <span>{t("shifts")}</span>
                      </label>
                    </li>
                    <li
                      title="Past order "
                      className={`${selectedTab == "tab4" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab4" role="button" className="tab-label">
                        <span>{t("past")}</span>
                      </label>
                    </li>
                  </ul>
                  {loading ? (
                    <div className="text-center mt-5">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="content">
                      {selectedTab === "tab1" && (
                        <OneTime
                          orders={enterpriseOrderList}
                          locations={locationList}
                          vehicles={vehicleType}
                          navigation={navigation}
                          t={t}
                        />
                      )}
                      {selectedTab === "tab2" && (
                        <MultipleTimeOrder
                          orders={enterpriseOrderList}
                          locations={locationList}
                          vehicles={vehicleType}
                          navigation={navigation}
                          t={t}
                        />
                      )}
                      {selectedTab === "tab3" && (
                        <ShiftOrder
                          orders={enterpriseOrderList}
                          branches={branches}
                          vehicles={vehicleType}
                          navigation={navigation}
                          t={t}
                        />
                      )}
                      {selectedTab === "tab4" && (
                        <PastOrder
                          orders={enterpriseOrderList}
                          locations={locationList}
                          vehicles={vehicleType}
                          navigation={navigation}
                          branches={branches}
                          t={t}
                        />
                      )}
                      {showModal && (
                        <EnterpriseOrderFilterModal
                          handleClose={handleCloseModal} // Pass the close handler
                          onFilterSelected={onFilterSelected}
                        />
                      )}
                    </div>
                  )}
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

export default Order;
