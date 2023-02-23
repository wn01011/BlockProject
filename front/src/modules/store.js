import { configureStore } from "@reduxjs/toolkit";
import { reducer as utilReducer } from "./util.js";

export const store = configureStore({
  reducer: {
    util: utilReducer,
  },
});

export default store;
