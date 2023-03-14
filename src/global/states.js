/**
 * A place for holding lots of global states
 */
import React from "react";

const location = { type: "Point", coordinates: [0, 0] };

export const locationContext = React.createContext({
  location:[0, 0],
  setLocation: () => { },
});
