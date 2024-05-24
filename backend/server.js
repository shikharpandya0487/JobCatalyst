const bodyParser = require('body-parser');
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const testRouter = require('./src/Routes/UserRoutes/user.routes.js');
const authRouter = require("./src/Routes/Auth/auth.js");
const postRouter = require("./src/Routes/PostRoutes/post.js");
const resumeRouter = require("./src/Routes/ResumeRoutes/resume.js");
const userRouter = require("./src/Routes/UserRoutes/userData.js");
const chatRouter = require('./src/Routes/chatRoutes/chatRoutes.js');
const messageRoutes = require('./src/Routes/messageRoutes/messageRoutes.js');
const path = require("path");
const connectDb = require("./src/database/Connection.js");
const cookieParser = require("cookie-parser");
const jobRoutes = require("../backend/src/Routes/jobRoutes/jobRoute.js");
const jobRecordRoutes = require("../backend/src/Routes/jobRecordRoutes/jobRecordRoute.js");
const jobApplyRoute = require("./src/Routes/ApplyJobRoutes/ApplyJobRoute.js");

app.use(cors({
  origin: 'https://shikharpandya0487.github.io/',
  credentials: true 
}));
app.use("/uploads",express.static("uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRouter); 
app.use("/api/post", postRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/profile/jobrecords", jobRecordRoutes);
app.use("/api/applyjob", jobApplyRoute);

const PORT = process.env.PORT;
connectDb();

const server = app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

const io = require('socket.io')(server, {
  pingTimeout: 50000,
  cors: {
    origin: 'http://localhost:3000', // Specify your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Connected to the client (socket.io)");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("This is the user id ", userData._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    console.log("User joined the room ", room);
  });

  socket.on("new-msg", (newMsg) => {
    var chat = newMsg.chat;

    if (!chat.users) {
      return console.log("Chat users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id === newMsg.sender._id) {
        return;
      }
      socket.in(user._id).emit("Msg-recieved", newMsg);
    });
  });

  socket.on("typing", (user) => socket.in(user).emit("Typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("Stop typing"));

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
