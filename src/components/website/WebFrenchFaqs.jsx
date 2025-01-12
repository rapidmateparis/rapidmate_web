import React, { useState } from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const WebFrenchFaqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "Qu'est-ce que Rapidmate ?",
      answer:
        "Rapidmate est une plateforme de livraison de colis qui permet aux coursiers de travailler selon leurs propres horaires.",
    },
    {
      question: "Comment puis-je devenir coursier ?",
      answer:
        "Vous pouvez postuler pour devenir coursier en remplissant le formulaire de candidature sur notre site web.",
    },
    {
      question: "Quelles sont les exigences pour les coursiers ?",
      answer:
        "Les coursiers doivent avoir un permis de conduire valide, un véhicule et respecter les réglementations locales.",
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

export default WebFrenchFaqs;
