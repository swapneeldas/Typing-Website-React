import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../../Context/Context'
const Createraces = ({i}) => {
    let navigate=useNavigate();
    let context =useContext(Context);
    let {userdata,tryclick,previousRaces,setUsers, setracingprev,lastRaceIndex}=context;
    let databasetryagain=(i)=>{
      // console.log(userdata.races);
          lastRaceIndex.current={time:previousRaces.current[previousRaces.current.length-1].time,
          index:(previousRaces.current.length-1)
        };
      setracingprev(true);
      previousRaces.current=userdata.races[i];
      // lastRaceIndex.current=userdata.races[i].length;
      setUsers(userdata.text[i])
      console.log("This is i"+i)
      // console.log(userdata.text[i])
      navigate('/SinglePlayer')
      tryclick();
    }
  return (
    <>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{userdata.text[i]}</td>
      <td>{userdata.wpm[i]}</td>
      <td><button type="button" className="btn btn-primary" onClick={()=>{
        databasetryagain(i)}}>Try again</button></td>
    </tr>
    </>
  )
}

export default Createraces