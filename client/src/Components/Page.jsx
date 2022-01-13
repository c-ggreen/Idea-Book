import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getIdeasAsync } from "../Redux/ideaSlice";
import Panel from "./Panel";
import NewPostModal from "./NewPostModal";
import EditPostModal from "./EditPostModal";
import View from "./View";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { getUserAsync, makeLoggedIn, makeUserEmail } from "../Redux/userSlice";
import {Navigate} from 'react-router-dom'

function Page() {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const user = useSelector((state) => state.user.email);
  
  const monitorUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(makeUserEmail(currentUser.email));
        dispatch(makeLoggedIn(true))
        console.log(currentUser);
      }
    });
  };

  // Makes the GET call on render
  useEffect(() => {
    dispatch(getIdeasAsync());
  }, [dispatch]);
  
  useEffect(() => {
    // dispatch(getUserAsync(user))
    monitorUser();
  }, [auth.currentUser]);

  if (auth.currentUser) {
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
  } else {
    return <Navigate to="/"/>
  }
}

export default Page;
