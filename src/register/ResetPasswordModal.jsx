import {useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../assets/images/Logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../assets/css/PasswordModal.module.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {faArrowLeft,faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { resetPasswordApi } from "../data_manager/dataManage";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";

const ResetPasswordModal = ({ isShow, handleClose, email, otp }) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toggleNewPassword = () => {
    setNewPassword((prevState) => !prevState);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword((prevState) => !prevState);
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let params = {
      info: {
        userName: `${email}`,
        verificationCode: `${otp}`,
        newPassword: data.password,

      },
    };
    setLoading(true);
    resetPasswordApi(
      params, 
      (successResponse) => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response){
            if (successResponse[0]._response.name == "CodeMismatchException") {showErrorToast(successResponse[0]._response.name);} 
            else if (successResponse[0]._response.name == "LimitExceededException"){showErrorToast(successResponse[0]._response.name);} 
            else if (successResponse[0]._response.name == "SerializationException"){showErrorToast(successResponse[0]._response.name);}
            else if(successResponse[0]._response.name=='ExpiredCodeException'){showErrorToast(successResponse[0]._response.name)} 
            else {handleClose();showSuccessToast("Reset password successfully done.");}
          }
        }
      },(errorResponse)=>{
        setLoading(false);
        showErrorToast(errorResponse[0]._errors.message);
        handleClose();
      }
    );
  };

  return (
    <Modal
      show={isShow} // Toggle visibility based on isShow
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
          <h2 className={Styles.forgotPasswordTitle}>Reset Password</h2>
          <p className={Styles.forgotPasswordSubtitle}>
            Thanks you for confirming the code, you may now reset the password.
          </p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label className={Styles.loginLabels}>New Password</Form.Label>
            <div className={Styles.passwordInputContainer}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type={newPassword ? "text" : "password"}
                    placeholder="Type here.."
                    className={Styles.loginInputs}
                    isInvalid={!!errors.password}
                    aria-label="New Password"
                  />
                )}
              />
              <FontAwesomeIcon
                icon={newPassword ? faEye : faEyeSlash}
                className={Styles.eyeIcon}
                onClick={toggleNewPassword}
                aria-label={newPassword ? "Hide password" : "Show password"}
              />
            </div>
            {errors.password && (
              <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                {errors.password.message}
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label className={Styles.loginLabels}>
              Confirm Password
            </Form.Label>
            <div className={Styles.passwordInputContainer}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type={confirmPassword ? "text" : "password"}
                    placeholder="Type here.."
                    className={Styles.loginInputs}
                    isInvalid={!!errors.confirmPassword}
                    aria-label="Confirm Password"
                  />
                )}
              />
              <FontAwesomeIcon
                icon={confirmPassword ? faEye : faEyeSlash}
                className={Styles.eyeIcon}
                onClick={toggleConfirmPassword}
                aria-label={confirmPassword ? "Hide password" : "Show password"}
              />
            </div>
            {errors.confirmPassword && (
              <p className={Styles.termsCheck} style={{ fontSize: "13px" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </Form.Group>
          <div
            className={`${Styles.modalSubmitBtnCard} d-flex justify-content-center`}
          >
            <button
              disabled={loading}
              className={Styles.modalEmailSubmitBtn}
              type="submit"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OTPInputBox = styled.input`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  ::placeholder {
    color: #aaa; /* Placeholder text color */
  }
`;

export default ResetPasswordModal;
