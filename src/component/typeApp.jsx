import React, {useEffect, useContext} from "react";
import {white_inner,TextArea,secound_inner} from "./textColor";
import AddDataSpan2 from "./spanadder";
import Context from "../Context/Context";
import setT from "./timer";
function Typing(probs) {
  let context=useContext(Context);
  let {users,setUsers,timer,switchanger,currenttime,setTime,input,inputext,disable,setdisable,
    score,scoreset,doneper,donechange,cor,id,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,
    cantryagain,setcantryagain,datainput,white,wdone,racecompleted,racingprev,setracingprev,prevwidth,
    setprevwidth}=context

    cor.current=true;
    useEffect(
      ()=>{
        donechange((Math.floor((white/users.split("").length)*100)));
      }
      ,[white]);
      let percent={
        width:`${doneper}%`,
      }
  const url = "https://api.quotable.io/random";
  const fetchUserData = async () => {
    let p =await fetch(url);
    let parsedData=await p.json()
    setUsers(parsedData.content);
  };
 //This punction will be triggered when start will be clicked
  async function handleClick(event){
    racecompleted.current=false;
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
    racecompleted.current=false;
    e.preventDefault();
    wdone(0);
    await setcantryagain(false);
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
    
    if(racingprev && racecompleted.current && prevwidth.width===100){
      //slice previous 
      // which should at the end of 2nd try again race     
        clearInterval(id.current);        
        if(lastRaceIndex.current.time<previousRaces.current[previousRaces.current.length-1].time){
          previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1)
        }
      //   //if second speed is fater than first try again speed.
        else if(lastRaceIndex.current.time>previousRaces.current[previousRaces.current.length-1].time){
          previousRaces.current=[{white:0,time:0},...previousRaces.current.slice(lastRaceIndex.current.index+1,previousRaces.current.length)]
          lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,index:(previousRaces.current.length-1)};
        }
        else{
          previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1);
        }
    }
    
    
  return (
    <div className="typeapp_1_div" style={(probs.mode === 'light' )? null :white_inner}>
      <div className="counter">
        <span>{score}</span>
        <span className="timer">: {(score==="The Counter will be starting here")?currenttime:lastSpeed.current}</span>
      </div>
      <p id="pr">Progress{".".repeat(currenttime%6)}</p>
      <div style={(!racingprev)?{display:"none"}:null}>
      <div className="progress" style={{width:`${prevwidth.width}%`}}>
      <div className="identifier">
      <p className="per">Your&nbsp;Previous</p>
      </div>
      <hr className="hrleft"/>
      <p className="per" style={(prevwidth.width<20)?{display:"none"}:null}>{Math.round(((prevwidth.white/prevwidth.time)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{prevwidth.width}%</p>
      </div>
      </div>

      <div >
      <div className="progress" style={percent}>
      <div className="identifier">
      <p className="per">You</p>
      </div>
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
          <button className={`bt btn btn-lg btn-${(probs.mode === 'light' )? "success" :"dark" } btn-outline${(probs.mode === 'light' )? "-dark":"-light"} btn-lg btnLeft`} onClick={handleClick}>Start</button>
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
