import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Styles from "../../../assets/css/EnterpriseOrderFilterModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"; // Import the calendar icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EnterpriseOrderFilterModal({ handleClose }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className={`${Styles.datepickerContainer}`} onClick={onClick} ref={ref}>
      <input
        value={value}
        readOnly
        className={`${Styles.enterpriseOderDatepicker}`}
        placeholder="Select a date"
      />
      <FontAwesomeIcon icon={faCalendarAlt} className={Styles.calendarIcon} />
    </div>
  ));

  const handleApply = () => {
    if (onApply) onApply({ fromDate, toDate });
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header className={Styles.EnterpriseOrderFilterHeader} closeButton>
        <Modal.Title>Apply Filter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div className={Styles.enterpriseOrderdatepickerCard}>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput />}
            />
          </div>
          <div className={Styles.enterpriseOrderdatepickerCard}>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput />}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          className={Styles.enterpriseOrderFilterApplyBtn}
          onClick={handleApply}
        >
          Apply
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EnterpriseOrderFilterModal;
