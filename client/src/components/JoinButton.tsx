import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { join } from "path"

export const JoinButton:React.FunctionComponent=()=>{
    const {ws}=useContext(RoomContext)
    const joinRoom=()=>{
        //emit the message to our server that i want join-room
        ws.emit("join-room")
    }
    return(
        <>
        <button onClick={joinRoom} className='bg-rose-300 rounded-lg hover:bg-rose-500 px-4 py-2 text-lg text-white'>
        start a meeting
      </button>
        </>

    )
}