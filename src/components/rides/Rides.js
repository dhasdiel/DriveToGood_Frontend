import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";
import { Box } from "@mui/system";

import { GETdrives } from "../../services";

const Rides = (props) => {
  const [data, setData] = useState([]);

  const fetchDrives = (position) => {
    GETdrives(position.coords.longitude, position.coords.latitude)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocalStorage(position);
        fetchDrives(position);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
        alert("You have to provide and share location in order to use the app");
      }
    );
  }, []);

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
      <Grid container rowSpacing={3} sx={{ m: 2 }}>
        {data.map(
          ({ date, body, header, location, destination, ver }, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <RideItem
                location={location}
                destination={destination}
                header={header}
                ver={ver}
                body={body}
                timePublished={date}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Rides;

const setLocalStorage = (position) => {
  localStorage.setItem("longitude", position.coords.longitude);
  localStorage.setItem("latitude", position.coords.latitude);
};
