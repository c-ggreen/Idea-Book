import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser) {
  //     dispatch(makeUserEmail(currentUser.email));
  //   }
  // });

  const registerUser = () => {
    if (password !== passwordConfirm) {
      return alert("Passwords do not match.");
    } else if (password.length < 6 || passwordConfirm.length < 6) {
      return alert("Password must be at least 6 characters.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert("Success");
        })
        .catch((err) => {
          if(err.code === "auth/email-already-in-use"){
            alert("Email already in use.")
          }
          console.error(err.code);
          console.error(err.message);
        });
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
            <Button variant="contained">
             Back to Log In
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={() => {
              registerUser();
            }}
          >
            Register
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Signup;
