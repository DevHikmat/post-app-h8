import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import postSlice from "./slice/postSlice";
import comSlice from "./slice/comSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    postSlice,
    comSlice,
  },
});
