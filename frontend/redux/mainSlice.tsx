import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "gobalState",
  initialState: {
    currentFile: {
      name: null || String,
      size: null || Number,
      type: null || String,
      url: null || String,
    },
    tags: [],
    message: "",
  },
  reducers: {
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
      console.log(state.currentFile);
    },
  },
});

export default mainSlice.reducer;
export const { setCurrentFile } = mainSlice.actions;
