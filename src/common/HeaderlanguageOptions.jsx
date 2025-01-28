import React from "react";
import Styles from "../assets/webcss/WebHeader.module.css";

const languageOptions = [
  { value: "fr", label: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { value: "en", label: "English", flag: "https://flagcdn.com/w40/us.png" },
];

const HeaderLanguageSwitcher = ({ lang, switcher }) => {
  const handleChange = (event) => {
    switcher(event.target.value); // Update the language based on selection
  };

  return (
    <div className={Styles.languageDropdown}>
      <div className={Styles.flagContainer}>
        <img
          src={languageOptions.find((option) => option.value === lang)?.flag}
          alt={lang === "fr" ? "French" : "English"}
          className={Styles.flagIcon}
        />
      </div>
      <select
        value={lang}
        onChange={handleChange}
        className={`${Styles.customSelect}`}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderLanguageSwitcher;
