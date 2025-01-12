import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";

const WebTermsOfService = () => {
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
                  Terms & Conditions for <span>Rapidmate</span>
                </h1>
                <h3>
                  Effective Date: <span>02/01/2025</span>
                </h3>
                <h3>
                  Last Updated: <span>02/01/2025</span>
                </h3>
                <h3>1. General Provisions</h3>
                <h3>1.1 Introduction:</h3>
                <p>
                  <b>
                    Introduction: Rapidmate is a division/brand of AJS Group, a
                    company registered in Pontoise registry, with company
                    registration number SIRET: 92270101600011. All services
                    provided by Rapidmate are under the legal and financial
                    responsibility of AJS Group. Rapidmate provides a technology
                    platform connecting businesses and individuals (referred to
                    as "Users") with freelance delivery professionals
                    ("Couriers") to offer scalable, reliable, and eco-friendly
                    logistics services across France.
                  </b>
                </p>
                <p>
                  Rapidmate provides a technology platform connecting businesses
                  and individuals (referred to as "Users") with freelance
                  delivery professionals ("Couriers") to offer scalable,
                  reliable, and eco-friendly logistics services across France.
                </p>
                <h3>1.2 Definitions</h3>
                <ul>
                  <li>
                    <p>
                      <b>“User”:</b> Any individual or entity that books
                      delivery services through the Rapidmate platform.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Courier”:</b> A freelance professional registered on
                      the platform to fulfil delivery requests.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Platform”:</b> The technology systems, including the
                      website and app, through which services are accessed.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Service”:</b> Refers to all logistics, delivery, and
                      cleaning solutions provided by Rapidmate, including but
                      not limited to transportation, delivery from businesses to
                      end customers, package handling, route optimization,
                      multi-tasking personnel, cleaning services, and any other
                      related services offered by Rapidmate.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Goods”:</b> Items being transported, excluding
                      prohibited items outlined in Section 7.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Fee”:</b> Refers to the amount payable for the
                      services provided by Rapidmate. Currently, no additional
                      fees are charged for delivery services, waiting, or
                      cancellations. Any future changes or additional fees will
                      be communicated to clients in advance.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>“Force Majeure”:</b> Events beyond reasonable control,
                      including natural disasters, strikes, or government
                      actions.
                    </p>
                  </li>
                </ul>
                <h3>1.3 Acceptance of Terms</h3>
                <p>
                  By accessing or using the Rapidmate Platform, Users and
                  Couriers agree to these Terms & Conditions. Non-compliance may
                  lead to account suspension or termination.
                </p>
                <h3>1.4 Geographical Scope</h3>
                <p>
                  Rapidmate operates exclusively within France, covering all
                  regions for delivery services.
                </p>
                <h3>2. Services Provided</h3>
                <h3>2.1 For Users</h3>
                <ul>
                  <li>
                    <p>
                      <b>Delivery Types:</b> Rapidmate facilitates on-demand
                      deliveries, scheduled deliveries, and multi-address drops
                      for B2B and B2C services.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Booking:</b> Users can request services via the app or
                      website by providing accurate pickup and delivery
                      information.
                    </p>
                  </li>
                </ul>
                <h3>2.2 For Couriers</h3>
                <ul>
                  <li>
                    <p>
                      <b>Opportunities:</b> The platform offers Couriers
                      flexible opportunities to accept and fulfill delivery
                      requests.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Payment:</b> Couriers earn income per completed
                      delivery, with bonuses for high performance or
                      sustainability contributions (e.g., electric vehicle use).
                    </p>
                  </li>
                </ul>
                <h3>2.3 Platform Facilitation</h3>
                <p>
                  Rapidmate acts as an intermediary, facilitating connections
                  between Users and Couriers. Rapidmate does not directly
                  provide delivery services or act as an employer of Couriers.
                </p>
                <h3>3. User Obligations</h3>
                <h3>3.1 Accurate Information</h3>
                <p>
                  {" "}
                  Users must provide correct and complete details for pickup and
                  delivery addresses.
                </p>
                <h3>3.2 Packaging Requirements</h3>
                <ul>
                  <li>
                    <p>
                      Goods must be securely packaged to withstand standard
                      delivery handling.
                    </p>
                  </li>
                  <li>
                    <p>
                      Prohibited items (Section 7) must not be included in
                      deliveries.
                    </p>
                  </li>
                </ul>
                <h3>3.3 Service Fees</h3>
                <p>
                  Users agree to pay all applicable fees, including waiting
                  charges and late cancellation penalties, as outlined in the
                  pricing structure.
                </p>
                <h3>3.4 Compliance with Laws</h3>
                <p>
                  Users must ensure that all Goods comply with applicable French
                  laws, including restrictions on hazardous or illegal items.
                </p>
                <h3>4. Courier Obligations</h3>
                <h3>4.1 Eligibility</h3>
                <ul>
                  <li>
                    <p>
                      Couriers must be at least 18 years old, possess valid
                      identification, and, where applicable, a valid driver’s
                      license.
                    </p>
                  </li>
                  <li>
                    <p>
                      Couriers using vehicles must ensure they are roadworthy,
                      insured, and meet all legal standards.
                    </p>
                  </li>
                </ul>
                <h3>4.2 Delivery Conduct</h3>
                <ul>
                  <li>
                    <p>
                      Couriers are required to act professionally, comply with
                      traffic laws, and handle Goods with care.
                    </p>
                  </li>
                  <li>
                    <p>
                      Misconduct, including delayed or incomplete deliveries,
                      may result in account suspension.
                    </p>
                  </li>
                </ul>
                <h3>4.3 Equipment</h3>
                <p>
                  Couriers must use appropriate equipment (e.g., insulated bags
                  for perishable items) as specified for certain delivery types.
                </p>
                <h3>4.4 Performance Standards</h3>
                <p>
                  Couriers are expected to maintain high service standards,
                  including on-time deliveries and adherence to User
                  instructions.
                </p>
                <h3>5. Pricing, Payments, and Cancellations</h3>
                <h3>5.1 Pricing</h3>
                <ul>
                  <li>
                    <p>
                      Service fees are calculated based on delivery type,
                      distance, and additional requirements (e.g., waiting time,
                      multi-address drops).
                    </p>
                  </li>
                  <li>
                    <p>Fees are displayed upfront before confirmation.</p>
                  </li>
                </ul>
                <h3>5.2 Payments</h3>
                <p>
                  Payments for services rendered are processed through the
                  Rapidmate Platform. Couriers are typically paid on a{" "}
                  <b>weekly basis</b> for completed deliveries. However, in
                  specific cases, exceptions may apply:
                </p>
                <ol>
                  <li>
                    <p>
                      <b>Shift-Based Payments:</b> Couriers booked on a shift
                      basis may have the option to receive payments weekly or
                      monthly, based on the terms agreed upon during booking.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Admin-Approved Exceptions:</b> Rapidmate reserves the
                      right to offer flexibility in payment schedules, subject
                      to approval by the administrative team.
                    </p>
                  </li>
                  <li>
                    <p>
                      users must pay via the app or website; direct payments to
                      Couriers are prohibited.
                    </p>
                  </li>
                </ol>
                <p>
                  Rapidmate maintains all records related to completed
                  deliveries and shifts to ensure accurate payment calculations.
                  Any disputes related to payments must be raised by Couriers
                  within <b>7 days</b> of receiving the payment.
                </p>
                <h3>5.3 Cancellations</h3>
                <ul>
                  <li>
                    <p>
                      Users can cancel orders free of charge if done before a
                      Courier is dispatched.
                    </p>
                  </li>
                  <li>
                    <p>
                      Late cancellations may incur fees to compensate the
                      assigned Courier.
                    </p>
                  </li>
                </ul>
                <h3>6. Liability</h3>
                <h3>6.1 User Liability</h3>
                <p>
                  Users are liable for ensuring the legality and safety of Goods
                  transported.
                </p>
                <h3>6.2 Courier Liability</h3>
                <p>
                  Couriers are liable for damages resulting from negligence or
                  intentional misconduct.
                </p>
                <h3>6.3 Rapidmate Liability</h3>
                <ul>
                  <li>
                    <p>
                      Rapidmate is not liable for delays, losses, or damages
                      caused by User-provided misinformation, traffic
                      disruptions, or Force Majeure.
                    </p>
                  </li>
                  <li>
                    <p>
                      Claims must be submitted within 48 hours of delivery for
                      review.
                    </p>
                  </li>
                </ul>
                <h3>7. Prohibited Items</h3>
                <p>
                  The following items are strictly prohibited from being
                  included in deliveries handled by Rapidmate. By using our
                  services, you agree not to ship or request the transport of
                  the items listed below:
                </p>
                <h3>7.1 Hazardous Materials</h3>
                <ul>
                  <li>
                    <p>
                      Flammable, explosive, or combustible substances, such as
                      gasoline, lighter fluid, or fireworks.
                    </p>
                  </li>
                  <li>
                    <p>
                      Toxic, corrosive, or radioactive materials, including
                      certain chemicals, batteries, or materials marked as
                      hazardous under French law.
                    </p>
                  </li>
                  <li>
                    <p>
                      Weapons, ammunition, or any items classified as dangerous
                      by relevant authorities.
                    </p>
                  </li>
                </ul>
                <h3>7.2 Illegal Items</h3>
                <ul>
                  <li>
                    <p>
                      Any items that are illegal under French law or
                      international regulations, including counterfeit goods,
                      narcotics, or stolen property.
                    </p>
                  </li>
                  <li>
                    <p>
                      Goods violating intellectual property laws, such as
                      pirated media or unlicensed merchandise.
                    </p>
                  </li>
                </ul>
                <h3>7.3 Perishable Goods</h3>
                <ul>
                  <li>
                    <p>
                      Perishable items require specific temperature control
                      unless explicitly agreed upon in advance and packaged
                      according to our guidelines.
                    </p>
                  </li>
                  <li>
                    <p>
                      Food, beverages, or other perishables that may spoil or
                      pose health risks during transit.
                    </p>
                  </li>
                </ul>
                <h3>7.4 Restricted or Regulated Items</h3>
                <ul>
                  <li>
                    <p>
                      Medicines, medical devices, or pharmaceutical products
                      unless proper documentation is provided and prior approval
                      is obtained.
                    </p>
                  </li>
                  <li>
                    <p>
                      Alcohol or tobacco products without the required permits
                      and compliance with local laws.
                    </p>
                  </li>
                  <li>
                    <p>
                      Items requiring special permits, such as cultural
                      artifacts or wildlife products, unless approved in writing
                      by Rapidmate.
                    </p>
                  </li>
                </ul>
                <h3>7.5 High-Value Items</h3>
                <h3>Handling of High-Cost Items</h3>
                <p>Definition and Scope of High-Cost Items</p>
                <p>
                  For the purposes of this agreement, "High-Cost Items" are
                  goods or products with significant monetary value, typically
                  exceeding €2,500, or any item with intrinsic or sentimental
                  value, such as:
                </p>
                <p>Jewelry and precious metals</p>
                <p>Cash or negotiable instruments (e.g., checks, bonds)</p>
                <p>Expensive electronics, designer items, or luxury goods</p>
                <p>Antiques, artworks, and collectibles</p>
                <p>Responsibility and Risk Management</p>
                <h3>Declaration and Insurance</h3>
                <p>
                  Customers must declare any High-Cost Items during the booking
                  process.{" "}
                </p>
                <p>
                  Rapidmate strongly recommends that customers arrange adequate
                  insurance for such items before delivery. Without insurance,
                  the customer assumes full responsibility for any risk of
                  damage, loss, or theft.
                </p>
                <p>Liability and Compensation</p>
                <h3>Damage to High-Cost Items</h3>
                <h3>If the cost of the damaged item is high:</h3>
                <p>
                  {" "}
                  Rapidmate will not be held liable for damage or loss of
                  high-cost items, regardless of the circumstances. Customers
                  are advised to insure such items through their chosen provider
                  to safeguard against potential risks.
                </p>
                <h3>If the cost of the damaged item is lower:</h3>
                <p> Liability depends on the nature of the incident:</p>
                <h3>Damage caused by the Rapidmate delivery personnel:</h3>
                <ul>
                  <li>
                    <p>
                      If damage occurs due to negligence or mishandling by
                      Rapidmate’s delivery personnel, compensation will be
                      handled through the delivery personnel's commercial
                      insurance.
                    </p>
                  </li>
                </ul>
                <h3>
                  Damage caused by external accidents (e.g., other vehicles):
                </h3>
                <ul>
                  <li>
                    <p>
                      If damage results from a third-party accident, Rapidmate
                      will assist in facilitating a claim process where
                      applicable, but the customer acknowledges that Rapidmate
                      holds no liability for such incidents.
                    </p>
                  </li>
                </ul>
                <h3>Zero Impact Policy for Rapidmate</h3>
                <p>
                  Rapidmate strives to maintain a zero-liability stance for
                  high-cost items. This ensures that the company is not
                  financially or legally impacted by claims related to such
                  items. To ensure this:
                </p>
                <p>
                  Customers are required to secure insurance for high-cost
                  items.
                </p>
                <p>
                  Rapidmate will not be responsible for losses, damages, or
                  theft involving high-cost items, irrespective of the cause.
                </p>
                <p>Customer Acknowledgment</p>
                <p>By booking with Rapidmate, the customer agrees to:</p>
                <ul>
                  <li>
                    <p>Declare high-cost items at the time of booking.</p>
                  </li>
                  <li>
                    <p>
                      Assume full responsibility for arranging insurance for any
                      high-cost items.
                    </p>
                  </li>
                  <li>
                    <p>
                      Indemnify Rapidmate against any claims, losses, or damages
                      resulting from the transportation of high-cost items.
                    </p>
                  </li>
                </ul>
                <h3>7.6 Other Prohibited Items</h3>
                <ul>
                  <li>
                    <p>
                      Live animals or plants unless explicitly agreed upon with
                      appropriate packaging and handling arrangements.
                    </p>
                  </li>
                  <li>
                    <p>Human remains, body parts, or biological specimens.</p>
                  </li>
                  <li>
                    <p>
                      Items emitting strong odors or substances that may damage
                      other goods or equipment.
                    </p>
                  </li>
                </ul>
                <h3>Consequences of Non-Compliance</h3>
                <ol>
                  <li>
                    <p>
                      <b>Refusal of Service:</b> Rapidmate reserves the right to
                      refuse pickup or delivery of any shipment suspected of
                      containing prohibited items.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Liability:</b> If prohibited items are shipped without
                      disclosure, the client assumes all liability, including
                      fines, penalties, or damages incurred.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Reporting:</b> Rapidmate may report the shipment of
                      illegal items to relevant authorities as required by law.
                    </p>
                  </li>
                </ol>
                <h3>8. Dispute Resolution</h3>
                <h3>8.1 Complaint Submission</h3>
                <p>
                  Complaints must be sent to the rapidmate customer support via
                  email or by courier within 7 days of the incident.
                </p>
                <h3>8.2 Resolution Process</h3>
                <p>
                  Rapidmate will acknowledge complaints within 48 hours and
                  provide a resolution within 14 days.
                </p>
                <h3>8.3 Escalation</h3>
                <p>
                  {" "}
                  Unresolved disputes may be referred to mediation or
                  arbitration under French law.
                </p>
                <h3>9. Compliance and Sustainability</h3>
                <h3>9.1 Sustainability Commitment</h3>
                <ul>
                  <li>
                    <p>
                      Rapidmate is committed to promoting eco-friendly practices
                      and fostering sustainability in delivery operations. To
                      encourage the adoption of environmentally conscious
                      behaviors, we provide resources and education to both
                      Users and Couriers on sustainable practices.
                    </p>
                  </li>
                  <li>
                    <p>
                      While Rapidmate does not currently offer financial
                      incentives for couriers using electric vehicles, we are
                      exploring opportunities to support sustainable delivery
                      methods in the future.
                    </p>
                  </li>
                </ul>
                <h3>9.2 Legal Compliance</h3>
                <p>
                  Users and Couriers must adhere to all applicable French laws
                  regarding delivery, transportation, and data privacy.
                </p>
                <h3>10. Amendments and Governing Law</h3>
                <h3>10.1 Amendments</h3>
                <p>
                  {" "}
                  Rapidmate reserves the right to update these Terms &
                  Conditions with prior notice to Users and Couriers.
                </p>
                <h3>10.2 Governing Law</h3>
                <p>These Terms & Conditions are governed by French law.</p>
                <h3>11. Account Deletion</h3>
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
                </p>
                <h3>Contact Information</h3>
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

export default WebTermsOfService;
