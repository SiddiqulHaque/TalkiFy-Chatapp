const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const userRoutes = require("./Routes/userRoutes");
const messagesRoutes = require("./Routes/messagesRoutes");
const path = require("path");
const socket=require("socket.io");
dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    throw error;
  }
};
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been Uploaded");
});
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);
const server=app.listen(8000, (req, res) => {
  connect();
  console.log("Server is listening on port 8000");
});

const io=socket(server,{
  cors:{
    origin:"https://talkify-gjgz.onrender.com",
    credentials:true,
  },
})
global.onlineUsers=new Map();
io.on("connection",(socket)=>{
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
  })
  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.message);
    }
  })
})