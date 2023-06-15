import React, { useState,useRef} from "react";
import { incorrect,correct,done } from "./textColor";
function Typing() {

  const [users, setUsers] = useState("The text will be here");
  const [timer,switchanger]=useState(false);
  const [currenttime,setTime]=useState(0);
  const [input,inputext]=useState("");
  // const [use,refchange]=useState(-1);
  const [score,scoreset]=useState("The Counter will be starting here");
  let cor=useRef();
  cor.current=true;
  let datainput=useRef();
  const url = "http://api.quotable.io/random";
  const [white,wdone]=useState(0);

  

  let date;
  function gettime(){
    return Math.floor((new Date()-date)/1000);
  }
  let id=useRef();
  function setT(){
    date=new Date();
    setTime(0);
    id.current=setInterval(()=>{
      setTime(gettime())
    },1000)
  }
  const fetchUserData = async () => {
    let p =await fetch(url);
    let parsedData=await p.json()
    setUsers(parsedData.content);
  };
 
  async function handleClick(event){
    wdone(0);
    event.preventDefault();
    if(timer===false){
    await fetchUserData();
    switchanger(true);
    datainput.current.focus();
    setT();
    addDataSpan2();
  }
    else{
      switchanger(false);
      clearInterval(id.current);
    }
  }
  function change(event){
    inputext(event.target.value);
    
  }

  function addDataSpan2(ch,index){
    if(index<white){
      return (<span style={done}>{ch}</span>);
    }
    else if((input[index-white]===users[index] && (white+input.length-1)<=index )&& cor.current!==false){
      if((white+input.length)===users.length){
        wdone(index+1)
        inputext("")
        switchanger(false);
        clearInterval(id.current);
        scoreset("Your typing speed is:")
        setTime((pre)=>{
          console.log(Math.round((users.split(" ").length/pre)*60))
          return(Math.round((users.split(" ").length/pre)*60));});
      }
      if(users[index]===' ' ){
        wdone(index+1);
        inputext("");
      }
      return (<span style={correct}>{ch}</span>)
    }
    else if((input[index-white]!==users[index] || cor.current===false) && ((white+input.length-1)>=index)){
      cor.current=false;

      return (<span style={incorrect}>{ch}</span>);
    }
    else if(cor.current=true && index<=(white+(input.length-1))){
      return (<span style={correct}>{ch}</span>);
    }
    else {
      return (<span>{ch}</span>)
    }


 }
  
  return (
    <div className="typeapp_1_div">
      <div className="counter">
        <span>{score}</span>
        <span className="timer">: {currenttime}</span>
      </div>
      <hr />
      <form>
        <div className="form-group">
          <div className="innerArea">
            <p >{users.split("").map((data,index)=>{return addDataSpan2(data,index)})}</p>
            <input 
              type="textArea"
              value={input}
              ref={datainput}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Text will be typed here"
              onChange={change}
            />
          </div>

          <button className="bt btn btn-primary" onClick={handleClick}>Start</button>
        </div>
      </form>
    </div>
  );
}
export default Typing;
