import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";
import { Box } from "@mui/system";

import { GETdrives } from "../../services/index";

/**
 we need to fetch data. a single ride looks like this:
 
    {
        "_id": "62a8d722ff7cf6a4bc590d8d",
        "id_user": "62a8d722e2c104c2fd59cb0c",
        "ver": "transportation_of_medical_equipment",
        "location": {
            "type": "Point",
            "coordinates": [
                34.86,
                32.3328
            ]
        },
        "to": {
            "type": "Point",
            "coordinates": [
                34.8422,
                32.1556
            ]
        },
        "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "status": "completed",
        "header": "short ride carry some bull shit",
    },
 note: room id is secret and will be sent later after some one wants to join
 */

// from={} to={} header={}, body={}
const Rides = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        GETdrives(position.coords.longitude, position.coords.latitude,)
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, []);

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
      <Grid container rowSpacing={3} sx={{ m: 2 }}>
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
