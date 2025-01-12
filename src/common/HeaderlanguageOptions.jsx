import React from 'react';
import Styles from "../assets/webcss/WebHeader.module.css";

const languageOptions = [
  { value: 'fr', label: 'French', flag: 'FR' },
  { value: 'en', label: 'English', flag: 'US' },
];

const HeaderLanguageSwitcher = ({ lang, switcher }) => {
  const handleChange = (event) => {
    switcher(event.target.value); // Update the language based on selection
  };

  return (
    <div className={Styles.languageDropdown}>
      <select value={lang} onChange={handleChange} className={Styles.customSelect}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={Styles.flagContainer}>
        <img
          src={`https://flagcdn.com/w40/${lang === 'fr' ? 'fr' : 'us'}.png`}
          alt={lang === 'fr' ? 'French' : 'English'}
          className={Styles.flagIcon}
        />
      </div>
    </div>
  );
};

export default HeaderLanguageSwitcher;
