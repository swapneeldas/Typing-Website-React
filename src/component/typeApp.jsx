import React, { useState,useRef, useEffect} from "react";
import {white_inner,TextArea,secound_inner} from "./textColor";
import AddDataSpan2 from "./spanadder";
import setT from "./timer";
function Typing(probs) {
  const [users, setUsers] = useState("The text will be here"); //contains text
  const [timer,switchanger]=useState(false);//check if time started
  const [currenttime,setTime]=useState(0);//to check current time
  const [input,inputext]=useState("");//reffing to input
  const [disable,setdisable]=useState(true);//disableling enableling input form
  const [score,scoreset]=useState("The Counter will be starting here");//chicking score
  const [doneper,donechange]=useState(0);//conaining what percentage is done
  let cor=useRef();//using to keep track if their is any wrong letter given
  let id=useRef();//containing the interval id to stop or start timer
  // this hooks are used in for try again feature{
  let lastSpeed=useRef();//keeping last speed 
  let lastRaceIndex=useRef(0);//keeping track of last index where the last race ended 
  let previousRaces=useRef([{white:0,time:0}]);//keeping track of the fastest race no of character done in in centaint time
  let TimeRaceFinished=useRef();//keeping track of the time when race is finished 
  let [cantryagain,setcantryagain]=useState(false);//checking if first race is done.. and should we enable try again button}
  cor.current=true;
  let datainput=useRef();
  const url = "http://api.quotable.io/random";
  const [white,wdone]=useState(0);
  let racecompleted=useRef(false);
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
 //This punction will be triggered when start will be clicked
  async function handleClick(event){
    setcantryagain(false);
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
    previousRaces.current=[{white:0,time:0}];
    lastSpeed.current=0;
    lastRaceIndex.current=0;
  }
    else{
      switchanger(false);
      clearInterval(id.current);
    }
  }
  //This function will be triggered when tryagain button will be clicked
  async function handleTryClick(e){
    setcantryagain(false);
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
  //this function is used in tryagain function to go thorugh previous array find the character done typing at that time...
  function findprevwidth(){
    previousRaces.current.forEach((ch,index)=>{
      if(index>lastRaceIndex.current){
        return;
      }
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

    if(racingprev && cantryagain && prevwidth.width===100){
      clearInterval(id.current);
    }
    
    if(racingprev && racecompleted.current && prevwidth.width===100){
      //slice previous 
      // which should at the end of 2nd try again race             
        if(lastRaceIndex.current.time<previousRaces.current[previousRaces.current.length-1].time){
          previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1)
          console.log("current race speed is slower than previous race got hit");
        }
      //   //if second speed is fater than first try again speed.
        else if(lastRaceIndex.current.time>previousRaces.current[previousRaces.current.length-1].time){
          previousRaces.current=[{white:0,time:0},...previousRaces.current.slice(lastRaceIndex.current.index+1,previousRaces.current.length)]
          lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,index:(previousRaces.current.length-1)};
          console.log("current race speed is faster than previous race got hit");
        }
        else{
          previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1);
          console.log("else part got trigger")
        }
    }
    
    
  return (
    <div className="typeapp_1_div" style={(probs.mode === 'light' )? null :white_inner}>
      <div className="counter">
        <span>{score}</span>
        <span className="timer">: {(score==="The Counter will be starting here")?currenttime:lastSpeed.current}</span>
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
      <hr className="hrleft"/><p className="per" style={(doneper<20)?{display:"none"}:null}>{(doneper===100 && racingprev)?Math.round(((white/TimeRaceFinished.current)*60)/5):Math.round(((white/currenttime)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{doneper}%</p>
      </div>
      <hr style={{'color':'yellow'}}/>
      </div>
      <form>
        <div className="form-group">
          <div className="innerArea" style={(probs.mode === 'light' )? null :secound_inner}>
            <p className="p" >{users.split("").map((data,index)=>{return AddDataSpan2(data,index,users ,white,inputext,id,scoreset,setdisable,wdone,input,switchanger,cor,currenttime,setcantryagain,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,racingprev,racecompleted)})}</p>
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
          <button className={`bt btn btn-${(probs.mode === 'light' )? "success" :"dark"} btn-outline${(probs.mode === 'light' )? "-dark":"-light"} btn-lg btnRight`} 
          style={(!cantryagain)?{display:"none"}:null} onClick={(e)=>{
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
