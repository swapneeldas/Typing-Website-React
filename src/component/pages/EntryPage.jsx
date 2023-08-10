import React, { useContext, useEffect } from 'react'
import {Link} from "react-router-dom";
import Context from '../../Context/Context';
const EntryPage = () => {
  let context=useContext(Context);
  let{setlogedin,fetchuserdata,multiplayer,setmultiplayer,setmultiplayermode,multiplayermode,socket,userdata}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
     setlogedin(true);
     setmultiplayermode(0);
     fetchuserdata();
    }
   },[])
  //  useState({name:"",averageSpeed:"",NoofRaces:"",text:"",wpm:"",img:""});
   function onmulclick(){
    setmultiplayer(true);
    console.log(multiplayer);
    let playerdata={
      Name:userdata.name,
      done:0,
  }
  setTimeout(() => {
    try {
      console.log("room created")
      socket.emit("createNewroom",{playerdata})
    } catch (error) {
      console.log(error)
    }
      
  }, 10);

   }
 
  return (
    <>
    <div className='Entry'>
      <div className='Menu'>
      <Link className="link" to="/MultiPlayer" ><div className='EntryBT' onClick={onmulclick}>Multiplayer</div></Link>
      <div className='EntryBT'><Link className='link' to='/joinRoom'>Play with friends</Link></div>
      <div className='EntryBT'><Link className="link" to="/SinglePlayer">Single Player</Link></div>
      </div>
    </div>
    </>
  )
}

export default EntryPage