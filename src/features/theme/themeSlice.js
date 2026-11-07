import { createSlice } from "@reduxjs/toolkit";

const initial = () => {
  try {
    return (
      localStorage.getItem("qt-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  } catch {
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
