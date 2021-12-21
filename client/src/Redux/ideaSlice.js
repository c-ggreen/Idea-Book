import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IdeaService from "../Services/IdeaServices";
 
export const getIdeasAsync = createAsyncThunk(
  "ideas/getIdeasAsync",
  async () => {
    const { data } = await IdeaService.getIdea("http://localhost:8080/idea/");
    console.log(data);
    return data;
  }
);
export const addIdeasAsync = createAsyncThunk(
  "ideas/addIdeasAsync",
  async (payload) => {
    const { data } = await IdeaService.postIdea(payload);
    console.log(data);
    return data;
  }
);
export const editIdeasAsync = createAsyncThunk(
  "ideas/editIdeasAsync",
  async (payload) => {
    const { data } = await IdeaService.patchIdea(payload);
    console.log(data);
    return data;
  }
);
export const deleteIdeasAsync = createAsyncThunk(
  "ideas/deleteIdeasAsync",
  async (payload) => {
    const { data } = await IdeaService.deleteIdea(payload);
    console.log(data);
    return data;
  }
);
 
const ideaSlice = createSlice({
  name: "ideas",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getIdeasAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [addIdeasAsync.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    [editIdeasAsync.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    [deleteIdeasAsync.fulfilled]: (state, action) =>{
      state.findIndex((idea) => idea.id === action.payload.id)
    }
  },
});
 
export default ideaSlice.reducer;
 

