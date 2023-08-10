import "./App.css";
import "./index.css";
import Type from "./component/typeApp";
import Nav from "./component/nav_bar";
import React, { useEffect, useState } from "react";
import EntryPage from "./component/pages/EntryPage";
import Login from "./component/pages/Login";
import Signin from "./component/pages/Signin";
import JoinRoom from "./component/pages/Multiplayer/joinRoom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from "./component/pages/Profile";
function App(){
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
      <Router>
      <Nav mode={mode} tog={toggle} />
    <div>
    <Routes>
    <Route exact path='/' element={<EntryPage/>}/>
    <Route exact path='/SinglePlayer' element={<Type mode={mode}/>}/>
    <Route exact path="/MultiPlayer"  element={<Type mode={mode}/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/Signin' element={<Signin/>}/>
    <Route exact path="/profile" element={<Profile/>}/>
    <Route exact path="/joinRoom" element={<JoinRoom/>}/>
    </Routes>
    </div>
      </Router>
  );
}

export default App;
