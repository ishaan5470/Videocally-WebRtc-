import { Children, createContext } from "react";
import socketIOClient from "socket.io-client";
const WS= "http://localhost:8000";


export const RoomContext=createContext<null | any>(null)
//connecting our websocket
const ws=socketIOClient(WS);

//export roomProvider from this file 
export const RoomProvider:any=({children}:any)=>
{
    return(
    <RoomContext.Provider value={{ws}}>
        {children}
        
    </RoomContext.Provider>  
    );
}