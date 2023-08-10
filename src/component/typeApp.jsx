import React, {useEffect, useContext} from "react";
import {white_inner,TextArea,secound_inner} from "./textColor";
import AddDataSpan2 from "./spanadder";
import Context from "../Context/Context";

function Typing(probs) {
  let context=useContext(Context);
  let {users,setUsers,timer,switchanger,currenttime,setTime,input,inputext,disable,setdisable,
    score,scoreset,doneper,donechange,cor,id,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,
    cantryagain,setcantryagain,datainput,white,wdone,racecompleted,racingprev,setracingprev,prevwidth,
    setprevwidth,handleStart,StartingCounter,tryclick,multiplayer,playerdata,setplayerdata}=context

    cor.current=true;
    useEffect(
      ()=>{
        donechange((Math.floor((white/users.split("").length)*100)));
      }
      ,[white]);
      let percent={
        width:`${doneper}%`,
      }

 //This punction will be triggered when start will be clicked
  async function handleClick(event){
    event.preventDefault();
    handleStart(event);
  }
  //This function will be triggered when tryagain button will be clicked
  async function handleTryClick(e){
    e.preventDefault();
    tryclick();
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
        <span className="timer">: {(score==="Race starts in")?StartingCounter:currenttime}</span>
      </div>
      <p id="pr">Progress{".".repeat(currenttime%6)}</p>
      {/* try again  part*/}
      {(multiplayer)?(
      <div>
        {playerdata.map((data)=>{
          return(
            <div className="flex-name">
            <div className="identifier">
          <p className="per">{data.Name}</p>
          </div>
          <div className="progress" style={{width:`${data.done}%`}}>
          <hr className="hrleft"/>
          <p className="per" style={(data.done<20)?{display:"none"}:null}>{data.wpm}wpm</p>
          <hr className="hrRight"/>
          <p className="per">{data.done}%</p>
      </div>
      </div>)
        })}
      </div>):(
      <div style={(!racingprev)?{display:"none"}:null}>
      <div className="flex-name">
      <div className="identifier">
      <p className="per">Your&nbsp;Previous</p>
      </div>
      <div className="progress" style={{width:`${prevwidth.width}%`}}>
      <hr className="hrleft"/>
      <p className="per" style={(prevwidth.width<20)?{display:"none"}:null}>{Math.round(((prevwidth.white/prevwidth.time)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{prevwidth.width}%</p>
      </div>
      </div>
      </div>)}

      <div >
      <div className="flex-name">
      <div className="identifier">
      <p className="per">You</p>
      </div>
      <div className="progress" style={percent}>
      <hr className="hrleft"/><p className="per" style={(doneper<20)?{display:"none"}:null}>{(doneper===100 && racingprev)?null:Math.round(((white/currenttime)*60)/5)}wpm</p>
      <hr className="hrRight"/>
      <p className="per">{doneper}%</p>
      </div>
      </div>
      <hr style={{'color':'yellow'}}/>
      </div>
      <form>
        <div className="form-group">
          <div className="innerArea" style={(probs.mode === 'light' )? null :secound_inner}>
            <p className="p" >{users.split("").map((data,index)=>{return AddDataSpan2(data,index,users ,inputext,id,scoreset,setdisable,wdone,input,switchanger,cor,currenttime,setcantryagain,lastSpeed,lastRaceIndex,TimeRaceFinished,racingprev,racecompleted)})}</p>
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
          {(!multiplayer)&&(
          <button className={`bt btn btn-${(probs.mode === 'light' )? "success" :"dark"} btn-outline${(probs.mode === 'light' )? "-dark":"-light"} btn-lg btnRight`} 
          style={(!cantryagain)?{display:"none"}:null} onClick={(e)=>{
            setracingprev(true);
            handleTryClick(e);
          }}>Try Again</button>)}
          </div>
        </div>
      </form>
    </div>
  );
}
export default Typing;
