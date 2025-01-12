import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Styles from "../assets/css/ContactModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function ContactModal({ show, handleClose }) {
  return (
    <Modal size="xl" show={show} onHide={handleClose} centered>
      <Modal.Body className={Styles.HomeContactModalBodyModal}>
        <section>
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className={Styles.homeContactModalDetailsCard}>
                  <h4 className={Styles.homeContactModalTitleText}>
                    Contact us
                  </h4>
                  <p className={Styles.homeContactModalDiscriptionText}>
                    Say something to start an email thread
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        <Form.Label
                          className={Styles.homeContactModalFormLabel}
                        >
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
                        className={
                          Styles.homeContactModalFromMessageSendBtnCard
                        }
                      >
                        <button
                          className={Styles.homeContactModalFromMessageSendBtn}
                        >
                          Send Message
                        </button>

                        <button
                          className={Styles.HomeContactModalCloseModalBtn}
                          onClick={handleClose}
                        >
                          Close
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

export default ContactModal;
