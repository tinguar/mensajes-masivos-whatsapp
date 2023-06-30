import { createSlice } from "@reduxjs/toolkit";

export interface IParam {
  name: string;
  isMain: boolean;
}
export interface IGobalState {
  params: IParam[] | [];
  message: string | "";
}

const mainSlice = createSlice({
  name: "gobalState",
  initialState: {
    params: [],
    message: "",
  } as IGobalState,
  reducers: {
    setParams: (state, action) => {
      const arrayParams = action.payload as string[];
      const currentParams = [] as IParam[];
      arrayParams.map((param: string) => {
        return currentParams.push({ name: param, isMain: false });
      });
      state.params = currentParams;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMainParam: (state, action) => {
      const currentParams = state.params as IParam[];
      const indexParam = currentParams.findIndex(
        (param) => param.name === action.payload
      );
      currentParams[indexParam].isMain = true;
    },
  },
});

export default mainSlice.reducer;
export const {
  // setCurrentFile,
  setParams,
  setMessage,
  setMainParam,
} = mainSlice.actions;
