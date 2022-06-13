import React, { useEffect, useState } from "react";

import BottomAppBar from "./components/BottomAppBar";
import UpAppBar from "./components/UpAppBar";
import Rides from "./components/rides/Rides";

import { isSigned as userSigned } from "./services/index";
import SignIn from "./components/sign/SignIn";

function App() {
  const [isSigned, setIsSigned] = useState(false);

  // Check in first render if user is signed
  useEffect(() => {
    userSigned()
      .then((res) => {
        console.log(res.data);
        setIsSigned(true);
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
          <UpAppBar /> <Rides /> <BottomAppBar />
        </>
      )}
      {!isSigned && <SignIn />}
    </>
  );
}

export default App;
