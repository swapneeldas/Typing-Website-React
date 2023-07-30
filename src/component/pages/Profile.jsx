import React from 'react';
import InnerItem from './InnerItem/InnerItem';
import "../../profile.css"
const Profile = () => {
    let a=[{Name:"Default",
    img:"https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"},
    {Name:"Car",
     img:"https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/car-photography/car-photography_fb-img_1200x800.jpg"},
     {
        Name:"Vegita",
        img:"https://i1.sndcdn.com/artworks-y1WcOJwtzfhThB5i-kDG3rg-t500x500.jpg"
     },
    {
        Name:"Goku",
        img:"https://images8.alphacoders.com/864/864900.png"
    }];
  return (
    <div className='container profile'>
        <div className='insidesprofile'>
        <h1>Edit your profile</h1>
        <div className='profilePhotoChange'>
            <h1>Profile Picture</h1>
            <div className='photoes'>
               { a.map((data)=>{
                  return <InnerItem data={data}/>
                })}
            </div>
        </div>
        <div className='changeName'>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

</div>
        </div>
    </div>
  )
}

export default Profile