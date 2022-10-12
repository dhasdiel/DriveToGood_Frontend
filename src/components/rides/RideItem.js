import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Divider } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router-dom";

import "./RideItem.css";
import { reverseGeoCode } from "../../services/3rdparty";
import stringAvatar from "../../utility/avatar";
import { getUsername } from "../../services";
import Chat from "../chat/main";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 *
 * * TODO: need much stronger algorithm for querying the city name. now its about REGION.
 * * for example asking for Ramat Gan will result in Tel Aviv.
 */
const getCityName = async (location) => {
  try {
    const { data } = await reverseGeoCode(location);
    return data.data[0].region;
  } catch (error) {
    console.error(error);
  }
};

export default function RideItem({
  location,
  destination,
  header,
  ver,
  body,
  timePublished,
  id,
  driveID,
  roomID,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [cityLoc, setCityLoc] = React.useState("");
  const [cityDst, setCityDst] = React.useState("");
  const [username, setUsername] = React.useState(
    "If you delete this shit it wont work!!!"
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    getCityName(location)
      .then((city) => setCityLoc(city))
      .catch((error) => console.error(error));

    getCityName(destination)
      .then((city) => setCityDst(city))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    getUsername(id)
      .then((response) => response.data)
      .then((data) => setUsername(data.full_name))
      .catch((error) => console.error(error));
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `Chat`;
    navigate(path, { state: { driveID: driveID } });
  };
  return (
    <Card
      sx={{
        // maxWidth: 800,
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        borderRadius: "15px",
      }}
    >
      <CardHeader
        avatar={<Avatar {...stringAvatar(username)} alt="Remy Sharp" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${cityLoc} => ${cityDst}`}
        subheader={timePublished}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {header}
        </Typography>
        <Typography variant="body3" color="primary.main">
          {roomID}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{body}</Typography>
        </CardContent>
        <Button
          className="button-42"
          color={"secondary"}
          size="large"
          variant="contained"
          endIcon={<DirectionsCarIcon />}
          onClick={routeChange}
        >
          Start
        </Button>
      </Collapse>
    </Card>
  );
}
