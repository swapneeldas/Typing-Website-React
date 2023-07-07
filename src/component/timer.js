import React from 'react';
let date;
function gettime(){
  return Math.floor((new Date()-date)/1000);
}

function setT(setTime,id){
  date=new Date();
  setTime(0);
  id.current=setInterval(()=>{
    setTime(gettime())
  },1000)
}
export default setT;