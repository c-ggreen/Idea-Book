import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { makeUserEmail } from "../Redux/userSlice";
 
function Signup(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const thisUser = useSelector((state) => state.user.email);
 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
 
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      dispatch(makeUserEmail(currentUser.email));
    }
  });
 
  const registerUser = async () => {
    try {
      if (password !== passwordConfirm) {
        return alert("Passwords do not match.");
      } else {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
      }
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
        {/* <Typography variant="h2">LOGIN</Typography> */}
        <Stack spacing={2} justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5">Sign Up</Typography>
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
          <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            onChange={handlePasswordConfirm}
            required
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Link to="/" className="link">
            <Button
              variant="contained"
              onClick={() => {
                registerUser().then(() => {
                  return alert("Success!");
                });
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}
 
export default Signup;
 

