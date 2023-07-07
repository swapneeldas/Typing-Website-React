import React from "react";
import { correct, incorrect, done } from "./textColor";
function AddDataSpan2(ch,index,users,white,inputext,id,scoreset,setdisable,setTime,wdone,input,switchanger,cor,previousrace,setpreviousrace,racingprev,setracingprev,time,doneper,speed
) 
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
    else if ( input[index - white] === users[index] && white + input.length - 1 <= index &&cor.current !== false) {
    if (white + input.length === users.length) {
      wdone(index + 1);
      inputext("");
      switchanger(false);
      clearInterval(id.current);
      scoreset("Your typing speed is:");
      setdisable(true);
      //collecting last race data for try agian race
      let donetime={ white:users.split("").length,time:time}
      console.log(users.split("").length)
      setpreviousrace([...previousrace,donetime]);
      if(speed.current[0]===0 && speed.current[1]===0){
        speed.current[1]=Math.round(((users.split("").length / time) * 60) / 5);
        speed.current[0]=Math.round(((users.split("").length / time) * 60) / 5);
      }
      else if(speed.current[0]!==0 && speed.current[1]!==0){
        if(speed.current[0]>speed.current[1]){
          speed.current[1]=Math.round(((users.split("").length / time) * 60) / 5);        
        }
        else if(speed.current[0]<=speed.current[1]){
          speed.current[0]=speed.current[1];
          speed.current[1]=Math.round(((users.split("").length / time) * 60) / 5);
          console.log("this got tab")
        }
      }
    }
    if (users[index] === " ") {
      wdone(index + 1);
      inputext("");
      //collecting race data for try agian race
      let donetime={ white:white,time:time}
      setpreviousrace([...previousrace,donetime]);
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
