import React, { useState,useRef, useEffect} from 'react';
import Context from './Context';
import setT from '../component/timer';
import {io} from 'socket.io-client';
const Statecontext = (props) => {

    const [users, setUsers] = useState("The text will be here"); //contains text
    const [timer, switchanger] = useState(false);//check if time started
    const [currenttime, setTime] = useState(0);//to check current time
    const [input, inputext] = useState("");//reffing to input
    const [disable, setdisable] = useState(true);//disableling enableling input form
    const [score, scoreset] = useState("The Counter will be starting here");//chicking score
    const [doneper, donechange] = useState(0);//conaining what percentage is done
    let cor = useRef();//using to keep track if their is any wrong letter given
    let id = useRef();//containing refference of the interval id to stop or start timer
    const [StartingCounter,setStartingCounter]=useState(0);
    let startingCounterRef=useRef();
    // this hooks are used in for try again feature{
    let lastSpeed = useRef();//keeping last speed 
    let lastRaceIndex = useRef(0);//keeping track of last index where the last race ended 
    let previousRaces = useRef([{ white: 0, time: 0 }]);//keeping track of the fastest race no of character done in in centaint time
    let TimeRaceFinished = useRef();//keeping track of the time when race is finished 
    let [cantryagain, setcantryagain] = useState(false);//checking if first race is done.. and should we enable try again button}
    let datainput = useRef();//reffering text area
    const [white, wdone] = useState(0);//keeping track the number of words typed
    let racecompleted = useRef(false);//keeping track if the race is completed
    const [racingprev, setracingprev] = useState(false);//true if we try again
    const [prevwidth, setprevwidth] = useState({ width: 0, white: 0 });//calculating width from the white and keeping track of no of white done at that time in previous race
    //fetching text
    const url = "https://api.quotable.io/random";
    const fetchUserData = async () => {
      let p =await fetch(url);
      let parsedData=await p.json()
      setUsers(parsedData.content);
    };
    //handle Start function with counter
    async function handleStart(){
        if(multiplayer===true && multiplayermode===1){
          socket.emit("createNewroom",userdata);
        }
        scoreset("Race starts in");
        setStartingCounter(3);
        wdone(0);
        await fetchUserData();
        startingCounterRef.current=setInterval(()=>{
            setStartingCounter((prev)=>{return(prev-1)})
        },1000);
        setTimeout(async()=>{
           setdisable(false);
           clearInterval(startingCounterRef.current);
           setStartingCounter(0);
           //handle Click Code
           racecompleted.current=false;
           setcantryagain(false);
           setracingprev(false);
           if(timer===false){
           scoreset("Race Started");
           switchanger(true);
           setT(setTime,id);
           previousRaces.current=[{white:0,time:0}];
           lastSpeed.current=0;
           lastRaceIndex.current=0;
           setTimeout(()=>{
            datainput.current.focus();
           },0)
           
         }
           else{
             switchanger(false);
             clearInterval(id.current);
           }
        },3000)
    }
    //handle try again 
    async function tryclick(){
        scoreset("Race starts in");
        setStartingCounter(3);
        wdone(0);
        startingCounterRef.current=setInterval(()=>{
            setStartingCounter((prev)=>{return(prev-1)})
        },1000);
        setTimeout(async()=>{
            racecompleted.current=false;
            clearInterval(startingCounterRef.current);
            wdone(0);
            setcantryagain(false);
            setdisable(false);
            scoreset("The Counter will be starting here");
            switchanger(true);
            setT(setTime,id);
            setTimeout(()=>{ datainput.current.focus()},0)
           
         },3000)
    }

    //login part
    let [logedin,setlogedin]=useState(false);
    //setting logedin data
    let [userdata,setuserdata]=useState({name:"",averageSpeed:"",NoofRaces:"",text:"",wpm:"",img:""});

    async function fetchuserdata(){
        console.log("Inside fetchuser")
        const response = await fetch("http://localhost:5000/api/auth/getuserdata", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "authToken": localStorage.getItem("token")
            },
          
          });
          const json=await response.json();
          console.log(json)
          if(json.success!== false){
          let b=json.wpm;
          let a=0;
          let c=0;
          if(b.length){
          for(let i=0;i<b.length;i++){
            a=a+b[i];
          }
          c=Math.round(a/b.length)
        }
        
          setuserdata({name:json.Name,averageSpeed:c,NoofRaces:json.NoofRaces,wpm:b,races:json.races,text:json.text,wpmhistory:b,img:json.img})
        }
    }

    async function updateUserData(data){
      const response = await fetch(`http://localhost:5000/api/data/update`, {
        method: "PUT",  
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token")
        },
        body: JSON.stringify({...data}), 
      });
      const json=await response.json();
      console.log(json)
    }
    //multiplayer States
    //States required for multiplayer
    let [room,setroom]=useState(-5);
    let [multiplayer,setmultiplayer]=useState(false);
    let [playerdata,setplayerdata]=useState([]);
    let [socket,setsocket]=useState();
    //multiplayermode be the mode player want to play
    //not multiplayer null
    //multiplayer random   0
    //multiplayer join room 1
    //multiplayer create room 2
    let [multiplayermode,setmultiplayermode]=useState();
    let [mystatus,setmystatus]=useState();
    //connecting to socket
    useEffect(()=>{
      if(multiplayer===true){
        setsocket(io.connect("http://localhost:3001"));
        console.log("connected");
      }
    
    },[multiplayer])


    //update / change in data during race
    useEffect(()=>{
      if(multiplayer===true){
        socket.on("join_room",(data)=>{
          // setplayerdata([...playerdata,data]);
          console.log(`The data received ${JSON.stringify(data)}`)
          console.log(`set player data ${JSON.stringify(data.room)}`)
          let playerData={Name:data.Name,done:0,wpm:0,status:data.PlayerStatus};
          setplayerdata([...playerdata,playerData]);
          setroom(parseInt(data.room));
          console.log(`set player data ${data.status}`)
        })
        socket.on("setUpdatedData",(data)=>{
          // {Name:data.Name,done:data.persentDone}
          console.log(`Player State: ${playerdata}`)
          let a=playerdata;
          console.log(`player datas: ${JSON.stringify(a)}`)
          console.log(`player datas recieved: ${JSON.stringify(data)}`)
          let index= a.findIndex((x)=>{
            return x.name===data.Name;
          })
          console.log(index);
          // a=a[index].done=data.persentDone;
          // setplayerdata(a);
        })
        socket.on("JoinedPlayers",(data)=>{
          let filteredData=data.filter((obj)=>{return obj.Name!==userdata.name })
          setplayerdata(filteredData);
        })
        socket.on("Anotherjoin",(data)=>{
          console.log(`Another join data ${JSON.stringify(data)}`);
          let a={
            Name:data.Name,
            done:0,
            wpm:0,
            status:data.status
          }
          setplayerdata([...playerdata,a]);
        })
        // {room,status:"Master"}
        socket.on("join_room",(data)=>{
          setroom(data.room);
          setmystatus(data.status);
        })

      }
    },[socket])


    return (
        <Context.Provider value=
        {{users,setUsers,timer,switchanger,currenttime,setTime,input,inputext,disable,setdisable,
        score,scoreset,doneper,donechange,cor,id,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,
        cantryagain,setcantryagain,datainput,white,wdone,racecompleted,racingprev,setracingprev,prevwidth,
        setprevwidth,handleStart,StartingCounter,tryclick,
        logedin,setlogedin,fetchuserdata,userdata,setuserdata,updateUserData,
        multiplayer,setmultiplayer,
        playerdata,setplayerdata,
        socket,room,setroom,
        multiplayermode,setmultiplayermode
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default Statecontext;