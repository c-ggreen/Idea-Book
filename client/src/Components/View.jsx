import React from "react";
import {Grid, Typography } from '@mui/material'
function View(props) {
  return (
    <Grid item xs={8} textAlign="center">
      <Typography variant="h2" mb={4}>
        {props.currentIdeaTitle}
      </Typography>
      <Typography variant="body1">{props.currentIdeaText}</Typography>
    </Grid>
  );
}
 
export default View;