import React, { useEffect } from 'react';

import './App.css';
import socketIOClient from "socket.io-client";
import { RoomProvider } from './context/RoomContext';
import { JoinButton } from './components/JoinButton';






const WS= "http://localhost:8000";

function App() {
  
  //in use Effect when our application is mounted we will connect to the server 
  
  useEffect(()=>{
    socketIOClient(WS);
  },[])
  return (
    <RoomProvider>
 

    
    
    <div className="App flex  justify-center items-center w-screen h-screen">
   <JoinButton/>

      
    </div>
    </RoomProvider>
  
  );
}


export default App;
