import React, { useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getCompanyList, getDeliveryBoyViewOrdersList, getLocations } from "../../data_manager/dataManage";
import CardComponent from "./CardComponent";
import CompanyItemCart from "./CompanyItemCart";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Loader = () => (
  <div className="col-md-12">
    <div className={Styles.enterpriseHomeDeliveryHistoryCard} style={{ textAlign: "center" }}>
      <p className={Styles.enterpriseHomePickupTimeinfo}>Data fetching...</p>
    </div>
  </div>
);

function DeliveryboyDashboard() {
  const user = useSelector((state)=>state.auth.user)
  const {t}=useTranslation()
  const [orderList, setOrderList] = useState([]);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          getLocationsData(),
          getOrderList(0),
          getOrderList(1),
          getCompanyConnectionList(),
        ]);
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getCompanyConnectionList = () => {
    getCompanyList(
      user.userDetails.ext_id,
      (successResponse) => {
        if (successResponse[0]._success) {
          setCompanyList(successResponse[0]._response);
        }
      },
      (errorResponse) => {
        // console.error("Error fetching company list:", errorResponse);
        setLoading(false);
      }
    );
  };

  const getLocationsData = () => {
    getLocations(
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          setLocationList(successResponse[0]._response);
        }
      },
      (errorResponse) => {
        // console.error("Error fetching locations:", errorResponse);
      }
    );
  };

  const getOrderList = (status) => {
    const postParams = {
      extentedId: user?.userDetails?.ext_id,
      status: status === 0 ? "upcoming" : "past",
    };

    return getDeliveryBoyViewOrdersList(
      postParams,
      null,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (status === 0) {
            setOrderList(successResponse[0]._response);
          } else {
            setRecentOrderList(successResponse[0]._response);
          }
        }
      },
      (errorResponse) => {
        // console.error("Error fetching orders:", errorResponse);
      }
    );
  };

  

  return (
    <section className={Styles.profileChooseSec}>
      <div className="container">
        <p className={Styles.enterprisesHomeUserWelcomeText}>
          {t("welcome")} <b>{user?.userDetails?.first_name} {user?.userDetails?.last_name}</b>
        </p>
        <p className={Styles.enterprisesHomeDashbordDiscription}>
          {t("dashboard_welcome")}
        </p>
        {loading ? <Loader /> : (
          <>
            <div className="row mt-3">
              <div className={Styles.enterpriseHomeOrderidCard}>
                <p className={Styles.enterpriseHomePickupTimeinfo}>{t("upcoming_deliveries")}</p>
                <Link className={Styles.enterpriseHomeOrderIdText} style={{ fontSize: "13px" }}>
                  {t("all")} <FontAwesomeIcon className={Styles.enterpriseHomeAddresslocDotIcon} icon={faAngleDown} />
                </Link>
              </div>
              <CardComponent orderList={orderList} locationList={locationList} msg={t("no_upcoming_orders")} />
            </div>

            <div className="row">
              <div className={Styles.enterpriseHomeOrderidCard}>
                <p className={Styles.enterpriseHomePickupTimeinfo}>{t("recently_delivered")}</p>
                <Link className={Styles.enterpriseHomeOrderIdText} style={{ fontSize: "13px" }}>
                  {t("all")} <FontAwesomeIcon className={Styles.enterpriseHomeAddresslocDotIcon} icon={faAngleDown} />
                </Link>
              </div>
              <CardComponent orderList={recentOrderList} locationList={locationList} msg={t("no_recent_deliveries")} />
            </div>

            <div className="row">
              <div className={Styles.enterpriseHomeOrderidCard}>
                <p className={`${Styles.enterpriseHomePickupTimeinfo} mb-2`}>{t("my_companies")}</p>
                <Link className={Styles.enterpriseHomeOrderIdText} style={{ fontSize: "13px" }}>
                  {t("all")} <FontAwesomeIcon className={Styles.enterpriseHomeAddresslocDotIcon} icon={faAngleDown} />
                </Link>
              </div>
              <CompanyItemCart companyList={companyList} msg={t("no_company_listing")} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default DeliveryboyDashboard;
