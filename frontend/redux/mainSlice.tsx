import { createSlice } from "@reduxjs/toolkit";
export interface IGlobalState {
  params: string[];
  message: string | "";
  currentMainParam: "";
  currentPositionPointer: number | null | "";
}

const mainSlice = createSlice({
  name: "gobalState",
  initialState: {
    params: [],
    message: "",
    currentMainParam: "",
    currentPositionPointer: null,
  } as IGlobalState,
  reducers: {
    setParams: (state, action) => {
      state.params = action.payload as string[];
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMainParam: (state, action) => {
      state.currentMainParam = action.payload;
    },
    setCurrentPositionPointer: (state, action) => {
      state.currentPositionPointer = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const {
  setParams,
  setMessage,
  setMainParam,
  setCurrentPositionPointer,
} = mainSlice.actions;
