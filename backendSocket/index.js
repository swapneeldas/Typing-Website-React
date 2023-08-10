const express=require('express');
const app=express();
const cors=require('cors');
const http=require('http');
let rooms=[125,55];
let randomroom=[];
let Room={
    Room_id:0,
    Playerdatas:[{
        Name:"Something",
        done:10,
        status:"Connected",
        FullRaceData:[{},{},{}]
    }],
    AllConnected :true,
    Status:"Full Started waiting  "
}

app.use(cors());
const {Server}=require("socket.io");
const server=http.createServer(app);
function createRoom(){
    let a=Math.floor(Math.random()*10000);
    if(rooms.includes(a)){
            return createRoom();
        }
    return a;
}
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(`User connect with id ${socket.id}`)
    socket.on("disconnect",(socket)=>{
        console.log(`User Disconnect with id ${socket.id}`)
    })
    socket.on("join_room",(data)=>{
        console.log(data);
        if(rooms.includes(parseInt(data.room))){
        console.log(data.room);
        socket.emit("join_room",{room:data.room})
        console.log(typeof(data.room));
        socket.join(data.room);
        console.log(`User with id ${socket.id} Join Room with id ${data.name}`)
        let a={room:data.room,status:"Player"}
        console.log(typeof(data.room))
        socket.to(data.room).emit("Anotherjoin",data);
        socket.emit("join_room",a);

    }
    else{
        console.log("Room no present");
        socket.emit("join_room",{room:"NotPresent"})
    }
    })

    // When clicked on multiplayer this will be triggered

    socket.on("createNewroom",(data)=>{
        //checking if thier is any room present if not create room  and push the player
        console.log(data)
       if(randomroom.length===0){
        console.log("1st room created");
       let room=createRoom();
       console.log("1st room created room "+room)
       let createdRoom={
        Room_id:room,
        playerdatas:[],
        Status:"Waiting"
       }
       console.log(`data.name ${JSON. stringify(data)}`)
       playerdata={
        Name:data.Name,
        done:0,
        PlayerStatus:"Master",
        status:"Connected",
    }
    createdRoom.playerdatas.push(playerdata)
    console.log(`created room ${JSON. stringify(createdRoom)}`)
       randomroom.push(createdRoom);
       console.log(room);
       room=room.toString()
       console.log(room);
       socket.join(room);
       let datasend={
        room:room,
        status:"Master"
       }
       socket.emit("join_room",datasend);
       return;
    }
     //Checking last room if it is have some space for a new player
       if(randomroom[randomroom.length-1].Status==="Waiting"){
        //joining last room
        let room=randomroom[randomroom.length-1].Room_id;
        playerdata={
            Name:data.Name,
            done:0,
            PlayerStatus:"Player",
            status:"Connected",
        }
        console.log(randomroom[randomroom.length-1]);
        randomroom[randomroom.length-1].playerdatas.push(playerdata);
        room=room.toString()
        socket.join(room);
        socket.emit("join_room",{room,status:"Player"});
        socket.to(room).emit("Anotherjoin",playerdata)
        socket.emit("JoinedPlayers",randomroom[randomroom.length-1].playerdatas)
        //checking if the last room we join in Full or not after Joining
        if(randomroom[randomroom.length-1].playerdatas.length===5){
            //So the last room is full so 
            //making it's status full
            randomroom[randomroom.length-1].Status="Full";
            //creating new room for other player to join
            let room=createRoom();
            let createdRoom={
             Room_id:room,
             playerdatas:[],
             Status:"Empty"
            }
            randomroom.push(createdRoom);
        }
       }
       //if room Empty
       if(randomroom[randomroom.length-1].Status==="Empty"){
        //checking if last room is if empty if empty we are pushing this player as the master of the room
        let room=randomroom[randomroom.length-1].room;
        playerdata={
            Name:data.Name,
            done:0,
            PlayerStatus:"Master",
            status:"Connected",
            FullRaceData:[],
        }
        randomroom[randomroom.length-1].status="Waiting"
        randomroom[randomroom.length-1].playerdatas.push(playerdata);
        socket.join(room);
        socket.emit("join_room",{room,status:"Master"});
       }

    })


    //updating playerdata
    // let Room={
    //     Room_id:0,
    //     Playerdatas:[{
    //         Name:"Something",
    //         done:10,
    //         status:"Connected",
    //     }],
    socket.on("update_data",(data)=>{
        // et a={persentDone:persent_done,Room:room,Name:userdata.name,Multiplayermode:multiplayermode}
        if(data.multiplayermode===0){
            a=(data.Room).toString();
            let PlayerRoomIndex=randomroom.findIndex((x)=>x.Room_id===data.Room);
            let PlayerPlayerdatasIndex=randomroom[a].Playerdatas.findIndex((x)=>x.Name===data.Name);
            randomroom[PlayerRoomIndex].playerdatas[PlayerPlayerdatasIndex].done=data.persentDone,
            socket.to(a).emit("setUpdatedData",{Name:data.Name,done:data.persentDone})
        }
        let a=data;
        // console.log(data);
        // delete a.Room
        a=(data.Room).toString();
        console.log(data.Room)
        console.log(typeof(a));
        socket.to(a).emit("setUpdatedData",data)
    })
})

server.listen(3001,()=>{
    console.log("Server Running");
})