import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Styles from "../assets/css/PasswordModal.module.css";
import Logo from "../assets/images/Logo-icon.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordOTPModal from "./ForgotPasswordOTPModal";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordApi } from "../data_manager/dataManage";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
import { ToastContainer } from "react-toastify";
const ForgotPasswordEmailModal = ({ show, handleClose }) => {
  const [showOtpModal, setShowOtpModal] = useState(false); // State to manage ResetPasswordModal visibility
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleShowOtpModal = () => setShowOtpModal(true);
  const handleCloseOtpModal = () => setShowOtpModal(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });
 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    let params = {
      info: {
        userName: data?.email,
      },
    };
    
    setLoading(true)
    forgotPasswordApi(params, (successResponse) => {
      if(successResponse[0]._success){
        if(successResponse[0]._response) {
          if(successResponse[0]._response.name == 'NotAuthorizedException') {
            setLoading(false)
            showErrorToast(successResponse[0]._response.name);
          } else {
            // showSuccessToast(successResponse[0]._response?.response.message)
            setLoading(false)
            setEmailText(data?.email)
            handleShowOtpModal();
            handleClose();
          }
        }
      }
    }, (errorResponse)=> {
      setLoading(false)
      showErrorToast(errorResponse[0]._errors.message);
    })
    // Implement your email submission logic here
    // handleShowOtpModal();
    // handleClose();
  };
  return (
    <>
      <div className="forgotPassword-modalMain">
        <Modal
          show={show}
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
                Please confirm your email address, we will send OTP there
              </p>
            </div>

            <div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className={Styles.loginLabels}>Email</Form.Label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="email"
                        placeholder="Type here.."
                        className={Styles.loginInputs}
                        isInvalid={!!errors.email}
                      />
                    )}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <div
                  className={`${Styles.modalSubmitBtnCard} d-flex justify-content-center`}
                >
                  <button className={Styles.modalEmailSubmitBtn} type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        {/* Render OtpModal conditionally based on showOtpModal state */}
        {showOtpModal && (
          <ForgotPasswordOTPModal
            show={showOtpModal}
            handleClose={handleCloseOtpModal}
            email={emailText}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordEmailModal;
