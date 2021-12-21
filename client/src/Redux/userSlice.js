import { createSlice } from "@reduxjs/toolkit";
 
const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
  },
  reducers: {
    makeUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});
 
export const { makeUserEmail } = userSlice.actions;
export default userSlice.reducer;
 

