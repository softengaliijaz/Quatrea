import { createSlice } from "@reduxjs/toolkit";

const initial = () => {
  try {
    const saved = localStorage.getItem("qt-theme");
    if (saved === "dark" || saved === "light") return saved;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (error) {
    console.warn("Could not read the saved color theme.", error);
    return "light";
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: initial() },
  reducers: {
    toggleTheme: (s) => {
      s.mode = s.mode === "dark" ? "light" : "dark";
    },
    setTheme: (s, a) => {
      s.mode = a.payload;
    },
  },
});
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
