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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocations, searchOrderApi } from "../../data_manager/dataManage";
import CommonHeader from "../../common/CommonHeader";
import { showErrorToast } from "../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import NoDataImage from "../../assets/images/NoOrder.png";
import Package from "../../assets/images/Package.png";
import Calender from "../../assets/images/Calender-withBg.png";
import { buildAddress, titleFormat } from "../../utils/Constants";
import moment from "moment";
import EnterpriseOrderFilterModal from "./common/EnterpriseOrderFilterModal";

const OneTime = memo(({ orders, locations, vehicles, navigation }) => {
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
      },
    });
  };
  return (
    <section id="content1">
      <div className="row">
        <div className="col-md-12">
          {orders && orders?.length > 0 ? (
            orders.map((item, index) => (
              <div key={index} onClick={() => detailHandler(item.order_number)}>
                <div className={Styles.pickuphistoryMainCard}>
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
                        From: <b>{getLocationAddress(item.pickup_location)}</b>
                      </p>
                    </div>

                    <div className={Styles.pickupHistoryShowOff} />

                    <div className={Styles.pickupHistoryFromLocaCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryLocIcon}
                        icon={faLocationCrosshairs}
                      />
                      <p className={Styles.pickupHistoryFromLoc}>
                        To: <b>{getLocationAddress(item.dropoff_location)}</b>
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

                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.pickupHistoryOrderMoneyCard}>
                    <p className={Styles.pickupHistoryOrderId}>
                      Order ID: <span>{item.order_number}</span>
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
                  No orders to show
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  If there is any active order, it will be shown here..
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
  ({ orders, locations, vehicles, navigation }) => {
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
        },
      });
    };
    return (
      <section id="content2">
        <div className="row">
          <div className="col-md-12">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <div
                  key={index}
                  onClick={() => detailHandler(item.order_number)}
                >
                  <div className={Styles.pickuphistoryMainCard}>
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
                      <div className={Styles.pickupHistoryMultipleLocationCard}>
                        <FontAwesomeIcon
                          className={Styles.pickupHistoryLocIcon}
                          icon={faLocationDot}
                        />
                        <p className={Styles.pickupHistoryFromLoc}>
                          {" "}
                          From:{" "}
                          <b>{getLocationAddress(item.pickup_location)}</b>
                        </p>
                      </div>

                      <div className={Styles.pickupHistoryMultipleLocationCard}>
                        <FontAwesomeIcon
                          className={Styles.pickupHistoryLocIcon}
                          icon={faLocationCrosshairs}
                        />
                        <p className={Styles.pickupHistoryFromLoc}>
                          To: <b>{getLocationAddress(item.dropoff_location)}</b>
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

                    <div className={Styles.pickupHistoryBorderBottomShow} />

                    <div className={Styles.pickupHistoryOrderMoneyCard}>
                      <p className={Styles.pickupHistoryOrderId}>
                        Order ID: <span>{item.order_number}</span>
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
                    No orders to show
                  </h4>
                  <p className={Styles.pickupHistoryNodataSubText}>
                    If there is any active order, it will be shown here..
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

const ShiftOrder = memo(({ orders, branches, vehicles, navigation }) => {
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

  const detailShiftHandler = (order_number) => {
    navigation("/enterprise/shift-details", {
      state: {
        order: order_number,
        branches: branches,
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
                onClick={() => detailShiftHandler(item.order_number)}
              >
                {console.log(item.order_number)}
                <div className={Styles.pickuphistoryMainCard}>
                  <div className={Styles.shiftOrderHeaderMainCard}>
                    <div className={Styles.pickupHistoryPackageCard}>
                      <img
                        className={Styles.pickupHistoryPackageIcon}
                        src={Calender}
                        alt="icon"
                      />
                      <h4 className={Styles.pickupHistoryDeliveredText}>
                        {item.slots[0] &&
                          moment(item.slots[0].from_time, "HH:mm:ss").format(
                            "hh A"
                          )}
                        {" to "}
                        {item.slots[0] &&
                          moment(item.slots[0].to_time, "HH:mm:ss").format(
                            "hh A"
                          )}
                      </h4>
                    </div>
                    <p className={Styles.shiftOrderhoursText}>
                      {" "}
                      <b>
                        {" "}
                        {item.slots[0] &&
                          moment(item.slots[0].to_time, "HH:mm:ss").diff(
                            moment(item.slots[0].from_time, "HH:mm:ss")
                          ) / 3600000}{" "}
                        hours shift
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
                      {getVehicleType(item.vehicle_type_id)}
                    </p>
                    <div>
                      <p className={Styles.oneTimePendingText}>
                        Pending approval
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
                  No orders to show
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  If there is any active order, it will be shown here..
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

const PastOrder = memo(({ orders, locations, vehicles, navigation }) => {
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
      },
    });
  };
  return (
    <section id="content4">
      <div className="row">
        <div className="col-md-12">
          {orders.length > 0 ? (
            orders.map((item, index) => (
              <div key={index} onClick={() => detailHandler(item.order_number)}>
                <div className={Styles.pickuphistoryMainCard}>
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
                        From: <b>{getLocationAddress(item.pickup_location)}</b>
                      </p>
                    </div>

                    <div className={Styles.pickupHistoryShowOff} />

                    <div className={Styles.pickupHistoryFromLocaCard}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryLocIcon}
                        icon={faLocationCrosshairs}
                      />
                      <p className={Styles.pickupHistoryFromLoc}>
                        To: <b>{getLocationAddress(item.dropoff_location)}</b>
                      </p>
                    </div>
                  </div>
                  <p className={Styles.pickupHistoryPastVehicleText}>
                    {getVehicleType(item.vehicle_type_id)}
                  </p>
                  <div className={Styles.pickupHistoryBorderBottomShow} />

                  <div className={Styles.pickupHistoryOrderMoneyCard}>
                    <p className={Styles.pickupHistoryOrderId}>
                      Order ID: <span>{item.order_number}</span>
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
                  No orders to show
                </h4>
                <p className={Styles.pickupHistoryNodataSubText}>
                  If there is any active order, it will be shown here..
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const { branches } = useSelector((state) => state.enterprise);
  const { vehicleType } = useSelector((state) => state.commonData.commonData);
  const navigation = useNavigate();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paramList, setParamList] = useState({ tab_id: 1 });
  const [enterpriseOrderList, setEnterpriseOrderList] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    setSearchTerm(event.target.value);
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
        showErrorToast(errorResponse[0]._errors.message);
      }
    );
  };

  useEffect(() => {
    searchFunction(paramList);
  }, [selectedTab]);
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
                    <h4 className={Styles.pickupHistoryHeaderTitle}>History</h4>
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
                        placeholder="Search your deliveries"
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
                        <span>One Time</span>
                      </label>
                    </li>
                    <li
                      title="Multiple order "
                      className={`${selectedTab == "tab2" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab2" role="button" className="tab-label">
                        <span>Multiples</span>
                      </label>
                    </li>
                    <li
                      title="Shift order "
                      className={`${selectedTab == "tab3" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab3" role="button" className="tab-label">
                        <span>Shifts</span>
                      </label>
                    </li>
                    <li
                      title="Past order "
                      className={`${selectedTab == "tab4" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab4" role="button" className="tab-label">
                        <span>Past</span>
                      </label>
                    </li>
                  </ul>
                  <div className="content">
                    {selectedTab === "tab1" && (
                      <OneTime
                        orders={enterpriseOrderList}
                        locations={locationList}
                        vehicles={vehicleType}
                        navigation={navigation}
                      />
                    )}
                    {selectedTab === "tab2" && (
                      <MultipleTimeOrder
                        orders={enterpriseOrderList}
                        locations={locationList}
                        vehicles={vehicleType}
                        navigation={navigation}
                      />
                    )}
                    {selectedTab === "tab3" && (
                      <ShiftOrder
                        orders={enterpriseOrderList}
                        branches={branches}
                        vehicles={vehicleType}
                        navigation={navigation}
                      />
                    )}
                    {selectedTab === "tab4" && (
                      <PastOrder
                        orders={enterpriseOrderList}
                        locations={locationList}
                        vehicles={vehicleType}
                        navigation={navigation}
                      />
                    )}
                    {showModal && (
                      <EnterpriseOrderFilterModal
                        handleClose={handleCloseModal} // Pass the close handler
                      />
                    )}
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

export default Order;
