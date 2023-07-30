import React, { useContext, useEffect } from 'react'
import {Link} from "react-router-dom";
import Context from '../../Context/Context';
const EntryPage = () => {
  let context=useContext(Context);
  let{setlogedin,fetchuserdata}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
     setlogedin(true);
     fetchuserdata();
    }
   },[])
 
  return (
    <>
    <div className='Entry'>
      <div className='Menu'>
      <div className='EntryBT'><Link className="link" to="/">Multiplayer</Link></div>
      <div className='EntryBT'><Link className='link' to='/joinRoom'>Play with friends</Link></div>
      <div className='EntryBT'><Link className="link" to="/SinglePlayer">Single Player</Link></div>
      </div>
    </div>
    </>
  )
}

export default EntryPage