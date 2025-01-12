import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import { Link } from "react-router-dom";

const WebCookies = () => {
  return (
    <>
      {/* Header Start Here  */}
      <Header />
      <section className={Styles.homePrivacyPolicySec}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={Styles.homePrivacyPolicyCard}>
                <h1>
                  Cookies <span>Consent</span>
                </h1>
                <p>
                  At <b>AJS Group,</b> the parent company of Rapidmate, we value
                  your privacy and are committed to ensuring that your
                  experience on our platform is safe and enjoyable. This cookie
                  consent notice provides important information about the
                  cookies we use on our website and platform, including how you
                  can manage them.
                </p>
                <h3>1. What are Cookies?</h3>
                <p>
                  Cookies are small text files placed on your device when you
                  visit a website. They help us provide a better user experience
                  by remembering your preferences and enabling essential
                  features on our platform.
                </p>
                <h3>2. Types of Cookies We Use</h3>
                <ul>
                  <li>
                    <p>
                      <b>Essential Cookies:</b> These cookies are necessary for
                      the core functionality of the website, such as login and
                      security.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Performance Cookies:</b> These cookies help us analyze
                      how users interact with our platform to improve
                      performance and optimize your experience.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Functional Cookies:</b> These cookies enable us to
                      remember your preferences and customize features, such as
                      language or location settings.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Targeting Cookies:</b> These cookies track your
                      activity to deliver personalized ads or content based on
                      your interests.
                    </p>
                  </li>
                </ul>
                <h3>3. Why Do We Use Cookies?</h3>
                <p>We use cookies for various purposes, including:</p>
                <ul>
                  <li>
                    <p>
                      To ensure the proper functioning of our website and
                      services.
                    </p>
                  </li>
                  <li>
                    <p>
                      To enhance your experience by remembering preferences and
                      settings.
                    </p>
                  </li>
                  <li>
                    <p>
                      To analyze user interactions and improve platform
                      performance.
                    </p>
                  </li>
                  <li>
                    <p>To personalize your content and marketing efforts.</p>
                  </li>
                </ul>
                <h3>4. Managing Cookies</h3>
                <p>
                  You can manage or delete cookies through your browser settings
                  at any time. Please note that blocking or deleting cookies may
                  affect the functionality of our platform and prevent you from
                  accessing certain services.
                </p>
                <p>
                  For more detailed information on how to manage cookies, refer
                  to your browser's help section.
                </p>
                <h3>5. Privacy and Terms</h3>
                <p>
                  For further details on how we process your data and manage
                  your privacy, please review our{" "}
                  <Link to="/web-privacy-policy">Privacy Policy</Link> and{" "}
                  <Link to="/web-terms-service">Terms & Conditions</Link>.
                </p>
                <h3>6. Updates to This Cookie Consent</h3>
                <p><b>Rapidmate</b>, a subsidiary of <b>AJS Group</b>, reserves the right to update this cookie policy. We will notify users of any changes by posting the updated policy on this page. We encourage you to review this policy periodically.</p>
                <h3>7. Contact Us</h3>
                <p>If you have any questions about our use of cookies or this policy, please feel free to contact us:</p>
                <h3>
                  Email:{" "}
                  <span>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </span>
                </h3>
                <h3>
                  Phone:{" "}
                  <span>
                    <a href="tel:+33752371022">[+33752371022]</a>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Start here  */}
      <WebFooter />
    </>
  );
};

export default WebCookies;
