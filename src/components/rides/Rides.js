import React from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";
import { Box } from "@mui/system";



const Rides = (props) => {
  return (
    <Box sx={{ flexGrow: 1, justifyContent:"center", display:"flex"}}>
    <Grid container rowSpacing={3}  sx={{m:2}}>
      <Grid item xs={12}>
        <RideItem />
      </Grid>
      <Grid item xs={12}>
        <RideItem />
      </Grid>
      <Grid item xs={12}>
        <RideItem />
      </Grid>
      <Grid item xs={12}>
        <RideItem />
      </Grid>
    </Grid>
    </Box>
  );
};

export default Rides;
