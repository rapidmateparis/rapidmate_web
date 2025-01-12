import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Styles from "../../assets/webcss/WebContactModal.module.css";
import ContactBanner from "../../assets/webImages/ContactBannerImage.png";
import Twitter from "../../assets/webImages/Contact-Twitter.png";
import Facebook from "../../assets/webImages/Contact-Facebook.png";
import Insta from "../../assets/webImages/Contact-Insta.png";
import Linkdin from "../../assets/webImages/Contact-Linkdin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WebContactModal({ show, handleClose }) {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal size="xl" show={show} onHide={handleClose} centered>
      <Modal.Body className={Styles.HomeContactModalBodyModal}>
        <section>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className={Styles.homeContactModalDetailsCard}>
                  <h4 className={Styles.homeContactModalTitleText}>
                    {t("contact_us")}
                  </h4>
                  <p className={Styles.homeContactModalDiscriptionText}>
                    {t("contact_us_description")}
                  </p>
                  <div className={Styles.homeContactModalNumberMainCard}>
                    <div className={Styles.homeContactModalNumberCard}>
                      <FontAwesomeIcon
                        className={Styles.homeContactModalPhoneIcon}
                        icon={faPhone}
                      />
                      <p className={Styles.homeContactModalNumbertext}>
                        +33761406084
                      </p>
                    </div>

                    <div className={Styles.homeContactModalNumberCard}>
                      <FontAwesomeIcon
                        className={Styles.homeContactModalPhoneIcon}
                        icon={faEnvelope}
                      />
                      <p className={Styles.homeContactModalNumbertext}>
                        elyas@rapidmate.fr
                      </p>
                    </div>

                    <div className={Styles.homeContactModalNumberCard}>
                      <FontAwesomeIcon
                        className={Styles.homeContactModalPhoneIcon}
                        icon={faLocationDot}
                      />
                      <p className={Styles.homeContactModalNumbertext}>
                        8B Avenue Danielle Casanova, 95210 Saint-Gratien, France
                      </p>
                    </div>

                    <div className={Styles.homeContactModalSocialIconCard}>
                      <Link
                        to="/"
                        className={Styles.homeContactModalSocialIcon}
                      >
                        <img src={Twitter} alt="twitter" />
                      </Link>
                      <Link
                        to="/"
                        className={Styles.homeContactModalSocialIcon}
                      >
                        <img src={Facebook} alt="Facebook" />
                      </Link>
                      <Link
                        to="/"
                        className={Styles.homeContactModalSocialIcon}
                      >
                        <img src={Insta} alt="Instagram" />
                      </Link>
                      <Link
                        to="/"
                        className={Styles.homeContactModalSocialIcon}
                      >
                        <img src={Linkdin} alt="Linkdin" />
                      </Link>
                    </div>

                    <div className={Styles.homeContactModalBannerCard}>
                      <img src={ContactBanner} alt="img" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <Form
                  onSubmit={handleSubmit}
                  className={Styles.homeContactModalFormMainCardForm}
                >
                  <div className="row">
                    {/* First Name */}
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-2 mr-2"
                        controlId="formFirstName"
                      >
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("first_name")}
                        </Form.Label>
                        <Form.Control
                          className={Styles.homeContactModalFormInput}
                          type="text"
                          placeholder="Type here.."
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Last Name */}
                    <div className="col-md-6">
                      <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("last_name")}
                        </Form.Label>
                        <Form.Control
                          className={Styles.homeContactModalFormInput}
                          type="text"
                          placeholder="Type here.."
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <Form.Group className="mb-3 mr-2" controlId="formEmail">
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("email")}
                        </Form.Label>
                        <Form.Control
                          className={Styles.homeContactModalFormInput}
                          type="email"
                          placeholder="Type here.."
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6">
                      <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("phone_number")}
                        </Form.Label>
                        <Form.Control
                          className={Styles.homeContactModalFormInput}
                          type="text"
                          placeholder="Type here.."
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          maxLength={9}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Subject */}
                    <div className="col-md-12">
                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("subject")}
                        </Form.Label>
                        <Form.Control
                          className={Styles.homeContactModalFormInput}
                          type="text"
                          placeholder="Type here.."
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Message */}
                    <div className="col-md-12">
                      <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
                          {t("message")}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          className={Styles.homeContactModalFormInput}
                          placeholder="Type here.."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12">
                      <div
                        className={
                          Styles.homeContactModalFromMessageSendBtnCard
                        }
                      >
                        <button
                          type="submit"
                          className={Styles.homeContactModalFromMessageSendBtn}
                        >
                          {t("send_message")}
                        </button>
                        <button
                          type="button"
                          className={Styles.HomeContactModalCloseModalBtn}
                          onClick={handleClose}
                        >
                          {t("close")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default WebContactModal;
