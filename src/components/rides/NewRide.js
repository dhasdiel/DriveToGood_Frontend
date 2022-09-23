import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";

import { POSTdrive } from "../../services";
import { forwardGeoCode } from "../../services/3rdparty.js";

import { DriveTypes } from "../../const";

import "./NewRide.css";
import { getLatLon } from "../../logic/geoCoding";

// TODO should return lon lat OR empty object in case of validation error
const normalize = async (query) => {
  try {
    const response = await forwardGeoCode(query);
    const { latitude, longitude } = getLatLon(response.data.data);
    return [latitude, longitude];
  } catch (error) {
    console.error(error);
  }
};

/**
 * 
 * @param {*} location  {
      "latitude": 31.759595,
      "longitude": 35.215315,
      "type": "locality",
      "name": "Jerusalem",
      "number": null,
      "postal_code": null,
      "street": null,
      "confidence": 0.6,
      "region": "Jerusalem",
      "region_code": "JM",
      "county": "Jerusalem",
      "locality": "Jerusalem",
      "administrative_area": null,
      "neighbourhood": null,
      "country": "Israel",
      "country_code": "ISR",
      "continent": "Asia",
      "label": "Jerusalem, Israel"
    },
 * @returns 
 */
const extractLocation = (location) => {
  const { latitude, longitude } = location;
  console.log(latitude, longitude);
  return latitude, longitude;
};

export default function NewRide() {
  const [driveType, setDriveType] = useState("Transporting Patient");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleRequest = async (obj) => {
    try {
      const res = await POSTdrive(obj);
      setSubmit(true);
      console.log(res);
    } catch (error) {
      setSubmit(false);
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // use userLocation
    if (location) {

    } else {
      setLocation("DON'T CHECK")
    }

    const normLocation = await normalize(location);
    const normDestination = await normalize(destination);
    console.log(normLocation);
    // const isValid = handleValidation()
    handleRequest({ driveType, header, body, normLocation, normDestination });
  };

  useEffect(() => {}, [submit]);

  return (
    <div className="warper">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "98vw",
          backgroundColor: "#efefef",
          mt: 3,
          height: "650px",
          borderRadius: "10px",
        }}
      >
        <div className="warper">
          <Typography sx={{ m: 2, display: "block" }} variant="h5">
            New Drive
          </Typography>
        </div>
        <Divider />
        <div className="warper">
          <TextField
            required
            id="outlined-select-DriveType"
            select
            label="Drive Type"
            value={driveType}
            onChange={(e) => setDriveType(e.target.value)}
            helperText="Please select the type of your new drives"
          >
            {DriveTypes.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="warper">
          <TextField
            required
            sx={{ ml: 1.5, mr: 1.5 }}
            fullWidth
            id="header"
            label="header"
            value={header}
            multiline
            maxRows={2}
            onChange={(e) => {
              setHeader(e.target.value);
            }}
            helperText="The header should be informative, short and concise"
          />
        </div>
        <div className="warper">
          <TextField
            required
            sx={{ ml: 1.5, mr: 1.5 }}
            id="body"
            label="body"
            value={body}
            multiline
            maxRows={4}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            helperText="Should be around 4 lines explaining carefully the mission"
          />
        </div>

        <div className="warper">
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            label="location"
            helperText="If not given, it uses your default location"
          />
        </div>

        <div className="warper">
          <TextField
            sx={{ width: "250px" }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            id="destination"
            label="destination"
            helperText="enter city"
          />
        </div>

        <div className="warper">
          <Button variant="contained" size="large" type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}

const schema_extra = {
  example: {
    ver: "transporting_patient",
    location: {
      type: "Point",
      coordinates: [34, 34],
    },
    body: "This is the body of the Drive",
    header: "This is my Stupid Header",
  },
};
