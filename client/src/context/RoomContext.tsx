import {  createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
const WS= "http://localhost:8000";


export const RoomContext=createContext<null | any>(null)
//connecting our websocket
const ws=socketIOClient(WS);

//export roomProvider from this file 
export const RoomProvider:any=({children}:any)=>{

    const navigate=useNavigate();
    //make state that represent out cuurent peer and this variable is a type peer coming from peerjs 

    const [me,setMe]=useState<Peer>();
    const getUsers=({participants}:{participants:string[]})=>{
        console.log(participants,"particpants>>>>>");
        }
    const enterRoom=({roomId}:{roomId:"string"})=>{
      
        console.log({roomId},"here is the room id ");
        navigate(`/room/${roomId}`);
    }
    useEffect(()=>{
        console.log("room is joined");
        const meId=uuidV4();
        const peer=new Peer(meId);

        setMe(peer)
        ws.on("room-created",enterRoom);
        ws.on("get-users",getUsers);
    },[]);
    return(
    <RoomContext.Provider value={{ws,me}}>
        {children}
        
    </RoomContext.Provider>  
    );
}