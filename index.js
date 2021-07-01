const express = require("express"); 
const app = express();                              //Little expansion.
const server = require("http").createServer(app);   //Used http server because need to get connected to the socket.io.
const cors = require("cors");

const io = require("socket.io")(server,{            //Require server info.
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/",(req,res) => {
    res.json("Server is running.")
})

io.on("connection",(socket) =>{
    socket.emit("me",socket.id);

    socket.on("disconnect",() =>{
        socket.broadcast.emit("callended");
    });

    socket.on("calluser",({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("calluser",{signalData, from, name});
    })

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccept", data.signal);
    })
})

server.listen(PORT, () => {             //here server is already present so no need for "app.listen()"
    console.log(`server is running on port ${PORT}`);
})