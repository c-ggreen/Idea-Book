import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useDispatch } from "react-redux";
import { makeUserEmail } from "../Redux/userSlice";
 
function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
 
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(makeUserEmail(currentUser.email));
    }
  });
 
  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  };
 
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
        </Stack>
      </Grid>
    </Grid>
  );
}
 
export default Login;
 

