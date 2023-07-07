import "./App.css";
import Type from "./component/typeApp";
import Nav from "./component/nav_bar";
import React, { useState } from "react";
function App() {
  let [mode, setmode] = useState("light");
  function toggle() {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor="black";
    } else {
      setmode("light");
      document.body.style.backgroundColor="green";
    }
  }
  return (
    <div>
      <Nav mode={mode} tog={toggle} />
      <Type mode={mode} />
    </div>
  );
}

export default App;
