import { createSlice } from "@reduxjs/toolkit";
import { PERFUMES } from "../../data/perfumes";

const perfumeSlice = createSlice({
  name: "perfumes",
  initialState: { items: PERFUMES },
  reducers: {},
});

export default perfumeSlice.reducer;
