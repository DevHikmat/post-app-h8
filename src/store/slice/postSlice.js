import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isChange: false,
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllStart: (state) => {
      state.isLoading = true;
    },
    getAllSuccess: (state) => {
      state.isLoading = false;
    },
    getAllFailure: (state) => {
      state.isLoading = false;
    },
    changePostStart: (state) => {
      state.isLoading = true;
    },
    changePostSuccess: (state) => {
      state.isChange = !state.isChange;
      state.isLoading = false;
    },
    changePostFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  getAllStart,
  getAllSuccess,
  getAllFailure,
  changePostStart,
  changePostSuccess,
  changePostFailure,
} = postSlice.actions;
export default postSlice.reducer;
