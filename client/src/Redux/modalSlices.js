import { createSlice } from "@reduxjs/toolkit";
 
const modalSlice = createSlice({
  name: "modals",
  initialState: {
    new: {
      status: false,
      id: null,
      title: "",
      text: "",
    },
    edit: {
      status: false,
      id: null,
      title: "",
      text: "",
    },
  },
  reducers: {
    toggleNewModal: (state) => {
      state.new.status = !state.new.status;
      console.log(state.new.status);
    },
    toggleEditModal: (state) => {
      state.edit.status = !state.edit.status;
      console.log(state.edit.status);
    },
    makeNewTitle: (state, action) => {
      state.new.title = action.payload;
      console.log(state.new.title);
    },
    makeNewText: (state, action) => {
      state.new.text = action.payload;
      console.log(state.new.text);
    },
    makeEditTitle: (state, action) => {
      state.edit.title = action.payload;
      console.log(state.edit.title);
    },
    makeEditText: (state, action) => {
      state.edit.text = action.payload;
      console.log(state.edit.text);
    },
    makeEditId: (state, action) => {
        state.edit.id = action.payload;
        console.log(state.edit.id);
    }
  },
});
 
export const {
  toggleNewModal,
  toggleEditModal,
  makeNewTitle,
  makeNewText,
  makeEditTitle,
  makeEditText,
  makeEditId
} = modalSlice.actions;
export default modalSlice.reducer;
 

