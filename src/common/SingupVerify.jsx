import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Styles from "../assets/css/PasswordModal.module.css";
import Logo from "../assets/images/Logo-icon.png";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, signUpVerifyApi } from "../data_manager/dataManage";
import { loginStart, loginSuccess } from "../redux/authSlice";
import { getLookup } from "../utils/UseFetch";

const SingupVerify = () => {
  const userRole = useSelector((state) => state.auth.role);
  const baseUrl = userRole?.toLowerCase().replace(/_/g, "");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [fcmToken, setfcmToken] = useState("");
  const [role, setRole] = useState("");
  const [error, setErrors] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOtpSubmit = () => {
    const hasEmptyValues = otp.some((value) => value === "");
    const allValuesEmpty = otp.every((value) => value === "");
    if (allValuesEmpty) {
      setErrors("Please enter OTP.");
    } else if (hasEmptyValues) {
      setErrors("Some OTP values are missing.");
    } else {
      const otpString = otp.join("");

      setErrors("");
      let params = {
        info: {
          userName: user.email,
          code: otpString,
          role: role,
        },
      };

      signUpVerifyApi(
        params,
        (successResponse) => {
          if (successResponse[0]._success) {
            dispatch(loginStart());
            let loginParams = {
              info: {
                userName: user.email,
                password: user.password,
                token: fcmToken,
              },
            };
            if (user.password == "") {
              navigate("/login");
            } else {
              authenticateUser(
                loginParams,
                (successResponse) => {
                  if (successResponse[0]._success) {
                    const dataRes =
                      successResponse[0]._response.user?.idToken?.payload;
                    const userData = {
                      userInfo: {
                        username: dataRes["cognito:username"],
                        email: dataRes.email,
                        name: dataRes.name,
                        email_verify: dataRes.email_verified,
                        auth_time: dataRes.auth_time,
                        exp: dataRes.exp,
                      },
                      userDetails: successResponse[0]._response.user_profile[0],
                    };
                    const getToken = successResponse[0]._response?.token;
                    const userRole =
                      successResponse[0]._response.user_profile[0].role;
                    const refreshToken =
                      successResponse[0]._response?.refreshtoken;
                    if (getToken && userData) {
                      localforage.setItem(1, getToken);
                      dispatch(
                        loginSuccess({ role: userRole, user: userData })
                      );
                      const objData = getLookup();
                      navigateBasedOnRole(
                        successResponse[0]._response.user_profile[0].role
                      );
                    } else {
                      setErrors(
                        "Login failed due to missing token or user data."
                      );
                    }
                  }
                },
                (errorResponse) => {
                  navigate("/login");
                }
              );
            }
          }
        },
        (errorResponse) => {
          let err = "";
          if (errorResponse.errors) {
            err = errorResponse.errors.msg[0].msg;
          } else {
            err = errorResponse[0]._errors.message;
          }
          setErrors(err);
        }
      );
    }
  };

  const navigateBasedOnRole = async () => {
    const roleName = await localforage.getItem("roleName");
    if (roleName === "CONSUMER") {
      navigate("/consumer/dashboard");
    } else if(roleName == 'DELIVERY_BOY') {
      navigate("/deliveryboy/add-vehicle");
    }else{
      navigate("/thanks");
    }
  };
  useEffect(() => {
    const getRole = async () => {
      const roleName = await localforage.getItem("roleName");
      setRole(roleName);
    };
    getRole();
    if (user === undefined || user === "") {
      navigate("/login");
    }
  }, []);

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

  const handleInputPaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("Text").trim();
    if (pasteData.length === otp.length) {
      const newOTP = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOTP[i] = pasteData[i];
      }
      setOTP(newOTP);
    }
  };
  return (
    <PageContainer>
      <MainContent>
        <Title>OTP Verification</Title>
        <Subtitle>
          We have sent a 6 digit code to your email address please confirm the
          code below
        </Subtitle>
        <OTPContainer>
          {otp.map((digit, index) => (
            <OTPInputBox
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e)}
              onPaste={(e) => handleInputPaste(e)}
              placeholder="0"
            />
          ))}
        </OTPContainer>
        <ResendCodeContainer>
          {/* <button
            className={Styles.resendCodeBtn}
            type="button"
            onClick={resetHandler}
          >
            Resend Code
          </button> */}
        </ResendCodeContainer>
        <SubmitButton disabled={false} onClick={handleOtpSubmit} type="button">
          {loading ? "Loading..." : "Submit"}
        </SubmitButton>

        {error && <p className={Styles.errorColor}>{error}</p>}
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(180deg, #fff2ce 0%, rgba(255, 242, 206, 0) 100%);
`;

const MainContent = styled.main`
  padding: 50px 20px 50px; // Adjust top padding to account for fixed header
  width: 100%;
  max-width: 600px;
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
`;

const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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

const ResendCodeContainer = styled.div`
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ffc72b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 25px;
`;

export default SingupVerify;
