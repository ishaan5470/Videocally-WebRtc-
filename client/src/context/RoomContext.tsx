import {  createContext, useEffect, useState } from "react";
import { useReducer } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./PeerReducer";
import { addPeerAction, removePeerAction } from "./PeerActions";

const WS= "http://localhost:8000";


export const RoomContext=createContext<null | any>(null)
//connecting our websocket
const ws=socketIOClient(WS);

//export roomProvider from this file 
export const RoomProvider:any=({children}:any)=>{

    // using useReducer we will return two variables first one will be the state that is peers and second one is dispatch
    const [peers,dispatch]=useReducer(peersReducer,{});  





    const navigate=useNavigate();
    //make state that represent out cuurent peer and this variable is a type peer coming from peerjs 

    const [me,setMe]=useState<Peer>();
    const [stream,setStream]=useState<MediaStream>(); 
    const getUsers=({participants}:{participants:string[]})=>{
        console.log(participants,"particpants>>>>>");
        }
    const enterRoom=({roomId}:{roomId:"string"})=>{
      
        console.log({roomId},"here is the room id ");
        navigate(`/room/${roomId}`);
    }

    //function for removing peer 
    const removePeer=(peerId:string)=>{
        dispatch(removePeerAction(peerId))

    }

    useEffect(()=>{
        console.log("room is joined");
        const meId=uuidV4();
        const peer=new Peer(meId);

        setMe(peer)
        try {
            navigator?.mediaDevices?.getUserMedia({video:true,audio:true}).then((stream)=>{
                setStream(stream);
                console.log("this is my stream", stream)
            })
            
        } catch (error) {
            console.log(error);
            
        }
        ws.on("room-created",enterRoom);
        ws.on("get-users",getUsers);
        ws.on("user-disconnected",removePeer)
    },[]);

    //when we get our stream we need to call every peer in our room and they will send them there own stream to the room this is how peer to peer connetion works 
    useEffect(()=>{
        if(!me) return;
        if(!stream) return;
        //is we have both we will listen "user-joined" and also emit this even on our index.js in our server 
       
        
        ws.on("user-joined",({peerId})=>{ 
            console.log("check chckec ????????????????")
            //create call using peerobject 
            //here we are initiating the call and sending our stream
            
          

            const call=me.call(peerId,stream)
            //when our peer starts streams we dispatch an action 
            call.on("stream",(peerStream)=>{
            
                dispatch(addPeerAction(peerId,peerStream));
                console.log("this is calling functionality >>>>>>>>>>>>")
            })

        });
        me.on('call',(call)=>{
            //answering peer's call and sending our stream to them 
            console.log("call thingy working")

            call.answer(stream);
            //here in case of peerId we use call.peer (id of the person who is calling)

            call.on("stream",(peerStream)=>{
                dispatch(addPeerAction(call?.peer,peerStream))
            })
        })

    },[me,stream ])

  console.log({peers}, "these are my peers who joined")

    return(
    <RoomContext.Provider value={{ws,me,stream,peers}}>
        {children}
        
    </RoomContext.Provider>  
    );
}