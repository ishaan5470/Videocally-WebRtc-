import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid";

interface IRoomParams{
    roomId:string,
    peerId:string

}

// we will create variable which contain the list of our rooms
const rooms:Record<string,string[]>={}




export const RoomHandler=(socket:Socket)=>{
    // making a function for create room
    const createRoom=()=>{
        const roomId=uuidV4();
        rooms[roomId]=[];
        socket.join(roomId);
        socket.emit("room-created",{roomId})
        console.log("user created the room")

    }
    const joinRoom=({roomId,peerId}:IRoomParams)=>{
        if (rooms[roomId]){


        console.log("user joined the room",roomId,peerId)
        rooms[roomId].push(peerId);
        socket.to(roomId).emit("user-joined", {
            peerId,
        })
        socket.join(roomId);
        socket.emit("get-users" ,{
            roomId,
            participants:rooms[roomId]
        })
    }
    socket.on("disconnect",()=>{
        console.log("user left the room", peerId);
        LeaveRoom({roomId,peerId}); // we pass roomId and peerId to know which room to remove which peer

    })
}

const LeaveRoom=({peerId,roomId}:IRoomParams)=>{
    rooms[roomId]=rooms[roomId].filter((id)=>id!==peerId)
    // emit the even to the room
    socket.to(roomId).emit("user-disconnected",peerId)
}
    socket.on("create-room",createRoom)



    socket.on("join-room",joinRoom)


}