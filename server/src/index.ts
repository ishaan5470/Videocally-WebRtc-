import express from "express";
import http from "http";
// adding out websockets to this server
import {Server, Socket} from "socket.io";

// we cannot see user is connected because our both server is running at different port so to fix this
import cors from "cors";

const port=8000;
const app=express(); // creating an express app
app.use(cors)
const server=http.createServer(app); // create a http server
const io=new Server(server,{
    cors:{
        origin: "*",
        methods:["GET","POST"],
        },
});

io.on ("connection",(socket)=>{
    console.log("user is connected")
     //when the user shut downs the browser make a disconnnect event 
     socket.on('disconnect',()=>{
        console.log("user is disconnected");

     })
});

server.listen(port, ()=>{
    console.log(`i ammm listening on ${port}`)
})
