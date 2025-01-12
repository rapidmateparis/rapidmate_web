import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../assets/images/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../assets/css/PasswordModal.module.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ResetPasswordModal from "./ResetPasswordModal";
import { maskEmail } from "../utils/Constants";

const ForgotPasswordOTPModal = ({ show, handleClose, email }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [sendOtp,setSendOtp]=useState(null)
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const inputRefs = useRef([]);

  // Function to handle OTP submission
  const handleOtpSubmit = () => {
    const optNumber = Number(otp.join(''));
    setSendOtp(optNumber);
    setIsResetModalVisible(true); // Show the reset password modal
  };

  // Function to handle closing the ResetPasswordModal
  const handleCloseResetPasswordModal = () => {
    setIsResetModalVisible(false);
    handleClose()
  };

  // Function to handle input changes for OTP fields
  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <>
      {/* OTP Modal */}
      <Modal
        show={show && !isResetModalVisible} // Show OTP Modal only when ResetPasswordModal is not visible
        onHide={handleClose}
        centered
        dialogClassName="modal-main"
      >
        <Modal.Header>
          <div className={Styles.modalMainHeader}>
            <FontAwesomeIcon
              className={Styles.modalBackClose}
              onClick={handleClose}
              icon={faArrowLeft}
            />
            <div className={Styles.logoHeaderMainCard}>
              <div className={Styles.logoHeaderCard}>
                <img className={Styles.logoSmall} src={Logo} alt="Logo" />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={Styles.forgotTitleHeaderCard}>
            <h2 className={Styles.forgotPasswordTitle}>Forgot password</h2>
            <p className={Styles.forgotPasswordSubtitle}>
              We have sent a 6-digit code to your email address{" "}
              <b>{maskEmail(email)}</b>. Please enter the code below.
            </p>
          </div>

          <OTPContainer>
            {otp.map((digit, index) => (
              <OTPInputBox
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="0"
              />
            ))}
          </OTPContainer>

          <div className={Styles.resendCodeCard}>
            <button className={Styles.resendCodeBtn} type="button">
              Resend code
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={Styles.modalSubmitBtnCard}>
            <button
              className={Styles.modalEmailSubmitBtn}
              onClick={handleOtpSubmit} // Trigger OTP submit
              type="button"
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      {isResetModalVisible && (
        <ResetPasswordModal
          isShow={isResetModalVisible}
          handleClose={handleCloseResetPasswordModal}
          email={email}
          otp={sendOtp}
        />
      )}
    </>
  );
};

// Styled Components
const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const OTPInputBox = styled.input`
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  ::placeholder {
    color: #aaa;
  }
`;

export default ForgotPasswordOTPModal;
