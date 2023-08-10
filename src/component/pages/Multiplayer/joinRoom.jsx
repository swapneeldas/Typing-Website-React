import React, { useContext, useState } from 'react'
import "./joinRoom.css";
import Context from '../../../Context/Context';
const JoinRoom = () => {
    let context=useContext(Context)
    let {socket,userdata}=context
    let [room,setroom]=useState(0);
    function joinRoom(){
        setroom(1);
    }
    function createRoom(){
        setroom(2);
    }
    let [roomcode,setroomcode]=useState("");

    function Change(e){
      setroomcode(e.target.value);
      console.log(roomcode);
    }
    function JoinRoom(e){
      e.preventDefault();
      // console.log(roomcode);
      // console.log(userdata);
      socket.emit("join_room",{...userdata,room:roomcode});
      // console.log(socket);
      setroomcode("");
    }
    return (
      <div>
    
    <div className='JoinOption'>
    <div className='join joinoptionbt' onClick={joinRoom}>Join Room</div>
    <div className='create joinoptionbt' onClick={createRoom}>Create Room</div>
    </div>
    
    <div className='container'>
    {(room==1)&&(
    <div>
    <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Room ID</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={roomcode} onChange={(e)=>{
      Change(e)}}/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={(e)=>{JoinRoom(e)}}>Submit</button>
</form>
    </div>)}
    { (room==2)&&(
 <div className='JoinedRoom'>
   <h1>RoomID:- 58205678</h1>
   <div className='players'>
    <h3>Players</h3>
    <p>player 1</p>
    <p>Player 2</p>
   </div>
 </div>)}
 </div>
    </div>
  )
}

export default JoinRoom