import { createSlice } from "@reduxjs/toolkit";
import i18n from "../i18n/i18n"; 
const initialState = {
  language:i18n.language || "en", // Default language
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
    toggleLanguage: (state) => {
      // Switch between two languages
      const newLanguage = state.language === "en" ? "fr" : "en";
      state.language = newLanguage;
      i18n.changeLanguage(newLanguage); 
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
