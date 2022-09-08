import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import React, { useState, useContext } from "react";

import "./NewRide.css";

const DriveTypes = [
  "Transporting Patient",
  "Hospital",
  "Food Distribution",
  "Roadside Assistance",
  "transportation Of Medical Equipment",
];

export default function NewRide() {
  const [driveType, setDriveType] = useState("Transporting Patient");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [locationInput, setLocationInput] = useState("");

  return (
    <div className="warper">
      <Box
        component="form"
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
            onChange = {e => setLocationInput(e.target.value)}
            id="location"
            label="location"
            helperText="If not given, it uses your default location"
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
