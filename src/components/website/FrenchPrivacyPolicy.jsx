import React from "react";
import Styles from "../../assets/webcss/WebHome.module.css";
import Header from "./Header";
import WebFooter from "./WebFooter";
import { Link } from "react-router-dom";

const FrenchPrivacyPolicy = () => {
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
                  Politique de <span>Confidentialité</span>
                </h1>
                <h3>
                  Dernière mise à jour : <span>4 janvier 2025</span>
                </h3>
                <p>
                  Rapidmate ("nous," "notre") s'engage à protéger vos données.
                  Cette Politique de Confidentialité explique comment nous
                  collectons, utilisons, partageons et protégeons vos données,
                  et décrit vos droits en vertu des lois applicables, notamment
                  le Règlement Général sur la Protection des Données (RGPD).
                </p>
                <p>
                  Veuillez consulter régulièrement cette politique, car elle
                  peut être mise à jour périodiquement.
                </p>
                <h3>1. Qui sommes-nous ?</h3>
                <p>
                  Rapidmate propose des services logistiques, connectant les
                  entreprises avec des professionnels de la livraison pour
                  garantir des livraisons rapides et fiables partout en France.
                  Rapidmate opère sous sa société mère, AJS GROUP, qui est
                  responsable de l’émission de toutes les factures et documents
                  associés à nos services. Pour toute question ou préoccupation
                  concernant vos données, contactez-nous à :
                </p>
                <h3>
                  Email :
                  <span>
                    <a href="mailto:contact@rapidmate.fr">
                      contact@rapidmate.fr
                    </a>
                  </span>
                </h3>
                <h3>
                  Adresse postale :
                  <span>8 B Av. Danielle Casanova, 95210 Saint-Gratien</span>
                </h3>
                <h3>2. Données que nous collectons</h3>
                <h3>2.1. Pour les visiteurs du site web</h3>
                <ul>
                  <li>
                    <p>
                      <b>Données collectées :</b> Adresse IP, type de
                      navigateur, cookies, et informations saisies via les
                      formulaires de contact (nom, email, numéro de téléphone).
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Utilisation :</b> Fonctionnement du site, réponse aux
                      demandes, analyses et marketing.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Base légale :</b> Consentement (pour les cookies) et
                      intérêts légitimes (analyses et communication).
                    </p>
                  </li>
                </ul>
                <h3>
                  2.2. Pour les utilisateurs enregistrés (entreprises/clients)
                </h3>
                <ul>
                  <li>
                    <p>
                      <b>Données collectées :</b>
                    </p>
                    <ul>
                      <li>
                        <p>
                          Identifiants personnels (nom, email, numéro de
                          téléphone, adresse).
                        </p>
                      </li>
                      <li>
                        <p>
                          Détails de paiement (traités de manière sécurisée via
                          des prestataires tiers).
                        </p>
                      </li>
                      <li>
                        <p>
                          Informations de livraison (adresses de ramassage et de
                          livraison, descriptions des articles).
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <b>Utilisation :</b> Prestation de service, facturation,
                      support client et résolution de litiges.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Base légale :</b> Nécessité contractuelle et intérêts
                      légitimes.
                    </p>
                  </li>
                </ul>
                <h3>2.3. Pour les livreurs</h3>
                <ul>
                  <li>
                    <p>
                      <b>Données collectées :</b>
                    </p>
                    <ul>
                      <li>
                        <p>
                          Identifiants personnels (nom, email, numéro de
                          téléphone, détails du véhicule).
                        </p>
                      </li>
                      <li>
                        <p>
                          Numéro SIRET (pour les auto-entrepreneurs/livreurs
                          indépendants).
                        </p>
                      </li>
                      <li>
                        <p>
                          Détails financiers (compte bancaire pour les
                          paiements).
                        </p>
                      </li>
                      <li>
                        <p>
                          Données de géolocalisation (pendant les périodes de
                          livraison actives).
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>
                      <b>Utilisation :</b> Vérification d’identité, attribution
                      des tâches de livraison, traitement des paiements,
                      sécurité et vérification de l’identité du professionnel
                      via la capture photo pour garantir l’authenticité et la
                      sécurité de la livraison.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Base légale :</b> Nécessité contractuelle, obligations
                      légales et intérêts légitimes.
                    </p>
                  </li>
                </ul>
                <h3>2.4. Cookies et technologies de suivi</h3>
                <p>
                  Nous utilisons des cookies pour améliorer votre expérience sur
                  notre site web. Les cookies sont de petits fichiers texte qui
                  nous aident à mémoriser vos préférences, améliorer la
                  fonctionnalité, et fournir des analyses sur l’utilisation du
                  site.
                </p>
                <p>
                  <b>Types de cookies :</b>
                </p>
                <ul>
                  <li>
                    Les cookies essentiels sont nécessaires au fonctionnement de
                    base de notre plateforme.
                  </li>
                  <li>
                    Les cookies non essentiels sont utilisés à des fins
                    d’analyses et de marketing.
                  </li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences de cookies via notre page
                  dédiée ou en ajustant les paramètres de votre navigateur.
                </p>
                <p>
                  <b>Base légale :</b> Consentement (pour les cookies non
                  essentiels).
                </p>
                <p>
                  Nous nous appuyons sur votre consentement pour l’utilisation
                  de cookies non essentiels. Vous avez le droit de retirer ou
                  modifier votre consentement à tout moment via les paramètres
                  de votre navigateur ou les préférences de cookies disponibles.
                </p>
                <p>
                  En continuant à utiliser notre site web, vous consentez à
                  l’utilisation des cookies non essentiels, sauf si vous vous
                  désinscrivez en utilisant les options fournies.
                </p>
                <h3>3. Comment utilisons-nous vos données ?</h3>
                <p>
                  Nous utilisons vos données personnelles pour les finalités
                  suivantes :
                </p>
                <ul>
                  <li>
                    <b>Prestation de service :</b> Traiter les commandes,
                    attribuer les livraisons et garantir des opérations
                    logistiques efficaces.
                  </li>
                  <li>
                    <b>Support client :</b> Répondre aux demandes, plaintes et
                    litiges.
                  </li>
                  <li>
                    <b>Marketing :</b> Envoyer des supports promotionnels (avec
                    votre consentement).
                  </li>
                  <li>
                    <b>Analyses :</b> Améliorer nos services grâce à l’analyse
                    des données d’utilisation.
                  </li>
                </ul>
                <h3>4. Partage des données</h3>
                <p>Nous pouvons partager vos données avec :</p>
                <ul>
                  <li>
                    <b>Fournisseurs de services :</b> Pour l’hébergement, le
                    traitement des paiements et la communication avec les
                    clients. Ces fournisseurs incluent [Noms des Fournisseurs de
                    Services], qui garantissent la conformité au RGPD et la
                    protection des données.
                  </li>
                  <li>
                    <b>Livreurs :</b> Données limitées (par exemple, adresses de
                    livraison) nécessaires pour accomplir les livraisons.
                  </li>
                  <li>
                    <b>Autorités légales :</b> Conformément à la loi, notamment
                    pour la conformité fiscale et réglementaire.
                  </li>
                </ul>
                <p>
                  Rapidmate ne vend pas vos données personnelles à des tiers.
                </p>
                <h3>5. Transferts internationaux de données</h3>
                <p>
                  Si vos données sont transférées en dehors de l’Espace
                  économique européen (EEE), nous garantissons la conformité au
                  RGPD grâce à des mesures de protection appropriées, telles que
                  des clauses contractuelles types ou des mesures équivalentes.
                  Par exemple, nous utilisons [Noms des Fournisseurs] pour
                  l’hébergement/le traitement des paiements, qui respectent les
                  pratiques de protection des données conformes au RGPD.
                </p>
                <h3>6. Conservation des données</h3>
                <p>
                  Nous conservons vos données personnelles pour les durées
                  suivantes, conformément à nos besoins opérationnels et légaux
                  :
                </p>
                <ul>
                  <li>
                    <b>Données clients :</b> Conservées jusqu’à 3 ans après
                    votre dernière activité sur la plateforme pour garantir un
                    suivi complet de nos transactions à des fins de support
                    client et de conformité légale.
                  </li>
                  <li>
                    <b>Données livreurs :</b> Conservées jusqu’à 5 ans après la
                    désactivation du compte, conformément aux exigences légales
                    liées au travail et aux réglementations de transport.
                  </li>
                  <li>
                    <b>Données de paiement :</b> Conservées pendant 10 ans pour
                    respecter les réglementations fiscales et financières.
                  </li>
                  <li>
                    <b>Cookies et analyses :</b> Données conservées jusqu’à 1 an
                    pour le suivi et l’amélioration de notre site web et de nos
                    services.
                  </li>
                </ul>
                <h3>7. Mesures de sécurité</h3>
                <p>
                  Nous employons des mesures techniques et organisationnelles
                  robustes pour protéger vos données, notamment :
                </p>
                <ul>
                  <li>Chiffrement des données sensibles.</li>
                  <li>Accès restreint aux données personnelles.</li>
                  <li>
                    Audits réguliers et procédures de réponse en cas de
                    violation.
                  </li>
                </ul>
                <h3>8. Vos droits</h3>
                <p>En vertu du RGPD, vous disposez des droits suivants :</p>
                <ul>
                  <li>
                    <b>Accès :</b> Demander une copie des données personnelles
                    que nous détenons à votre sujet.
                  </li>
                  <li>
                    <b>Rectification :</b> Corriger des données inexactes ou
                    incomplètes.
                  </li>
                  <li>
                    <b>Effacement :</b> Demander la suppression de vos données,
                    sous réserve des obligations légales et contractuelles.
                  </li>
                  <li>
                    <b>Restriction :</b> Limiter le traitement de vos données
                    dans des circonstances spécifiques.
                  </li>
                  <li>
                    <b>Portabilité :</b> Transférer vos données à un autre
                    prestataire de services.
                  </li>
                  <li>
                    <b>Opposition :</b> Vous opposer au traitement de vos
                    données basé sur des intérêts légitimes.
                  </li>
                </ul>
                <p>
                  Pour exercer vos droits, contactez-nous à :
                  <a href="mailto:contact@rapidmate.fr">contact@rapidmate.fr</a>
                </p>
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
                <h1>9.Suppression de Compte</h1>
                <p>
                  Vous pouvez demander la suppression de votre compte à tout
                  moment en nous contactant via
                  <a href="mailto:contact@rapidmate.fr">
                    {" "}
                    contact@rapidmate.fr
                  </a>
                  ou en utilisant la fonctionnalité de support disponible sur la
                  plateforme. Une fois votre demande reçue, nous traiterons la
                  suppression de votre compte conformément à nos politiques.
                </p>
                <ul>
                  <li>
                    Après la suppression, vous ne pourrez plus accéder à aucun
                    des services associés à votre compte.
                  </li>
                  <li>
                    La suppression du compte est définitive et irréversible.
                  </li>
                  <li>
                    Vous perdrez l’accès à toutes les données, enregistrements
                    ou contenus associés à votre compte, sauf lorsque nous
                    sommes tenus par la loi de conserver certaines informations.
                  </li>
                </ul>
                <p>
                  Nous pouvons conserver certaines informations pour des raisons
                  légitimes ou légales, comme l’historique des transactions ou
                  les enregistrements nécessaires à la conformité avec les lois
                  et réglementations applicables.
                </p>
                <p>
                  Pour toute question concernant le processus de suppression de
                  compte, contactez-nous à :
                  <a href="mailto:contact@rapidmate.fr">
                    {" "}
                    contact@rapidmate.fr
                  </a>
                </p>
                <h3>10.Réclamations</h3>
                <p>
                  Si vous estimez que vos droits relatifs aux données ont été
                  violés, nous vous encourageons à contacter directement
                  Rapidmate afin de résoudre le problème. Vous pouvez nous
                  joindre par email à
                  <a href="mailto:contact@rapidmate.fr">
                    {" "}
                    contact@rapidmate.fr
                  </a>
                  .
                </p>
                <p>
                  Si vos préoccupations ne sont pas résolues à votre
                  satisfaction, vous avez le droit de déposer une plainte auprès
                  de :
                </p>
                <ul>
                  <li>
                    Commission Nationale de l'Informatique et des Libertés
                    (CNIL) via <a href="https://www.cnil.fr">cnil.fr</a>.
                  </li>
                </ul>
                <h3>11.Prise de décision automatisée</h3>
                <p>
                  Nous n’utilisons pas vos données pour des prises de décision
                  automatisées ou du profilage. Toutefois, nous pouvons utiliser
                  vos données à des fins logistiques, telles que l’attribution
                  des livraisons aux livreurs appropriés, ce qui ne constitue
                  pas une prise de décision automatisée au sens du RGPD.
                </p>
                <h3>12.Confidentialité des enfants</h3>
                <p>
                  Nos services ne s’adressent pas aux personnes de moins de 16
                  ans. Nous ne collectons ni ne traitons intentionnellement de
                  données personnelles provenant d’enfants. Si nous découvrons
                  que nous avons collecté des données personnelles d’un enfant
                  sans le consentement approprié, nous prendrons les mesures
                  nécessaires pour supprimer ces informations rapidement.
                </p>
                <h3>13.Mises à jour de cette politique</h3>
                <p>
                  Cette Politique de Confidentialité peut être mise à jour
                  périodiquement. La dernière version sera toujours disponible
                  sur notre site web, et tout changement significatif vous sera
                  communiqué par email ou via des notifications.
                </p>
                <p>
                  Dernière mise à jour : <span>4 janvier 2025</span>
                </p>
                <h3>Informations de contact</h3>
                <p>
                  Pour toute question concernant cette Politique de
                  Confidentialité, veuillez nous contacter :
                </p>
                <ul>
                  <li>
                    Email :
                    <a href="mailto:contact@rapidmate.fr">
                      {" "}
                      contact@rapidmate.fr
                    </a>
                  </li>
                  <li>
                    Adresse postale : 8 B Av. Danielle Casanova, 95210
                    Saint-Gratien
                  </li>
                </ul>
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

export default FrenchPrivacyPolicy;
