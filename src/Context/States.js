import React, { useState,useRef} from 'react';
import Context from './Context';
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

    return (
        <Context.Provider value=
        {{users,setUsers,timer,switchanger,currenttime,setTime,input,inputext,disable,setdisable,
        score,scoreset,doneper,donechange,cor,id,lastSpeed,lastRaceIndex,previousRaces,TimeRaceFinished,
        cantryagain,setcantryagain,datainput,white,wdone,racecompleted,racingprev,setracingprev,prevwidth,
        setprevwidth}}>
            {props.children}
        </Context.Provider>
    )
}
export default Statecontext;