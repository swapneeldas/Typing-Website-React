import React, { useState,useRef, useEffect} from "react";
import {white_inner,TextArea,secound_inner} from "./textColor";
import AddDataSpan2 from "./spanadder";
import setT from "./timer";
function Typing(probs) {
  const [users, setUsers] = useState("The text will be here");
  const [timer,switchanger]=useState(false);
  const [currenttime,setTime]=useState(0);
  const [input,inputext]=useState("");
  const [disable,setdisable]=useState(true);
  const [score,scoreset]=useState("The Counter will be starting here");
  const [doneper,donechange]=useState(0);
  let cor=useRef();
  let id=useRef();
  let speed=useRef([0,0]);
  
  cor.current=true;
  let datainput=useRef();
  const url = "http://api.quotable.io/random";
  const [white,wdone]=useState(0);
  const [previousrace,setpreviousrace]=useState([{white:0,time:0}]);
  const [racingprev,setracingprev]=useState(false);
  const [prevwidth,setprevwidth]=useState({width:0,white:0});
  useEffect(
    ()=>{
      donechange((Math.floor((white/users.split("").length)*100)));
    }
    ,[white]);
    let percent={
      width:`${doneper}%`,
    }
  const fetchUserData = async () => {
    let p =await fetch(url);
    let parsedData=await p.json()
    setUsers(parsedData.content);
  };
 
  async function handleClick(event){
    setracingprev(false);
    wdone(0);
    event.preventDefault();
    if(timer===false){
    setdisable(false);
    scoreset("The Counter will be starting here");
    await fetchUserData();
    switchanger(true);
    setT(setTime,id);
    datainput.current.focus();
    setpreviousrace([{white:0,time:0}]);
    speed.current=[0,0];
  }
    else{
      switchanger(false);
      clearInterval(id.current);
    }
  }
  async function handleTryClick(e){
    wdone(0);
    e.preventDefault();
    await setdisable(false);
    scoreset("The Counter will be starting here");
    switchanger(true);
    setT(setTime,id);
    datainput.current.focus();
  }

  function change(event){
    inputext(event.target.value);
    
  }
  function findprevwidth(){
    previousrace.forEach((ch)=>{
      if(ch.time===currenttime){
        setprevwidth({width:(Math.round((ch.white/users.split("").length)*100)),white:ch.white,time:currenttime});
      }
    })

  }
  useEffect(
    ()=>{
      findprevwidth()
    }
    ,[currenttime]);
  return (
    <div className="typeapp_1_div" style={(probs.mode === 'light' )? null :white_inner}>
      <div className="counter">
        <span>{score}</span>
        <span className="timer">: {(score==="The Counter will be starting here")?currenttime:speed.current[1]}</span>
      </div>

      <div style={(!racingprev)?{display:"none"}:null}>
      <p id="pr">previous race progress{".".repeat(currenttime%6)}</p>
      <div className="progress" style={{width:`${prevwidth.width}%`}}>
      <p className="per">Your&nbsp;Previous</p>
      <hr className="hrleft"/>
      <p className="per" style={(prevwidth.width<20)?{display:"none"}:null}>{Math.round(((prevwidth.white/prevwidth.time)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{prevwidth.width}%</p>
      </div></div>

      <div >
      <p id="pr">Progress{".".repeat(currenttime%6)}</p>
      <div className="progress" style={percent}>
      <p className="per">You</p>
      <hr className="hrleft"/><p className="per" style={(doneper<20)?{display:"none"}:null}>{Math.round(((white/currenttime)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{doneper}%</p>
      </div>
      <hr style={{'color':'yellow'}}/>
      </div>
      <form>
        <div className="form-group">
          <div className="innerArea" style={(probs.mode === 'light' )? null :secound_inner}>
            <p className="p" >{users.split("").map((data,index)=>{return AddDataSpan2(data,index,users ,white,inputext,id,scoreset,setdisable,setTime,wdone,input,switchanger,cor,previousrace,setpreviousrace,racingprev,setracingprev,currenttime,doneper,speed)})}</p>
            <input 
              type="textArea"
              value={input}
              ref={datainput}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Text will be typed here"
              onChange={change}
              disabled={disable}
              style={(probs.mode === 'light' )? null :TextArea}
            />
          </div>
          <div className="flexbtn">
          <button className={`bt btn btn-${(probs.mode === 'light' )? "success" :"dark"} btn-outline${(probs.mode === 'light' )? "-dark":"-light"} btn-lg btnLeft`} onClick={handleClick}>Start</button>
          <button className={`bt btn btn-${(probs.mode === 'light' )? "success" :"dark"} btn-outline${(probs.mode === 'light' )? "-dark":"-light"} btn-lg btnRight` } onClick={(e)=>{
            setracingprev(true);
            handleTryClick(e);
          }}>Try Again</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Typing;
