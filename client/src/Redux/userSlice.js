import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../Services/UserServices";
 
export const getUserAsync = createAsyncThunk(
  "ideas/getIdeasAsync",
  async (payload) => {
    const { data } = await UserServices.getUserById(payload);
    console.log(data);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    isLoggedIn:false,
    userInfo:[]
  },
  reducers: {
    makeUserEmail: (state, action) => {
      state.email = action.payload;
    },
    makeUserIdeas:(state, action) => {
      state.ideas = action.payload
    },
    makeLoggedIn:(state,action) => {
      state.isLoggedIn = action.payload
    },
    getUserById:(state, action) =>{
       state.ideas =  UserServices.getUserById(action.payload)
      console.log(state.ideas);
    }
  },
  extraReducers:{
    [getUserAsync.fulfilled]:(state, action) =>{
      state.userInfo = action.payload
    }
  }
});
 
export const { makeUserEmail, makeUserIdeas, makeLoggedIn, getUserById } = userSlice.actions;
export default userSlice.reducer;
 

