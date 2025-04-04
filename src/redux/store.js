import { configureStore } from "@reduxjs/toolkit";
import jobRedcuer from "./slices/jobSlice";

export const store = configureStore({
  reducer: { jobRedcuer },
});
