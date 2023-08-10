import React, { useContext } from "react";
import { correct, incorrect, done } from "./textColor";
import Context from "../Context/Context";
function AddDataSpan2(ch,index,users,inputext,id,scoreset,setdisable,wdone,input,switchanger,cor,time,setcantryagain,lastSpeed,lastRaceIndex,TimeRaceFinished,racingprev,racecompleted,) 
{
  let context=useContext(Context);
  let{userdata,setuserdata,currenttime,white,previousRaces,updateUserData, multiplayer,setmultiplayer,room,
    playerdata,setplayerdata,
    multiplayermode,setmultiplayermode,
    socket}=context;

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
   //end of race
    else if ( input[index - white] === users[index] && white + input.length - 1 <= index && cor.current !== false) {
    if (white + input.length === users.length) {
      setcantryagain(true);
      wdone(index + 1);
      inputext("");
      switchanger(false);
      scoreset("Race ended in:");
      setdisable(true);
      if(racingprev){
        TimeRaceFinished.current=time;
      }
      else{
        clearInterval(id.current);
        //storing data in data base
        let wpmraces=userdata.wpm;
        let a =0;
        for(let i=0;i<wpmraces.length;i++){
          a=a+wpmraces[i];
        }
        a=a+Math.round((((index + 1)/currenttime)*60)/5)
        a=Math.round(a/(wpmraces.length+1))
        //updating state
        setuserdata({...userdata,["wpm"]:[...userdata.wpm,Math.round((((index + 1)/currenttime)*60)/5)],["NoofRaces"]:(userdata.NoofRaces+1),["races"]:[...userdata.races,previousRaces.current],["averageSpeed"]:a,["text"]:[...userdata.text,users]})
        //updating database
        updateUserData({NoofRaces:userdata.NoofRaces+1,races:[...userdata.races,previousRaces.current],wpm:[...userdata.wpm,Math.round((((index + 1)/currenttime)*60)/5)],text:[...userdata.text,users]});
        
      }
      //collecting race speed for try agian race
      let donetime={ white:users.split("").length,time:time};
      previousRaces.current=[...previousRaces.current,donetime];
      lastSpeed.current=Math.round(((users.split("").length / time) * 60) / 5);   

      //send complete data in multiplayer mode
      
      
      //try again functionality data
      //first race
      if(lastRaceIndex.current===0){
        lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,
          index:(previousRaces.current.length-1)
        };
        clearInterval(id.current);
      }
      else{
        racecompleted.current=true;
      }
      //Race completed
      if(multiplayer){
        let persent_done =100;
        let a={persentDone:persent_done,Room:room,Name:userdata.name,Multiplayermode:multiplayermode,wpm:Math.round(((white/time)*60)/5)}
        socket.emit("update_data",a)
      }
      
    }
    if (users[index] === " ") {
      wdone(index + 1);
      inputext("");
      //collecting previous race data
      let donetime={ white:white,time:time}
      // previousRaces.current.push(donetime);
      previousRaces.current=[...previousRaces.current,donetime];
      // update data multiplayer mode
      if(multiplayer){
        let persent_done =Math.ceil(((index+1)/users.length)*100);
        console.log(socket)
        let a={persentDone:persent_done,Room:room,Name:userdata.name,Multiplayermode:multiplayermode,wpm:Math.round(((white/time)*60)/5)}
        socket.emit("update_data",a)
      }
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