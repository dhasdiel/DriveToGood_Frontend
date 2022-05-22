import React from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";

const Rides = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <RideItem />
      </Grid>
    </Grid>
  );
};

export default Rides;
