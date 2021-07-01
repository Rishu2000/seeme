const express = require("express"); 
const app = express();                              //Little expansion.
const server = require("http").createServer(app);   //Used http server because need to get connected to the socket.io.
const cors = require("cors");

const io = require("socket.io")(server,{
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

server.listen(PORT, () => {             //here server is already present so no need for "app.listen()"
    console.log(`server is running on port ${PORT}`);
})