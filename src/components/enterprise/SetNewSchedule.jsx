import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import Styles from "../../assets/css/home.module.css";

import { ToastContainer } from "react-toastify";
import SideComponent from "./common/SideComponent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import CalenderEvent from "./setting/CalenderEvent";
import moment from "moment";
import { showErrorToast } from "../../utils/Toastify";
import {
  createEnterpriseOrder,
  searchOrderApi,
} from "../../data_manager/dataManage";
import { deliveryboyRoute } from "../../utils/RoutePath";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const SetNewSchedule = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentDate] = useState(
    moment(new Date()).format("MMMM D, YYYY")
  );
  const location = useLocation();
  const { vehicletypeId, serviceType, branch, deliveryType, amount } =
    location.state;
  const [value, setValue] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [events, setEvents] = useState([]);
  const [repeatOrder, setRepeatOrder] = useState(false);
  const [slots, setSlots] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(null);
  const [totalHour, setTotalHour] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setNewEvent({ ...newEvent, start: date.toISOString().split("T")[0] }); // Format date as YYYY-MM-DD
  //   setShowCalendar(false); // Close calendar after selection
  // };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setNewEvent({ ...newEvent, start: date.toISOString().split("T")[0] });
    setShowStartCalendar(false); // Close calendar after selection
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setShowEndCalendar(false); // Close calendar after selection
    if (events.length > 0) {
      showErrorToast("Create shift only one at time.");
      return;
    }
    setNewEvent({ ...newEvent, end: date.toISOString().split("T")[0] });
    const startDate = moment(newEvent.start);
    const endDate = moment(date.toISOString().split("T")[0]);

    if (
      !startDate.isValid() ||
      !endDate.isValid() ||
      startDate.isAfter(endDate)
    ) {
      showErrorToast("Please select valid 'from' and 'to' dates.");
      return;
    }

    const days = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      days.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    const newRows = days.map((date) => ({
      date,
      slots: [{ from: "", to: "" }], // Default empty slot for each day
    }));

    setRows(newRows);
    setIsPreview(false);
  };

  const handleRepeatOrder = (isApplyForAllDays) => {
    setRepeatOrder(isApplyForAllDays); // Update the toggle state
    setRows((prevRows) => {
      if (isApplyForAllDays) {
        // Copy the first row's slots to all other rows
        const firstRowSlots = prevRows[0]?.slots || [];
        return prevRows.map((row, index) => {
          if (index === 0) return row; // Keep the first row unchanged
          return { ...row, slots: [...firstRowSlots] }; // Copy slots to other rows
        });
      } else {
        return prevRows.map((row, index) => ({
          ...row,
          slots: prevRows[0]?.slots || [],
        }));
      }
    });
  };

  // console.log("vehicleId",vehicletypeId)
  // console.log("serviceType",serviceType)
  // console.log("branch",branch)
  // console.log("deliveryType",deliveryType)

  const currentMonth = moment().month();
  const currentYear = moment().year();
  //   const orders = [
  //     {
  //       title: 'Pickup on Jun 2, 2024 at 11:30 AM',
  //       start: new Date(currentYear, currentMonth, 6, 11, 30),
  //       end: new Date(currentYear, currentMonth, 6, 12, 30),
  //       allDay: false,
  //       resource: {
  //         from: 'North Street, ABC',
  //         to: '5th Avenue, XYZ',
  //         orderId: '98237469'
  //       }
  //     }
  //   ];
  // const orders=[];
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
  });

  // const getOrder = () => {
  //   let params = {
  //     enterprise_ext_id: user.userDetails.ext_id,
  //     delivery_type_id: 3,
  //   };

  //   setLoading(true);
  //   searchOrderApi(
  //     params,
  //     (successResponse) => {
  //       setLoading(false);
  //       if (successResponse[0]._success) {
  //         const filteredOrders = successResponse[0]._response.filter((item) => item.slots.length > 0 && item.branch_id === branch?.id);

  //         // Map the filtered orders into the desired structure
  //         const mappedOrders = filteredOrders.map((order,key) => ({
  //           title: "Created Shift" + key ,
  //           start: order.shift_from_date ? moment(order.shift_from_date).toDate() :new Date(currentYear, currentMonth, 6, 11, 30),
  //           end:order.shift_tp_date ?  moment(order.shift_tp_date).toDate() : new Date(currentYear, currentMonth, 6, 12, 30),
  //           allDay: false,
  //           resource:order,
  //         }));

  //         setEvents(mappedOrders); // Set the transformed orders into state
  //       }
  //     },
  //     (errorResponse) => {
  //       setLoading(false);
  //       setEnterpriseOrderList([]);
  //       showErrorToast(errorResponse[0]._errors.message);
  //     }
  //   );
  // };

  // useEffect(()=>{
  //   getOrder()
  // },[user])
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleGenerateRows = (e) => {
    if (events.length > 0) {
      showErrorToast("Create shift only one at time.");
      return;
    }
    setNewEvent({ ...newEvent, end: e.target.value });
    const startDate = moment(newEvent.start);
    const endDate = moment(e.target.value);

    if (
      !startDate.isValid() ||
      !endDate.isValid() ||
      startDate.isAfter(endDate)
    ) {
      showErrorToast("Please select valid 'from' and 'to' dates.");
      return;
    }

    const days = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      days.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    const newRows = days.map((date) => ({
      date,
      slots: [{ from: "", to: "" }], // Default empty slot for each day
    }));

    setRows(newRows);
    setIsPreview(false);
  };

  const handleSlotChange = (date, index, field, value) => {
    setRepeatOrder(false);
    const updatedRows = rows.map((row) => {
      if (row.date === date) {
        // Create a deep copy of slots array
        const updatedSlots = row.slots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        );
        return { ...row, slots: updatedSlots };
      }
      return row;
    });

    setRows(updatedRows); // Make sure to update state
  };

  const handleAddSlot = (date) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.date === date
          ? { ...row, slots: [...row.slots, { from: "", to: "" }] }
          : row
      )
    );
  };

  const handleDeleteSlot = (date, index) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.date === date
          ? { ...row, slots: row.slots.filter((_, i) => i !== index) }
          : row
      )
    );
    isPreview(false);
    setTotalAmount(0);
    setTotalHour(0);
    setTotalDays(null);
    setFromDate(null);
    setToDate(null);
  };

  const handleAddEvent = () => {
    if (events.length > 0) {
      showErrorToast("Create shift only one at time.");
      return;
    }
    if (!newEvent.start || !newEvent.end) {
      showErrorToast("Please provide all details for the event.");
      return;
    }

    const start = new Date(newEvent.start);
    const end = new Date(newEvent.end);
    newEvent.title = `creat shift on ${moment(start).format(
      "DD-MM-YYYY"
    )} to ${moment(end).format("DD-MM-YYYY")}`;
    if (start >= end) {
      showErrorToast("End date/time must be after start date/time.");
      return;
    }

    setEvents([...events, { ...newEvent, start, end }]);
    setCalendarDate(start); // Automatically navigate to the selected start date
    setNewEvent({ title: "", start: "", end: "", allDay: false });
    const slots = rows
      .map((item) => {
        return item.slots
          .filter((itemSlot) => itemSlot?.from && itemSlot?.to) // Skip if from or to time is empty
          .map((itemSlot) => ({
            slot_date: item.date,
            date: item.date,
            day: moment(item.date).format("dddd"),
            from_time: itemSlot?.from,
            to_time: itemSlot?.to,
            total_hours: calculateTotalHours(itemSlot),
          }));
      })
      .flat();

    setSlots(slots);

    setIsPreview(true);
    setTotalAmount(
      calculateTotalAmount(calculateTotalHours(slots), parseFloat(amount))
    );
    setTotalDays(calculateScheduleDays(slots));
    setTotalHour(calculateTotalHours(slots));
    setFromDate(moment(start).format("DD-MM-YYYY"));
    setToDate(moment(end).format("DD-MM-YYYY"));
    setRows([]);
    setRepeatOrder(false);
  };

  const calculateTotalHours = (slots) => {
    let totalMinutes = 0;
    if (slots?.from) {
      const fromTime = moment(slots.from, "HH:mm");
      const toTime = moment(slots.to, "HH:mm");
      // Validate times
      if (!fromTime.isValid() || !toTime.isValid()) {
        showErrorToast("Invalid time format in slot.");
        return;
      }
      // Calculate time difference
      let diffMinutes = toTime.diff(fromTime, "minutes");
      // Handle crossing midnight
      if (diffMinutes < 0) {
        diffMinutes += 24 * 60; // Add 24 hours in minutes
      }
      totalMinutes += diffMinutes;
    } else {
      slots.forEach((slot) => {
        // Parse the times
        const fromTime = moment(slot.from_time, "HH:mm");
        const toTime = moment(slot.to_time, "HH:mm");
        // Validate times
        if (!fromTime.isValid() || !toTime.isValid()) {
          showErrorToast("Invalid time format in slot.");
          return;
        }
        // Calculate time difference
        let diffMinutes = toTime.diff(fromTime, "minutes");
        // Handle crossing midnight
        if (diffMinutes < 0) {
          diffMinutes += 24 * 60; // Add 24 hours in minutes
        }
        totalMinutes += diffMinutes;
      });
    }
    // Convert to HH.MM format
    const totalHours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const remainingMinutes = (totalMinutes % 60).toString().padStart(2, "0");

    return `${totalHours}.${remainingMinutes}`;
  };

  const calculateScheduleDays = (slots) => {
    if (!Array.isArray(slots) || slots.length === 0) {
      showErrorToast("Invalid slots array.");
      return 0;
    }

    // Extract all dates from slots
    const dates = slots.map((slot) => moment(slot.date, "YYYY-MM-DD"));
    const areDatesValid = dates.every((date) => date.isValid());
    if (!areDatesValid) {
      return 0;
    }

    // Find the minimum (start) and maximum (end) dates
    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);

    // Calculate the total number of days (inclusive)
    const totalDays = maxDate.diff(minDate, "days") + 1;

    return totalDays;
  };

  const calculateTotalAmount = (totalHours, perHourAmount) => {
    const [hours, minutes] = totalHours.split(".").map(Number);
    const totalDecimalHours = hours + minutes / 60;
    return totalDecimalHours * perHourAmount;
  };
  const continueHanger = () => {
    if (events.length <= 0 || slots == null) {
      showErrorToast("Please provide shift details.");
      return;
    }
    const startDate = moment(new Date(events[0].start)).format("YYYY-MM-DD");
    const endDate = moment(new Date(events[0].end)).format("YYYY-MM-DD");
    let requestParams = {
      enterprise_ext_id: user?.userDetails.ext_id,
      branch_id: branch?.id,
      delivery_type_id: deliveryType?.id,
      service_type_id: serviceType?.id,
      vehicle_type_id: vehicletypeId,
      shift_from_date: startDate,
      shift_tp_date: endDate,
      is_same_slot_all_days: repeatOrder ? 1 : 0,
      amount,
      total_amount: totalAmount,
      total_hours: totalHour,
      total_days: totalDays,
      slots: slots,
    };
    try {
      setLoading(true);

      createEnterpriseOrder(
        requestParams,
        (successResponse) => {
          setLoading(false);
          if (successResponse[0]?._success) {
            setOrderNumber(successResponse[0]._response[0]?.order_number);
            navigate("/enterprise/schedule-request", {
              state: {
                orderNumber: successResponse[0]._response[0]?.order_number,
              },
            });
          } else {
            showErrorToast("Order creation failed. Please try again.");
          }
        },
        (errorResponse) => {
          setLoading(false);
          const err =
            errorResponse?.errors?.msg?.[0]?.msg ||
            errorResponse[0]?._errors?.message ||
            "An error occurred";
          showErrorToast(err);
        }
      );
    } catch (error) {
      setLoading(false);
      showErrorToast("An unexpected error occurred. Please try again.");
    }
  };

  const resetHandler = () => {
    setEvents([]);
    setIsPreview(false);
    setSlots(null);
    setTotalHour(0);
    setTotalAmount(0);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      allDay: false,
    })
    setRows([])
  };
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.enterprisePreviewPageSec}>
        <div>
          <div className={Styles.enterpriseScheduleShiftMainCard}>
            <div className="col-md-3">
              <div className={Styles.enterpriseCreateShiftAvailabilityMainCard}>
                <div className={Styles.enterpriseCreateShiftAvailabilityHeader}>
                  <div>
                    {/* <p
                          className={
                            Styles.enterpriseCreateShiftAvailabilityText
                          }
                        >
                          Set availability of
                        </p> */}
                    <h4
                      className={Styles.enterpriseCreateShiftAvailabilityDate}
                    >
                      {t("planning")}
                    </h4>
                  </div>
                  <button className={Styles.enterprisePlannigDateCloseIcon}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
                <div
                  className={
                    Styles.enterpriseCreateShiftAvailabilitySlotsMainCard
                  }
                >
                  <div
                    className={
                      Styles.enterpriseCreateShiftAvailabilityAddrowCard
                    }
                  >
                    {/* Start Date Section */}
                    <div style={{ position: "relative" }}>
                      <p className={Styles.createShiftAvailabilityText}>
                        {t("start_date")}
                      </p>
                      <div
                        className={
                          Styles.enterpriseCreateShiftAvailabilityFromCard
                        }
                      >
                        <input
                          type="text"
                          placeholder="yyyy-mm-dd"
                          value={newEvent.start}
                          readOnly
                          onClick={() => {
                            setShowStartCalendar(!showStartCalendar);
                            setShowEndCalendar(false); // Close end date picker if open
                          }}
                          className={
                            Styles.enterpriseCreateShiftAvailabilityFromInput
                          }
                          style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                      </div>

                      {/* Start Date Calendar */}
                      {showStartCalendar && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translate(-50%, 10px)",
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                            width: "336px",
                          }}
                        >
                          <DatePicker
                            selected={selectedStartDate}
                            onChange={handleStartDateChange}
                            inline
                            calendarClassName="custom-calendar"
                          />
                        </div>
                      )}
                    </div>

                    {/* End Date Section */}
                    <div style={{ position: "relative" }}>
                      <p className={Styles.createShiftAvailabilityText}>
                        {t("end_date")}
                      </p>
                      <div
                        className={
                          Styles.enterpriseCreateShiftAvailabilityFromCard
                        }
                      >
                        <input
                          type="text"
                          placeholder="yyyy-mm-dd"
                          value={newEvent.end}
                          readOnly
                          onClick={() => {
                            setShowEndCalendar(!showEndCalendar);
                            setShowStartCalendar(false); // Close start date picker if open
                          }}
                          className={
                            Styles.enterpriseCreateShiftAvailabilityFromInput
                          }
                          style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                      </div>

                      {/* End Date Calendar */}
                      {showEndCalendar && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translate(-50%, 10px)",
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                            width: "336px",
                          }}
                        >
                          <DatePicker
                            selected={selectedEndDate}
                            onChange={handleEndDateChange}
                            inline
                            calendarClassName="custom-calendar"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={Styles.enterpriseSelectServiceRepeatOrderCard}
                  >
                    <p
                      className={Styles.enterpriseSelectServiceRepeatOrderText}
                    >
                      {t("apply_same_slots")}
                    </p>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="repeat-switch"
                        checked={repeatOrder}
                        onChange={(e) => handleRepeatOrder(e.target.checked)}
                        className={repeatOrder ? "repeat-switch" : ""}
                      />
                    </Form>
                  </div>
                  <div>
                    {rows.map((row) => (
                      <div className="mb-2" key={row.date}>
                        <h4
                          className={
                            Styles.enterpriseCreateShiftAvailabilityText
                          }
                        >
                          {moment(row.date).format("dddd, MMMM D, YYYY")}
                        </h4>
                        {row.slots.map((slot, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Form.Control
                              type="time"
                              value={slot.from}
                              lang="en-GB"
                              onChange={(e) =>
                                handleSlotChange(
                                  row.date,
                                  index,
                                  "from",
                                  e.target.value
                                )
                              }
                              style={{
                                width: "150px",
                                marginRight: "10px",
                              }}
                            />
                            <Form.Control
                              type="time"
                              lang="en-GB"
                              value={slot.to}
                              onChange={(e) =>
                                handleSlotChange(
                                  row.date,
                                  index,
                                  "to",
                                  e.target.value
                                )
                              }
                              style={{
                                width: "150px",
                                marginRight: "10px",

                              }}
                            />
                            {index !== row.slots.length - 1 && (
                              <button
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityDeleteBtn
                                }
                                onClick={() =>
                                  handleDeleteSlot(row.date, index)
                                }
                                style={{ marginRight: "10px" }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            )}
                            {index === row.slots.length - 1 && (
                              <button
                                className={
                                  Styles.enterpriseCreateShiftAvailabilityPlusBtn
                                }
                                onClick={() => handleAddSlot(row.date)}
                                disabled={repeatOrder}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}

                    {rows.length > 0 && (
                      <div className={Styles.enterpriseResetbtnCards}>
                        <button
                          onClick={resetHandler}
                          className={
                            Styles.enterpriseCreateShiftSetavailabilitySaveBtn
                          }
                        >
                          {t("reset")}
                        </button>

                        <button
                          onClick={handleAddEvent}
                          className={
                            Styles.enterpriseCreateShiftSetavailabilitySaveBtn
                          }
                        >
                          {t("preview")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className={Styles.previewPageColGapping}>
                <h4 className={Styles.previewPageTitle}>{t("preview")}</h4>
                {isPreview}
                <div>
                  <div className={Styles.previewHeaderMainCard}>
                    <div className={Styles.totalAboutCard}>
                      <h4>
                        {t("total_hours")}: <span>{totalHour}</span>
                      </h4>
                      <h4>
                        {t("estimated_cost")}:{" "}
                        <span>€ {totalAmount?.toFixed(2)}</span>
                      </h4>
                    </div>
                  </div>
                  {isPreview ? (
                    <div className={Styles.previewbottomMainCard}>
                      {slots?.map((slot, index) => (
                        <div key={index} className="mb-2">
                          <p className={Styles.previewTimeDateText}>
                            {moment(slot.date).format("dddd, MMMM D, YYYY")}
                          </p>
                          <div className={Styles.previewTimeCard}>
                            <p>{slot.from_time}</p>
                            <p>{slot.to_time}</p>
                          </div>
                        </div>
                      ))}
                      <div className={Styles.enterprseShiftFinalBtnCard}>
                        <button
                          className={
                            Styles.enterpriseCreateShiftSetavailabilitycancelBtn
                          }
                          onClick={() => navigate("/enterprise/dashboard")}
                        >
                          {t("cancel")}
                        </button>
                        <div
                          onClick={continueHanger}
                          className={Styles.enterpriseSelectServiceNextBtn}
                          style={{ cursor: "pointer" }}
                        >
                          {t("create")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={Styles.previewbottomMainCard}>
                      <div className="mb-2 text-center">
                        <p className={Styles.previewTimeDateText}>
                          {t("no_data")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={Styles.previewPageColGapping}>
                <div className={Styles.enterprisePlanningCalenderMain}>
                  <CalenderEvent
                    events={events}
                    setEvents={setEvents}
                    calendarDate={calendarDate}
                    setCalendarDate={setCalendarDate}
                    setSlots={setSlots}
                  />
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

export default SetNewSchedule;
