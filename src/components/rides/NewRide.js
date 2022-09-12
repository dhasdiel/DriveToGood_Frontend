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

// TODO should return lon lat OR empty object in case of validation error
const normalize = (query) => {
  return forwardGeoCode(query)
}

export default function NewRide() {
  const [driveType, setDriveType] = useState("Transporting Patient");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [locationInput, setLocationInput] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // normalize location and destination as classic lat lon mongo object
    const normLocation = normalize(locationInput)
    const normDestination = normalize(destination)
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
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
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
