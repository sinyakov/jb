import React from "react";
import "./index.css";
import { getHelpTOC } from "../../api/getHelpTOC";

getHelpTOC().then(console.log);

export function App() {
  return <div className="test">Hello!</div>;
}
