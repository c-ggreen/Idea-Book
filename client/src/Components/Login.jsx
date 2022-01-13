import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { makeUserEmail, makeLoggedIn, getUserById, getUserAsync } from "../Redux/userSlice";
import {Navigate} from 'react-router-dom'

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)



  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

const monitorUser = () =>{
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(makeUserEmail(currentUser.email));
      dispatch(makeLoggedIn(true))
    }
  });
}
// console.log(thisUser);

  const loginUser =  () => {
     signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(makeLoggedIn(true))
        // dispatch(getUserAsync(email))
        monitorUser()
        
      })
      .catch((err) => {
        if(err.code === "auth/invalid-email" || err.code === "auth/user-not-found"){
          alert("Email doesn't exist.")
        } else if(err.code === "auth/wrong-password"){
          alert("Wrong password.")
        }
        console.error(err.code);
        console.error(err.message);
      });
  };
 console.log(isLoggedIn);

  const signOut = () =>{
    auth.signOut().then(()=>{
      dispatch(makeLoggedIn(false))
      alert("User signed out")
    })
  }

  if(!isLoggedIn){
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
      >
        <Grid item xs={8}>
          <Stack spacing={2} justifyContent="center" alignItems="center" mb={2}>
            <Typography variant="h5">LOGIN</Typography>
            <TextField
              label="Email"
              type="email"
              variant="standard"
              onChange={handleEmail}
              required
            />
            <TextField
              label="Password"
              type="Password"
              variant="standard"
              onChange={handlePassword}
              required
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Link to="/page" className="link">
              <Button variant="contained" onClick={() => loginUser()}>
                Log In
              </Button>
            </Link>
            <Link to="/signup" className="link">
              <Button variant="contained"> Sign Up</Button>
            </Link>
            {/* <Button variant="contained" onClick={()=>{signOut()}}> Sign out</Button> */}
          </Stack>
        </Grid>
      </Grid>
    );
  }
  else{
    return <Navigate to="/page"/>
  }

  
}

export default Login;
