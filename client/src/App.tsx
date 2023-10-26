import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client";

const WS= "http://localhost:8000";

function App() {
  
  //in use Effect when our application is mounted we will connect to the server 
  
  useEffect(()=>{
    socketIO(WS);
  },[])
  return (
    <div className="App">
     
      <button>
        start a meeting
      </button>
    </div>
  );
}

export default App;
