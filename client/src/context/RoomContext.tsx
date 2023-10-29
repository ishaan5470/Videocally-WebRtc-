import {  createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
const WS= "http://localhost:8000";


export const RoomContext=createContext<null | any>(null)
//connecting our websocket
const ws=socketIOClient(WS);

//export roomProvider from this file 
export const RoomProvider:any=({children}:any)=>


{
    const enterRoom=({roomId}:{roomId:"string"})=>{
      
        console.log({roomId},"here is the room id ");
    }
    useEffect(()=>{
        console.log("room is joined")
        ws.on("room-created",enterRoom)
    },[]);
    return(
    <RoomContext.Provider value={{ws}}>
        {children}
        
    </RoomContext.Provider>  
    );
}