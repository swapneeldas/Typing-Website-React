import React, { useState } from 'react'
import "./joinRoom.css";

const joinRoom = () => {
    let [room,setroom]=useState(0);
    function joinRoom(){
        setroom(1);
    }
    function createRoom(){
        setroom(2);
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
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
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

export default joinRoom