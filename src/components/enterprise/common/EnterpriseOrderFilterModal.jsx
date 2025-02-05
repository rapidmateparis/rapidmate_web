import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Styles from "../../../assets/css/EnterpriseOrderFilterModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"; // Import the calendar icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

function EnterpriseOrderFilterModal({ handleClose,onFilterSelected }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
    const { t } = useTranslation();
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className={`${Styles.datepickerContainer}`} onClick={onClick} ref={ref}>
      <input
        value={value}
        readOnly
        className={`${Styles.enterpriseOderDatepicker}`}
        placeholder={t("selectDate")}
      />
      <FontAwesomeIcon icon={faCalendarAlt} className={Styles.calendarIcon} />
    </div>
  ));

  const handleApply = () => {
    onFilterSelected({fromDate: fromDate, toDate: toDate});
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header className={Styles.EnterpriseOrderFilterHeader} closeButton>
        <Modal.Title>{t("applyFilter")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div className={Styles.enterpriseOrderdatepickerCard}>
            <label className="block text-sm font-medium mb-1">{t("fromDate")}</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInput />}
            />
          </div>
          <div className={Styles.enterpriseOrderdatepickerCard}>
            <label className="block text-sm font-medium mb-1">{t("toDate")}</label>
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
          {t("apply")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EnterpriseOrderFilterModal;
