import "./styles.css";
import { ChatItem } from "./chatItem";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, Divider, Paper } from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

import { useLocation, useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import { GETisHost, isSigned, setDriveComplete } from "../../services";

function makeid(length = 5) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return String(result);
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Chat() {
  const [texts, setTexts] = useState([]);
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState(0);
  const [isRoomPicked, setIsRoomPicked] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [mySID, setMySID] = useState("");
  const [name, setName] = useState("");
  const globSocket = useRef(
    io("ws://127.0.0.1:8001/", {
      path: "/ws/socket.io/",
      autoConnect: false,
    })
  );
  const { state } = useLocation();

  const getUserID = async () => {
    const { data } = await isSigned();
    setName(data.username);
    return data._id;
  };

  const isHostF = async () => {
    const userID = await getUserID();
    const { driveID } = state;
    const { data } = await GETisHost(driveID, userID);
    setIsHost(data);
  };

  useEffect(() => {
    isHostF().catch((error) => console.error(error));
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const socket = globSocket.current;
    socket.on("my_message", (e) => setTexts((old) => [...old, e]));
    socket.on("insure_connection", (e) => setMySID(e));
    socket.on("join_response", (e) => console.log(e));

    return () => {
      socket.off("my_message");
      socket.off("insure_connection");
      socket.off("join_response");
    };
  }, []);

  useEffect(() => {
    if (room === 0) return;
    let messageBody = document.querySelector("#message-window");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [texts]);

  useEffect(() => {
    const socket = globSocket.current;

    if (isRoomPicked) {
      socket.connect();

      socket.emit("join", {
        room: room,
        name: makeid(),
        isHost: isHost,
      });
    }
  }, [isRoomPicked]);

  const handleClick = (event) => {
    const socket = globSocket.current;

    const newMsg = {
      senderName: name,
      senderId: mySID,
      body: msg,
      date: new Date().toLocaleTimeString(),
      room: room,
    };
    socket.emit("my_message", newMsg);
    setTexts((old) => [...old, newMsg]);
    console.log(newMsg);
    setMsg("");
  };

  const navigate = useNavigate();
  const handleStartClick = async (e) => {
    const { driveID } = state;
    await setDriveComplete(driveID);
    navigate("/", { replace: true });
  };

  const messageBody = (
    <div
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        borderRadius: "20px",
        margin: "10px",
        height: "92vh",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          backgroundColor: "primary.main",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt="Remy Sharp"
            src="../public/logo192.png"
          />
        </StyledBadge>
      </Paper>
      <Divider />
      <div
        style={{
          width: "98%",
          height: 470,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        className="App"
        id="message-window"
      >
        {texts.map((val, index) => (
          <ChatItem
            senderName={val.senderName}
            key={index}
            sender={val.senderId === mySID ? "message-blue" : "message-orange"}
            message={
              val.senderId === 12
                ? "message-timestamp-left"
                : "message-timestamp-right"
            }
            body={val.body}
            date={val.date}
          />
        ))}
      </div>
      <Divider />
      <div style={{ display: "flex", width: "100%" }}>
        <TextField
          sx={{ width: "80%", m: 1 }}
          id="outlined-multiline-flexible"
          label=""
          placeholder="DONT SHARE PERSONAL INFO!!!"
          multiline
          maxRows={4}
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        />

        <IconButton size="large" onClick={handleClick}>
          <SendIcon />
        </IconButton>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleStartClick}
          sx={{ width: "95%", m: 2 }}
          variant={"contained"}
          endIcon={<DirectionsCarIcon />}
        >
          Start!
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ width: "95%", m: 2 }}
          variant={"contained"}
          endIcon={<ThumbDownOffAltIcon />}
          color={"error"}
        >
          DECLINE!
        </Button>
      </div>
    </div>
  );

  const pickRoom = (
    <div style={{ margin: 2 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ m: 4 }}
          label="Room id"
          placeholder="PICK ROOM"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={() => setIsRoomPicked(true)}
        >
          pick
        </Button>
      </div>
    </div>
  );

  return <>{isRoomPicked ? messageBody : pickRoom}</>;
}
