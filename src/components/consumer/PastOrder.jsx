import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import RenderItem from "./common/RenderItem";
import {
  getConsumerViewOrdersList,
  getConsumerViewOrdersListBySearch,
  getLocations,
} from "../../data_manager/dataManage";
import { getOrderList } from "../../utils/getOrderList";
import { useSelector } from "react-redux";
import Spinners from "../../common/Loader";
import { useTranslation } from "react-i18next";

const PastOrder = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [orderList, setOrderList] = useState([]);
  const [pastOrderList, setPastOrderList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const location = useLocation();
  const { tabId } = location.state || {};
  const [tabValue, setTabValue] = useState(1);
  const [isLoad,setIsLoad]=useState(true)
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getLocationsData();
    getOrder("current");
  }, []);

  const getOrder = async (status) => {
  
    const userExtId = user.userDetails.ext_id;
    let postParams = {
      extentedId: userExtId,
      status: status,
      page: page,
      size: size,
    };
    setLoading(true)
    getConsumerViewOrdersList(
      postParams,
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          if(size === successResponse[0]?._response.length){
            setIsLoad(true)
          }else if (size > successResponse[0]._response.length) {
            setIsLoad(false);
          }
          if (status === "past") {
            setPastOrderList(tempOrderList);
          } else {
            setOrderList(tempOrderList);
          }
        } else {
          if (status === "past") {
            setPastOrderList([]);
          } else {
            setOrderList([]);
          }
        }
        setLoading(false)
      },
      (errorResponse) => {
        if (status === "past") {
          setPastOrderList([]);
        } else {
          setOrderList([]);
        }
        setLoading(false)
      }
    );
  };

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
    setSearchTerm(value);
    if (value.trim().length === 0) {
      // If the search term is empty, fetch the original lists
      selectedTab === "tab1" && getOrder("current");
      selectedTab === "tab2" && getOrder("past");
      return;
    }
    setLoading(true);
    try {
      getOrderListinSearch(value, selectedTab === "tab1" ? "current" : "past");
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event) => {
    const tabId = event.target.id;
    if (tabId == "tab1") {
      setTabValue(1);
      getOrder("current")
    } else {
      setTabValue(2);
      getOrder("past")
    }
    setSelectedTab(event.target.id);
  };

  const getOrderListinSearch = (searchValue, status) => {
    let postParams = {
      extentedId: user.userDetails.ext_id,
      status,
      orderNumber: searchValue,
    };
    getConsumerViewOrdersListBySearch(
      postParams,
      (successResponse) => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          if (status == "past") {
            setPastOrderList(tempOrderList);
          } else {
            setOrderList(tempOrderList);
          }
        }
      },
      (errorResponse) => {
        if (status == "past") {
          setPastOrderList([]);
        } else {
          setOrderList([]);
        }
      }
    );
  };

  useEffect(() => {
    if (location.state) {
      if (tabId) {
        setTabValue(tabId);
        setSelectedTab("tab" + tabId);
        if(tabId==1){
          getOrder("current")
        }else{
           getOrder("past")
        }
      }
    }
  }, [location.state]);

  const loadMore = () => {
    setSize(size+10)
    if(selectedTab === "tab1"){
      getOrder("current")
    }else{
      getOrder("past")
    }
  }
  return (
    <>
      {/* Header Start Here  */}
      <CommonHeader userData={user} />
      {/* Header End Here  */}
      <section className={Styles.pickupHistorySec}>
        {loading && <Spinners />}
        <div className="container">
          <div className="row">
            <div className={Styles.max75}>
              <div>
                <div className={Styles.pickupHistoryHeaderCard}>
                  <div className={Styles.pickupHistoryTitleHeaderCard}>
                    <div onClick={goBack} style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon
                        className={Styles.pickupHistoryBackspaceButton}
                        icon={faArrowLeft}
                      />
                    </div>
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
                    {/* <button className={Styles.pickupHistoryFillterIcon}>
                      <FontAwesomeIcon icon={faFilter} />
                    </button> */}
                  </div>
                </div>

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
                  <ul>
                    <li
                      title="Ongoing order"
                      className={`${selectedTab == "tab1" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab1" role="button" className="tab-label">
                        <span>{t("ongoing")}</span>
                      </label>
                    </li>
                    <li
                      title="Past order "
                      className={`${selectedTab == "tab2" ? "activetab" : ""}`}
                    >
                      <label htmlFor="tab2" role="button" className="tab-label">
                        <span>{t("past")}</span>
                      </label>
                    </li>
                  </ul>
                  <div className="content">
                    {/* Ongoing Start Here  */}
                    <RenderItem
                      status="current"
                      locationList={locationList}
                      orderList={orderList}
                      tabId={tabValue}
                    />

                    {/* Past Orders Start Here  */}
                    <RenderItem
                      status="past"
                      locationList={locationList}
                      orderList={pastOrderList}
                      tabId={tabValue}
                    />
                  </div>
                  <div className="d-flex justify-content-center item-center">
                    {isLoad && <button onClick={loadMore} className={Styles.addPickupDetailsCancelBTn}>
                      Load More...
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PastOrder;
