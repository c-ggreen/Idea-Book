import { createSlice } from "@reduxjs/toolkit";
 
const generalSlice = createSlice({
  name: "general",
  initialState: {
    current: {
      title: "",
      text: "",
      timestamp: "",
    },
    default: {
      title: "",
      text: "",
    },
  },
  reducers: {
    makeCurrentTitle: (state, action) => {
      state.current.title = action.payload;
      console.log(state.current.title);
    },
    makeCurrentText: (state, action) => {
      state.current.text = action.payload;
      console.log(state.current.text);
    },
    makeCurrentTimestamp: (state, action) => {
      state.current.timestamp = action.payload;
      console.log(state.current.timestamp);
    },
    makeDefaultTitle: (state, action) => {
      state.default.title = action.payload;
      console.log(state.default.title);
    },
    makeDefaultText: (state, action) => {
      state.default.text = action.payload;
      console.log(state.default.text);
    },
  },
});
 
export const {
  makeCurrentTitle,
  makeCurrentText,
  makeCurrentTimestamp,
  makeDefaultTitle,
  makeDefaultText,
} = generalSlice.actions;
export default generalSlice.reducer;
 

