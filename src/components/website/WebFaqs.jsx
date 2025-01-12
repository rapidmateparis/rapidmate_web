import React, { useState } from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const WebFaqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "What is Rapidmate?",
      answer:
        "Rapidmate is a platform for package delivery that allows couriers to earn on their own schedules.",
    },
    {
      question: "How can I become a courier?",
      answer:
        "You can apply to become a courier by filling out the application form on our website.",
    },
    {
      question: "What are the requirements for couriers?",
      answer:
        "Couriers must have a valid driver's license, a vehicle, and meet local regulations.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <section className={Styles.WebRapidmateFaqMainSec}>
        <div>
          <h2 className={Styles.WebRapidmateFaqMainTitle}>FAQ</h2>
          <div className={Styles.FaqContainer}>
            {faqs.map((faq, index) => (
              <div key={index} className={Styles.FaqItem}>
                <div
                  className={Styles.FaqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <FontAwesomeIcon
                    icon={activeIndex === index ? faChevronUp : faChevronDown}
                    className={Styles.FaqIcon}
                  />
                </div>
                {activeIndex === index && (
                  <div className={Styles.FaqAnswer}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WebFaqs;
