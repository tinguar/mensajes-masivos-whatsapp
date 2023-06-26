import { configureStore } from "@reduxjs/toolkit";
// importing all slices
import mainReducer from "./mainSlice";

export default configureStore({
  reducer: {
    globalState: mainReducer,
  },
});
