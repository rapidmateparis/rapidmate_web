import React, { useCallback, useEffect, useState } from "react";
import Styles from "../../assets/css/home.module.css";
import Form from "react-bootstrap/Form";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircle,
  faLocationDot,
  faLocationCrosshairs,
  faRefresh,
  faPlus,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import ActiveBooking from "../../assets/images/Active-bookings.png";
import ScheduledBooking from "../../assets/images/Scheduled-bookings.png";
import AllBooking from "../../assets/images/All-booking.png";
import Home from "../../assets/images/home-icon.png";
import Package from "../../assets/images/Package.png";
import Calender from "../../assets/images/Calender-withBg.png";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import EnterpriseHomeCalender from "./setting/EnterpriseHomeCalender";
import { Bar } from "react-chartjs-2";
import {
  fetchEnterprisePlans,
  getEnterpriseDashboardInfo,
  getEnterpriseOrders,
  getLocations,
} from "../../data_manager/dataManage";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/Toastify";
import { setBookings, setBranches } from "../../redux/enterpriseSlice";
import moment from "moment";
import OrderCardBox from "./common/OrderCardBox";
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../../common/Loader";
import { useTranslation } from "react-i18next";
import { getDashbaordBranch } from "../../utils/UseFetch";
function CommonDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t}=useTranslation();
  const user = useSelector((state) => state.auth.user);
  const { vehicleType } = useSelector((state) => state.commonData.commonData);
  const { bookings, branches } = useSelector((state) => state.enterprise);
  const [bookingHour, setBookingHour] = useState(0);
  const [spendHr, setSpendHr] = useState(0);
  const [enterprisePlans, setEnterprisePlans] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const displayChartData = (branch) => {
    setLoading(true);
    const days = branch.map((day) => day.month);
    const hours = branch.map((day) => day.count);

    const data = {
      labels: days,
      datasets: [
        {
          label: "booked",
          data: hours,
          backgroundColor: "rgba(255, 0, 88, 1)",
          borderColor: "rgba(255, 0, 88, 1)",
          borderWidth: 1,
        },
      ],
    };
    const sum = hours
      .flat()
      .reduce((total, num) => total + parseInt(num, 10), 0);
    setBookingHour(sum);
    setChartData(data);
    // setBookingHour(branch?.bookinghr);
    // setSpendHr(branch?.spenthr);
    setLoading(false);
  };

  const dropdownData2 = [
    { label: "All", value: "all" },
    { label: "Today", value: "today" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
    { label: "This year", value: "year" },
  ];

  const getEnterprisePlans = (dateString) => {
    let params = {
      enterprise_ext_id: user.userDetails.ext_id,
      plan_date: dateString,
    };
    fetchEnterprisePlans(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            setEnterprisePlans(successResponse[0]._response);
          }
        } else {
          setEnterprisePlans([]);
        }
      },
      (errorResponse) => {
        setEnterprisePlans([]);
      }
    );
  };

  const getBookingList = async () => {
    setLoading(true);
    try {
      const response=await getDashbaordBranch(user?.userDetails?.ext_id);
      if(response?.branchOverviewData && response?.branchOverviewData.length > 0){
        const branchList =response?.branchOverviewData;
        dispatch(setBranches(branchList));
        dispatch(setBookings(response?.overviewData));
        displayChartData(response?.weekData);
      }
      setLoading(false);
    } catch (errorResponse) {
      let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err);
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookings || branches?.length == 0) {
      getBookingList();
    }
    getEnterprisePlans(currentDate);
    // if (branches) {
    //   displayChartData(branches[0]);
    // }
  }, [user, currentDate]);

  const branchList = branches?.map((item, index) => ({
    label: item.branch_name,
    value: item.branch_id,
  }));
  const handleDayChange = (selectedOption) => {
    // console.log('Selected option:', selectedOption);
  };

  const handleChange = (selectedOption) => {
    const getSinglebranch = branches.filter(
      (branch) => branch.id == selectedOption.value
    );

    // displayChartData(booking[0]);
  };
  if (loading) {
    return <Spinners />;
  }

  const navigateHandler = (e) => {
    e.preventDefault();
    navigate("/enterprise/orders");
  };
  const handleShift = (e) =>{
    e.preventDefault()
    navigate("/enterprise/orders",{state:{tabId:3}})
  }

  return (
    <>
      <section className={Styles.enterpriseHomeSec}>
        <div className={Styles.enterpriseHomeMainSec}>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-8">
              <div>
                <p className={Styles.enterprisesHomeUserWelcomeText}>
                  {t("welcome")}{" "}
                  <b>
                    {user?.userDetails?.first_name +
                      " " +
                      user?.userDetails?.last_name}
                    !
                  </b>
                </p>
                <p className={Styles.enterprisesHomeDashbordDiscription}>
                {t("rapidmateDashboardTitle")}{" "}
                  <button
                    className="m-2 border-0 text-white bg-primary rounded-md"
                    onClick={getBookingList}
                  >
                    <FontAwesomeIcon icon={faRefresh} />
                  </button>
                </p>
                <div className="row">
                  <div className="col-md-4">
                    <div className={Styles.enterpriseHomeActiveBookingCard} onClick={navigateHandler} style={{cursor:"pointer"}}>
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>

                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        {t("active_bookings")}
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4
                          className={Styles.enterprisesHomeActiveBookingCount}
                        >
                          {bookings &&
                            (bookings?.active_order < 10 &&
                            bookings?.active_order > 0
                              ? "0" + bookings?.active_order
                              : bookings?.active_order)}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={ActiveBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={Styles.enterpriseHomeActiveBookingCard} onClick={handleShift} style={{cursor:"pointer"}}>
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        {t("shift_bookings")}
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4
                          className={Styles.enterprisesHomeActiveBookingCount}
                        >
                          {bookings &&
                            (bookings?.schedule_order < 10 &&
                            bookings?.schedule_order > 0
                              ? "0" + bookings?.schedule_order
                              : bookings?.schedule_order)}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={ScheduledBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={`${Styles.enterpriseHomeActiveBookingCard}`}
                      style={{ cursor: "pointer" }}
                      onClick={navigateHandler}
                    >
                      <button className={Styles.enterpriseHomeInfoButton}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <p className={Styles.enterpriseHomeActiveBookingText}>
                        {t("all_bookings")}
                      </p>
                      <div className={Styles.enterpriseBookingCountCard}>
                        <h4
                          className={Styles.enterprisesHomeActiveBookingCount}
                        >
                          {bookings &&
                            (bookings?.total_order < 10 &&
                            bookings?.total_order > 0
                              ? "0" + bookings?.total_order
                              : bookings?.total_order)}
                        </h4>
                        <img
                          className={Styles.enterpriseHomeCheckIcon}
                          src={AllBooking}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.enterprisesHomeGraphCard}>
                  <div className={Styles.enterpriseHomeWithoutGraphCard}>
                    <div>
                      <h4 className={Styles.enterpriseHomeHoursText}>
                      {t("hoursBooked")}
                      </h4>
                      <div className={Styles.enterpriseHomeLocationSelectCard}>
                        <Select
                          options={branchList}
                          styles={customSelectStyles}
                          defaultValue={branchList ? branchList[0] : ""}
                          onChange={handleChange}
                          className={Styles.enterpriseBranchSelect}
                        />

                        <Select
                          options={dropdownData2}
                          styles={customSelectStyles}
                          defaultValue={dropdownData2 ? dropdownData2[0] : ""}
                          onChange={handleDayChange}
                          className={Styles.enterpriseBranchSelect}
                        />
                      </div>
                    </div>

                    <div className={Styles.enterpriseHomeTotalHourseCard}>
                      <div className={Styles.enterpriseHomeBookedCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeHoursCircleIcon}
                          icon={faCircle}
                        />
                        <p className={Styles.enterpriseHomeHoursBookedText}>
                          {t("hours_booked")}
                        </p>
                      </div>
                      <h2
                        className={`${Styles.enterpriseHomeTotalHoursText} me-2`}
                      >
                        {bookingHour}
                      </h2>
                      <div className={Styles.enterpriseHomeBookedCard}>
                        <FontAwesomeIcon
                          className={Styles.enterpriseHomeHoursusedCircleIcon}
                          icon={faCircle}
                        />
                        <p className={Styles.enterpriseHomeHoursBookedText}>
                          {t("hours_used")}
                        </p>
                      </div>
                      <h2 className={Styles.enterpriseHomeTotalSpendHoursText}>
                        {" "}
                        {spendHr}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <div className="chart-container">
                      <Bar data={chartData} options={options} />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <p className={Styles.enterpriseCompanyLocationsText}>
                    {t("company_locations")}
                  </p>
                  <p className={`${Styles.enterpriseCompanyLocationsText}`}>
                    <Link
                      to="/enterprise/all-company-location"
                      className={Styles.textColor}
                    >
                      {t("see_all")}
                    </Link>
                  </p>
                </div>

                {branches?.slice(0, 3).map((company, index) => (
                  <div
                    key={index}
                    className={Styles.enterpriseHomeCompanyLocCard}
                  >
                    <div className={Styles.enterpriseCompanyLogoNameCard}>
                      <img
                        className={Styles.enterpriseHomeHomeIcon}
                        src={Home}
                        alt="home-icon"
                      />
                      <div>
                        <h4 className={Styles.enterpriseHomeCompanyName}>
                          {company.branch_name}
                        </h4>
                        <div className={Styles.enterpriseHomeAddressCard}>
                          <FontAwesomeIcon
                            className={Styles.enterpriseHomeLocDotIcon}
                            icon={faLocationDot}
                          />
                          <p className={Styles.enterpriseHomeCompanyAddress}>
                            {company.address} {company?.city} {company?.state}{" "}
                            {company?.postal_code} {company?.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={Styles.enterpriseHomeLocSpentCard}>
                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          {t("active_bookings")}
                        </p>
                        <h4>
                          {company?.active_order ? company?.active_order : 0}
                        </h4>
                      </div>

                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          {t("shift_bookings")}
                        </p>
                        <h4>
                          {company?.schedule_order ? company.schedule_order : 0}
                        </h4>
                      </div>

                      <div className={Styles.enterpriseHomeHrsBookedCard}>
                        <p className={Styles.enterpriseHomeLocHsbooked}>
                          {t("all_bookings")}
                        </p>
                        <h4>{company?.total ? company?.total : 0}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="col-md-12">
                <div className={Styles.enterprisePlannigHeadCard}>
                  <h4 className={Styles.enterprisePlanningTitle}>{t("planning")}</h4>
                  <div className={Styles.enterprisePlannigFilterScheduleCard}>
                    {/* <button className={Styles.enterprisePlanningFilterBtn}>
                    <FontAwesomeIcon icon={faFilter} />
                  </button> */}
                    <Link
                      to="/enterprise/schedules"
                      className={Styles.enterprisePlanningNewScheduleBtn}
                    >
                      <FontAwesomeIcon
                        className={Styles.enterprisePlanningPlusIcon}
                        icon={faPlus}
                      />
                      {t("new_schedule")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={Styles.enterpriseHomeCalenderMainCard}>
                {/* Calender Start Here  */}
                <EnterpriseHomeCalender setCurrentDate={setCurrentDate} />
                {/* Calender End Here  */}
                

                <div>
                  {enterprisePlans?.length >= 5 && (
                    <div className="container">
                      <p className="text-end">
                        <button className="border-0 text-primary p-1">
                          {t("all")}
                        </button>
                      </p>
                    </div>
                  )}

                  {enterprisePlans?.slice(0, 4).map((item, key) => (
                    <OrderCardBox
                      order={item}
                      locationList={locationList}
                      key={key}
                      vehicleTypeList={vehicleType}
                      branches={branches}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    width: "100%",
    // height: "-50px",
    fontSize: "13px",
    "@media (min-width: 768px)": {
      width: "190px", // Adjust for larger screens
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#ffc72b" : isFocused ? "#f8f9fa" : "#fff",
    color: "#333",
    fontSize: "14px",
  }),
};
export default CommonDashboard;
