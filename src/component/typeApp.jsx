import React, { useState,useRef} from "react";
import { incorrect,correct,done } from "./textColor";
console.log(incorrect);

function Typing() {

  const [users, setUsers] = useState("The text will be here");
  const [timer,switchanger]=useState(false);
  const [currenttime,setTime]=useState(0);
  const [input,inputext]=useState("");
  
  const [use,refchange]=useState(-1);
  
  let a=useRef();
  a.current=true;

  const url = "http://api.quotable.io/random";

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
    event.preventDefault();
    if(timer===false){
    await fetchUserData();
    switchanger(true);
    setT();
    addDataSpan();
  }
    else{
      switchanger(false);
      clearInterval(id.current);
    }
  }
  function change(event){
    inputext(event.target.value);
    
  }
  function addDataSpan(ch,index){
    if(index<input.length){
    if(input[index]===ch && a.current===true){
        if((input[index]===' ' && use<index)|| (index===(users.length-1)&& use<index)) {refchange(index)}
        return (<span key={index} style={(use>=index)?done:correct}>{ch}</span>);
      }
      else if (input[index]!==ch || a.current===false)  {
        a.current=false;
        return (<span key={index} style={incorrect}>{ch}</span>);
        
      } 
     }
    else{
      return (<span key={index}>{ch}</span>)
    }
    }
  
  return (
    <div className="typeapp_1_div">
      <div className="counter">
        <span>The Counter will be starting here</span>
        <span className="timer">: {currenttime}</span>
      </div>
      <hr />
      <form>
        <div className="form-group">
          <div className="innerArea">
            <p >{users.split("").map((data,index)=>{return addDataSpan(data,index)})}</p>
            <input 
              type="textArea"
              value={input}
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
