import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isChange: false,
};

export const comSlice = createSlice({
  name: "comSlice",
  initialState,
  reducers: {
    changeComStart: (state) => {
      state.isLoading = true;
    },
    changeComSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    changeComFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const { changeComStart, changeComSuccess, changeComFailure } =
  comSlice.actions;
export default comSlice.reducer;
