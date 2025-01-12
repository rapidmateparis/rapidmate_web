import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import { Link } from "react-router-dom";

const WebPrivacyPolicy = () => {
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
                  Privacy <span>Policy</span>
                </h1>
                <h3>
                  Last Updated: <span>January 4, 2025</span>
                </h3>
                <p>
                  Rapidmate ("we," "us," "our") is committed to protecting your
                  data. This Privacy Policy explains how we collect, use, share,
                  and protect your data and describes your rights under
                  applicable laws, including the General Data Protection
                  Regulation (GDPR).
                </p>
                <p>
                  Please review this policy regularly, as it may be updated
                  periodically.
                </p>
                <h3>1. Who We Are</h3>
                <p>
                  Rapidmate provides logistics services, connecting businesses
                  with delivery professionals to ensure fast and reliable
                  deliveries across France. <b>Rapidmate</b> operates under its parent
                  company, <b>AJS GROUP</b>, which is responsible for issuing
                  all invoices and bills related to our services. For questions
                  or concerns about your data, contact us at:
                </p>
                <h3>
                  Email:{" "}
                  <span>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </span>
                </h3>
                <h3>
                  Postal Address:{" "}
                  <span>8 B Av. Danielle Casanova ,95210 Saint -Gratien</span>
                </h3>
                <h3>2. Data We Collect</h3>
                <h3>2.1. From Website Visitors</h3>
                <ul>
                  <li>
                    <p>
                      <b>Data Collected:</b> IP address, browser type, cookies,
                      and information provided via contact forms (name, email,
                      phone number).
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Purpose:</b> Website functionality, responding to
                      inquiries, analytics, and marketing.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Lawful Basis:</b> Consent (for cookies) and legitimate
                      interests (analytics and communication).
                    </p>
                  </li>
                </ul>
                <h3>2.2. From Registered Users (Businesses/Customers)</h3>
                <ul>
                  <li>
                    <p>
                      <b>Data Collected:</b>
                    </p>
                    <ul>
                      <li>
                        <p>
                          Personal identifiers (name, email, phone number,
                          address).
                        </p>
                      </li>
                      <li>
                        <p>
                          Payment details (processed securely via third-party
                          providers).
                        </p>
                      </li>
                      <li>
                        <p>
                          Delivery information (pickup and drop-off addresses,
                          item descriptions).
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <b>Purpose:</b> Service delivery, billing, customer
                      support, and dispute resolution.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Lawful Basis:</b> Contractual necessity and legitimate
                      interests.
                    </p>
                  </li>
                </ul>
                <h3>2.3. From Couriers:</h3>
                <ul>
                  <li>
                    <p>
                      <b>Data Collected:</b>
                    </p>
                    <ul>
                      <li>
                        <p>
                          Personal identifiers (name, email, phone number,
                          vehicle details).
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>SIRET number</b> (for individual
                          entrepreneurs/self-employed couriers).
                        </p>
                      </li>
                      <li>
                        <p>Financial details (bank account for payments).</p>
                      </li>
                      <li>
                        <p>
                          Geolocation data (during active delivery periods).
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <b>Purpose:</b> Identity verification, assignment of
                      delivery tasks, payment processing, and safety and
                      Verification of delivery professional identity through
                      photo capture, ensuring the authenticity and security of
                      the individual handling the delivery.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Lawful Basis:</b> Contractual necessity, legal
                      obligations, and legitimate interests.
                    </p>
                  </li>
                </ul>
                <h3>2.4. Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies to enhance your experience on our website.
                  Cookies are small text files that help us remember your
                  preferences, improve functionality, and provide analytics
                  about website usage.
                </p>
                <p>
                  For more details about how we use cookies and how you can
                  control them, please refer to our Terms & Conditions.
                </p>
                <p>
                  <b>Lawful Basis:</b> Consent (for non-essential cookies).
                </p>
                <ul>
                  <li>
                    <p>
                      We rely on your consent to use non-essential cookies. You
                      have the right to withdraw or modify your consent at any
                      time through your browser settings or the cookie
                      preferences provided.
                    </p>
                  </li>
                </ul>
                <p>
                  By continuing to use our website, you consent to the use of
                  non-essential cookies unless you opt-out using the options
                  provided.
                </p>
                <p>
                  We use cookies to enhance user experience, provide analytics,
                  and ensure website functionality. Cookies are categorized into
                  essential and non-essential types. Essential cookies are
                  necessary for the basic operation of our platform, while
                  non-essential cookies are used for analytics and marketing
                  purposes.
                </p>
                <p>
                  You can manage your cookie preferences via our dedicated
                  cookie settings page or by adjusting your browser settings.
                  For non-essential cookies, we rely on user consent, which can
                  be withdrawn or modified at any time.
                </p>
                <h3>3. How We Use Your Data</h3>
                <p>We use your personal data for the following purposes:</p>
                <ol>
                  <li>
                    <p>
                      <b>Service Provision:</b> To process orders, assign
                      deliveries, and ensure timely logistics operations.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Customer Support:</b> To address inquiries, complaints,
                      and disputes.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Marketing:</b> To send promotional materials (with your
                      consent).
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Analytics:</b> To improve our services through usage
                      data analysis.
                    </p>
                  </li>
                </ol>
                <h3>4. Data Sharing</h3>
                <p>We may share your data with:</p>
                <ul>
                  <li>
                    <p>
                      <b>Service Providers:</b> For hosting, payment processing,
                      and customer communication. These providers include
                      [Service Providers' Names], who ensure GDPR compliance and
                      data protection.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Couriers:</b> Limited data (e.g., delivery addresses)
                      necessary for completing deliveries.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Legal Authorities:</b> As required by law, including
                      for tax and regulatory compliance.
                    </p>
                  </li>
                </ul>
                <p>
                  Rapidmate does not sell your personal data to third parties.
                </p>
                <h3>5. International Data Transfers</h3>
                <p>
                  If your data is transferred outside the European Economic Area
                  (EEA), we ensure compliance with GDPR through appropriate
                  safeguards, such as standard contractual clauses or equivalent
                  measures. For example, we use [Service Provider Names] for
                  hosting/payment processing, which adhere to GDPR-compliant
                  data protection practices.
                </p>
                <h3>6. Data Retention</h3>
                <p>
                  We retain personal data for the following periods, which are
                  aligned with our operational and legal needs:
                </p>
                <ul>
                  <li>
                    <p>
                      <b>Customer Data:</b> Retained up to 3 years after your
                      last activity on the platform. This ensures we have a
                      complete record of our transactions for customer support
                      and legal compliance.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Courier Data:</b> Retained up to 5 years after account
                      deactivation, in line with legal requirements related to
                      labor and transportation regulations.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Payment Records:</b> Retained for 10 years to comply
                      with tax and financial regulations.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Cookies and Analytics:</b> Data is retained for up to 1
                      year for tracking and improving our website and services.
                    </p>
                  </li>
                </ul>
                <h3>7. Security Measures</h3>
                <p>
                  We employ robust technical and organizational measures to
                  protect your data, including:
                </p>
                <ul>
                  <li>
                    <p>Encryption of sensitive data.</p>
                  </li>
                  <li>
                    <p>Restricted access to personal data.</p>
                  </li>
                  <li>
                    <p>Regular audits and breach response procedures.</p>
                  </li>
                </ul>
                <h3>8. Your Rights</h3>
                <p>Under GDPR, you have the following rights:</p>
                <ul>
                  <li>
                    <p>
                      <b>Access:</b> Request a copy of the personal data we hold
                      about you.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Rectification:</b> Correct inaccurate or incomplete
                      data.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Erasure:</b> Request deletion of your data, subject to
                      legal and contractual obligations.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Restriction:</b> Limit processing of your data under
                      specific circumstances.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Portability:</b> Transfer your data to another service
                      provider.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Objection:</b> Object to data processing based on
                      legitimate interests.
                    </p>
                  </li>
                </ul>
                <p>
                  To exercise your rights, contact us at:{" "}
                  <a href="mailto:contact@rapidmate.fr">contact@rapidmate.fr</a>
                </p>
                <h3>9.Account Deletion</h3>
                <p>
                  You may request the deletion of your account at any time by
                  contacting us through{" "}
                  <a href="mailto:contact@rapidmate.fr">contact@rapidmate.fr</a>{" "}
                  or using the support feature available on the platform. Upon
                  receiving your request, we will process the deletion of your
                  account in accordance with our policies.
                </p>
                <p>
                  Once your account is deleted, you will no longer have access
                  to any of the services associated with your account. Please be
                  aware that account deletion is permanent and irreversible.
                  After deletion, you will lose access to any data, records, or
                  content associated with your account, except where we are
                  required by law to retain certain information.
                </p>
                <p>
                  We may retain certain information for legitimate business or
                  legal reasons, such as transaction history or records required
                  for compliance with applicable laws and regulations.
                </p>
                <p>
                  If you have any questions about the account deletion process,
                  please contact us at{" "}
                  <a href="mailto:contact@rapidmate.fr">contact@rapidmate.fr</a>
                  .
                </p>
                <h3>10. Complaints</h3>
                <p>
                  If you believe your data rights have been violated, we
                  encourage you to first reach out to <b>Rapidmate</b> directly
                  to address and resolve the issue. You can contact us via email
                  at{" "}
                  <b>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </b>
                </p>
                <p>
                  If your concerns are not resolved to your satisfaction, you
                  have the right to file a complaint with:
                </p>
                <ul>
                  <li>
                    <p>
                      Commission Nationale de l'Informatique et des Libertés
                      (CNIL) via{" "}
                      <a href="https://www.cnil.fr" target="_blank">
                        cnil.fr
                      </a>
                    </p>
                  </li>
                </ul>
                <h3>11. Automated Decision-Making</h3>
                <p>
                  We do not use your data for automated decision-making or
                  profiling. However, we may use data for logistical purposes,
                  such as assigning deliveries to the appropriate couriers,
                  which is not considered automated decision-making under GDPR.
                </p>
                <h3>12. Children’s Privacy</h3>
                <p>
                  Our services are not directed towards individuals under the
                  age of 16. We do not knowingly collect or process personal
                  data from children. If we become aware that we have
                  inadvertently collected personal data from a child without
                  appropriate consent, we will take steps to delete such
                  information promptly.
                </p>
                <h3>13. Updates to This Policy</h3>
                <p>
                  This Privacy Policy may be updated periodically. The latest
                  version will always be available on our website, and any
                  significant changes will be communicated to you via email or
                  through notifications.
                </p>
                <h3>
                  Last Updated: <span>January 4, 2025</span>
                </h3>
                <h3>Contact Information</h3>
                <p>
                  For any questions about this Privacy Policy, contact us at:
                </p>
                <h3>
                  Email:{" "}
                  <span>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </span>
                </h3>
                <h3>
                  Postal Address:{" "}
                  <span>8 B Av. Danielle Casanova ,95210 Saint -Gratien</span>
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

export default WebPrivacyPolicy;
