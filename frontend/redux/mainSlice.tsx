import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "gobalState",
  initialState: {
    // currentFile: {
    //   name: null || String,
    //   size: null || Number,
    //   type: null || String,
    //   url: null || String,
    // },
    params: [],
    message: "",
  },
  reducers: {
    // setCurrentFile: (state, action) => {
    //   state.currentFile = action.payload;
    // },
    setParams: (state, action) => {
      state.params = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const {
  // setCurrentFile,
  setParams,
  setMessage,
} = mainSlice.actions;
