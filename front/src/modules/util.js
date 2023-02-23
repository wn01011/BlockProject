import { createSlice, current } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: { dark: false, info: { data: "", position: { x: 0, y: 0 } } },
  reducers: {
    setDark: (state, { payload }) => {
      state.dark = payload;
    },
    setInfo: (state, { payload }) => {
      state.info = payload;
    },
  },
});

export const action = utilSlice.actions;
export const reducer = utilSlice.reducer;
