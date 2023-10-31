//in this we want our use to know in which room we are in we will use useParams which helps us to get data from our url which id we go to 
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext, RoomProvider } from "../context/RoomContext";
import { VideoPlayer } from "../components/VidePlayer";
const Room=()=>{
    const {id}=useParams();
    //for user with the same link join the room we will use "ws" from our room context 
    const {ws,me,stream }=useContext(RoomContext)
    //on every id change  
    useEffect(()=>{
        if (me) {
        ws.emit("join-room",{roomId:id,peerId:me._id})
        }
        // console.log(me._id, "me>>>>>>>>>>>>")
        console.log(id,"room id it is ")
        console.log(me._id,"peer id it is ")
       

    } ,[id, me,ws ]) 
    return(
        <div>
            Room ${id}
            <div>
                <VideoPlayer stream={stream}/>
            </div>
        </div>
    )
}
export default Room;