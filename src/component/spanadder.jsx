import React from "react";
import { correct, incorrect, done } from "./textColor";
function AddDataSpan2(ch,index,users,white,inputext,id,scoreset,setdisable,wdone,input,switchanger,cor,time,setcantryagain,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,racingprev,racecompleted) 
{
  //done
  if (index < white) {
    if (index === 0) {
      return ( <span style={{...done,paddingLeft: "0.3vw",borderRadius: "5px 0px 0px 5px"}} >{ch}</span>);
    }
    if (index === users.length - 1) {
      return (
        <span  style={{...done,paddingRight: "0.3vw",borderRadius: "0px 5px 5px 0px"}}>{ch}</span>);
    }
    return <span style={done}>{ch}</span>;
   }
    else if ( input[index - white] === users[index] && white + input.length - 1 <= index && cor.current !== false) {
    if (white + input.length === users.length) {
      setcantryagain(true);
      wdone(index + 1);
      inputext("");
      switchanger(false);
      // clearInterval(id.current);
      scoreset("Your typing speed is:");
      setdisable(true);
      if(racingprev){
        TimeRaceFinished.current=time;
      }
      else{
        clearInterval(id.current);
      }
      //collecting last race data for try agian race
      let donetime={ white:users.split("").length,time:time};
      previousRaces.current=[...previousRaces.current,donetime];
      lastSpeed.current=Math.round(((users.split("").length / time) * 60) / 5);
      console.log(lastSpeed.current);
  
      
      //try again functionality data
      //first race
      // if(racingPrev)
      if(lastRaceIndex.current===0){
        lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,
                               index:(previousRaces.current.length-1)
                              };
        console.log("first race");
        console.log(`first race this is last race data ${lastRaceIndex.current.index+1}`)
      }
      else{
        racecompleted.current=true;
      }
      // // which should at the end of 2nd try again race 
      // else{                
      //   if(lastRaceIndex.current.time<previousRaces.current[previousRaces.current.length-1].time){
      //     previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1)
      //     console.log("current race speed is slower than previous race got hit");
      //   }
      // //   //if second speed is fater than first try again speed.
      //   else if(lastRaceIndex.current.time>previousRaces.current[previousRaces.current.length-1].time){
      //     previousRaces.current=previousRaces.current.slice(lastRaceIndex.current.index+1,previousRaces.current.length)
      //     lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,index:(previousRaces.current.length-1)};
      //     console.log("current race speed is faster than previous race got hit");
      //   }
      //   else{
      //     previousRaces.current=previousRaces.current.slice(0,lastRaceIndex.current.index+1);
      //     console.log("else part got trigger")
      //   }
      // }
    }
    if (users[index] === " ") {
      wdone(index + 1);
      inputext("");
      //collecting previous race data
      console.log("space is hit")
      let donetime={ white:white,time:time}
      // previousRaces.current.push(donetime);
      previousRaces.current=[...previousRaces.current,donetime];

  }
    if (index === 0) {
      return (
        <span style={{...correct,paddingLeft: "0.3vw",borderRadius: "5px 0px 0px 5px"}}>{ch}</span>
      );
    }
    return <span style={correct}>{ch}</span>;
  }
  //incorrect
  if (
    (input[index - white] !== users[index] || cor.current === false) && white + input.length - 1 >= index) {
    cor.current = false;
    if (index === 0) {
      return (
        <span style={{...incorrect,paddingLeft: "0.3vw",borderRadius: "5px 0px 0px 5px"}}>{ch}</span>);
    }
    if (index === users.length - 1) {
      return (<span style={{...incorrect,paddingRight: "0.3vw",borderRadius: "0px 5px 5px 0px"}}>{ch}</span>);
    }
    return <span style={incorrect}>{ch}</span>;
  }
  //correct
  else if ((cor.current = true && index <= white + (input.length - 1))) {
    if (index === 0) {return (<span style={{...correct,paddingLeft: "0.3vw",borderRadius: "5px 0px 0px 5px"}}> {ch}</span>); }
    if (index === users.length - 1) {return (<span style={{...correct,paddingRight: "0.3vw",borderRadius: "0px 5px 5px 0px" }}>{ch}</span>);  }
    return <span style={correct}>{ch}</span>;
  }
  //not written
  else {
    if (index === 0) {return (<span style={{paddingLeft: "0.3vw",borderRadius: "5px 0px 0px 5px"}}>{ch}</span>);
    }
    if (index === users.length - 1) {return (
        <span style={{paddingRight: "0.3vw",borderRadius: "0px 5px 5px 0px"}}>{ch}</span>);
    }
    return <span>{ch}</span>;
  }
}
export default AddDataSpan2;

// function addDataSpan2(ch,index){
//   if(index<white){
//     return (<span className="left-cornor" style={done}>{ch}</span>);
//   }
//   else if((input[index-white]===users[index] && (white+input.length-1)<=index )&& cor.current!==false){
//     if((white+input.length)===users.length){
//       wdone(index+1)
//       inputext("")
//       switchanger(false);
//       clearInterval(id.current);
//       scoreset("Your typing speed is:")
//       setdisable(true);
//       setTime((pre)=>{
//         return(Math.round((users.split("").length/pre)*60/5));});
//     }
//     if(users[index]===' ' ){
//       wdone(index+1);
//       inputext("");
//     }
//     return (<span style={correct}>{ch}</span>)
//   }
//   else if((input[index-white]!==users[index] || cor.current===false) && ((white+input.length-1)>=index)){
//     cor.current=false;

//     return (<span style={incorrect}>{ch}</span>);
//   }
//   else if(cor.current=true && index<=(white+(input.length-1))){

//     return (<span style={correct}>{ch}</span>);
//   }
//   else {
//     return (<span>{ch}</span>)
//   }
// }
