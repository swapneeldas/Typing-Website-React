import React, { useContext, useState } from 'react';
import InnerItem from './InnerItem/InnerItem';
import "../../profile.css"
import Context from '../../Context/Context';
import Createraces from './InnerItem/createraces';
const Profile = () => {
  let context = useContext(Context);
  let {userdata,setuserdata,updateUserData} = context;
  let [changeData,setchangeData]=useState({Name:"",img:""});

  let a = [{
    Name: "Default",
    img: "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
  },
  {
    Name: "Car",
    img: "https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/car-photography/car-photography_fb-img_1200x800.jpg"
  },
  {
    Name: "Vegita",
    img: "https://i1.sndcdn.com/artworks-y1WcOJwtzfhThB5i-kDG3rg-t500x500.jpg"
  },
  {
    Name: "Goku",
    img: "https://images8.alphacoders.com/864/864900.png"
  }];
  function updatephoto(){
    if(changeData.Name=""){
      return;
    }
    setuserdata({...userdata,['img']:changeData.img})
    updateUserData({"img":changeData.img})
  }
  return (
    <div className='container profile'>
      <div className='insidesprofile'>
        <h1>Edit your profile</h1>
        <div className='profilePhotoChange'>
          <h1>Profile Picture</h1>
          <div className='photoes'>
            {a.map((data,index) => {
              return <InnerItem key={'@i'+index} index={index} array={a} data={data} changeData={changeData} setchangeData={setchangeData}/>
            })}
          </div>
          <button type="submit" class="btn btn-primary" onClick={updatephoto}>Submit</button>
        </div>
        <div className='changeName'>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className='container racedata'>
          <h2>Race History</h2>
          {(userdata.text.length === 0) ? (
            <p>No Races to display</p>
          ) :
            <div className='Racesdata'>
              <table class="table">
                <thead>
                  <tr>
                    <th scope='col'>So.</th>
                    <th scope="col">Text</th>
                    <th scope="col">speed</th>
                    <th scope='col'> Race again</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.text.map((ch, i) => {
                      return <Createraces i={i} />
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile