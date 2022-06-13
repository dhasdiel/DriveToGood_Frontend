import React from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";
import { Box } from "@mui/system";

/**
 we need to fetch data. the data looks like this:
  {
    "id_user": "62a080576cedc549257d78aa",
    "ver": "transporting_patient",
    "location": {
      "type": "Point",
      "coordinates": [
        31.705791,
        35.200657
      ]
    },
    "to": {
      "type": "Point",
      "coordinates": [
        31.801447,
        34.643497
      ]
    },
    "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "status": "pending",
    "header": "Short Ride Carry Some Medical"
  },
  note: room id is secret and will be sent later after some one wants to join
 */

const Rides = (props) => {
  return (
    <Box sx={{ flexGrow: 1, justifyContent:"center", display:"flex"}}>
    <Grid container rowSpacing={3}  sx={{m:2}}>
      <Grid item xs={12} md={6} lg={4}>
        <RideItem />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <RideItem />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <RideItem />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <RideItem />
      </Grid>
    </Grid>
    </Box>
  );
};

export default Rides;
