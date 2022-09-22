import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import RideItem from "./RideItem";
import { Box } from "@mui/system";

import { GETdrives } from "../../services";

import contextLocation from "../../global";

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

  const { location, setLocation } = useContext(contextLocation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        localStorage.setItem('longitude', position.coords.longitude)
        localStorage.setItem('latitude', position.coords.latitude)
        setLocation([position.coords.longitude, position.coords.latitude]);
        GETdrives(position.coords.longitude, position.coords.latitude)
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        alert("You have to provide and share location");
      }
    );
  }, []);

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>{console.log(location)}
      <Grid container rowSpacing={3} sx={{ m: 2 }}>
        {data.map(
          ({
            date,
            body,
            header,
            id_user,
            location,
            to,
            ver,
            _id,
            city,
            dst_city,
          }) => (
            <Grid item xs={12} md={6} lg={4} key={_id}>
              <RideItem
                location={location}
                locationTo={to}
                header={header}
                ver={ver}
                body={body}
                city={city}
                dstCity={dst_city}
                time={date}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Rides;
