import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
 
function View(props) {
  const currentTitle = useSelector((state) => state.general.current.title);
  const currentText = useSelector((state) => state.general.current.text);
  const timestamp = useSelector((state) => state.general.current.timestamp)
 
  return (
    <Grid item xs={8} textAlign="center">
      <Typography variant="h2" mb={4}>
        {currentTitle}
      </Typography>
      <Typography variant="caption">{timestamp}</Typography>
      <Typography variant="body1">{currentText}</Typography>
    </Grid>
  );
}
 
export default View;
 

