import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getIdeasAsync } from "../Redux/ideaSlice";
import Panel from "./Panel";
import NewPostModal from "./NewPostModal";
import EditPostModal from "./EditPostModal";
import View from "./View";
 
function Page() {
  const dispatch = useDispatch();
 
  // Makes the GET call on render
  useEffect(() => {
    dispatch(getIdeasAsync());
  }, [dispatch]);
 
  return (
    <Grid container height="100vh">
      <Panel />
      {/* This will be the space where the idea title and text display when the corresponding button is clicked */}
      <View />
 
      {/* The Dialog Modal that will handle new posts */}
 
      <NewPostModal />
      {/* The Dialog Modal that will handle EDIT posts */}
      {/* When modal appears it should already have text in the input fields */}
      <EditPostModal />
    </Grid>
  );
}
 
export default Page;
 

