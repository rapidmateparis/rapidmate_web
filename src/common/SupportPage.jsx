import { Form } from "react-bootstrap";
import Styles from "../assets/css/ContactModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/website/Header";
import WebFooter from "../components/website/WebFooter";

function SupportPage() {
  return (
    <>
      <Header />
      <section>
        <div className={Styles.mainSupportSecCard}>
          <div className="row">
            <div className="col-md-6">
              <div className={Styles.homeContactModalDetailsCard}>
                <h4 className={Styles.homeContactModalTitleText}>
                  We're Here to Help!
                </h4>
                <p className={Styles.homeContactModalDiscriptionText}>
                  Have questions or need assistance? Reach out to us, and our
                  team will get back to you as soon as possible. Whether it's
                  through email, phone, or visiting our office, we're always
                  ready to support you.
                </p>
                <div className={Styles.homeContactModalNumberMainCard}>
                  <a
                    href="Tel:+33761406084"
                    className={Styles.homeContactModalNumberCard}
                  >
                    <FontAwesomeIcon
                      className={Styles.homeContactModalPhoneIcon}
                      icon={faPhone}
                    />
                    <p className={Styles.homeContactModalNumbertext}>
                      +33761406084
                    </p>
                  </a>

                  <a
                    href="mailTo:contact@rapidmate.fr"
                    className={Styles.homeContactModalNumberCard}
                  >
                    <FontAwesomeIcon
                      className={Styles.homeContactModalPhoneIcon}
                      icon={faEnvelope}
                    />
                    <p className={Styles.homeContactModalNumbertext}>
                      contact@rapidmate.fr
                    </p>
                  </a>

                  <div className={Styles.homeContactModalNumberCard}>
                    <FontAwesomeIcon
                      className={Styles.homeContactModalPhoneIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.homeContactModalNumbertext}>
                      8B Avenue Danielle Casanova, 95210 Saint-Gratien, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Form className={Styles.homeContactModalFormMainCardForm}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-2 mr-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        First Name
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactModalFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactModalFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-2 mr-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        Email
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactModalFormInput}
                        type="email"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactModalFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group
                      className="mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        Subject
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactModalFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group
                      className="mb-2"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactModalFormLabel}>
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        className={Styles.homeContactModalFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <div
                      className={Styles.homeContactModalFromMessageSendBtnCard}
                    >
                      <button
                        className={Styles.homeContactModalFromMessageSendBtn}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="embed-map-responsive">
          <div className="embed-map-container">
            <iframe
              className="embed-map-frame"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=600&height=400&hl=en&q=ajs%20borne&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              title="Google Map"
            ></iframe>
          </div>
        </div>
        <style>{`
        .embed-map-responsive {
          position: relative;
          text-align: right;
          width: 100%;
          height: 500px;
        }
        .embed-map-container {
          overflow: hidden;
          background: none !important;
          width: 100%;
          height: 500px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .embed-map-frame {
          width: 100% !important;
          height: 500px;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
      </section>
      <WebFooter />
    </>
  );
}

export default SupportPage;
