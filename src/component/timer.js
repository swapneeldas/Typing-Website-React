import React,{useState} from 'react';
function timer(){
    let[time,setTime]=useState(0);
    function starttimer(){
        setInterval(() => {
            setTime((pre)=>{pre+1})
        }, 1000);
    }
}