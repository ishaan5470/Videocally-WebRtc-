import { Socket } from "socket.io";

export const RoomHandler=(socket:Socket)=>{
    //making a function for create room 
    const createRoom=()=>{
        console.log("user create the room")

    }
    const joinRoom=()=>{
        console.log("user joined the room ")

    }
    socket.on("create-room",createRoom)



    socket.on("join-room",joinRoom)

     
}