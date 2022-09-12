import React, { useEffect, useState, useMemo } from "react";

import BottomAppBar from "./components/BottomAppBar";
import UpAppBar from "./components/UpAppBar";
import Rides from "./components/rides/Rides";

import { isSigned as userSigned } from "./services/index";
import SignIn from "./components/sign/SignIn";
import NewRide from "./components/rides/NewRide";

import locationContext from "./global";

function App(props) {
  const [isSigned, setIsSigned] = useState(false);
  const [username, setUserName] = useState("");
  const [location, setLocation] = useState([0, 0]);
  const value = useMemo(() => ({ location, setLocation }), [location]);

  // Check in first render if user is signed
  useEffect(() => {
    userSigned()
      .then((res) => {
        console.log(res.data);
        setIsSigned(true);
        setUserName(res.data.full_name);
      })
      .catch((error) => {
        console.error(error);
        setIsSigned(false);
      });
  }, []);

  return (
    <>
      {isSigned && (
        <>
          <locationContext.Provider value={value}>
            <UpAppBar username={username} />
            {props.new ? <NewRide /> : <Rides />}
            <BottomAppBar />
          </locationContext.Provider>
        </>
      )}
      {!isSigned && <SignIn />}
    </>
  );
}

export default App;
