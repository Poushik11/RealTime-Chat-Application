const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  // Listens when a new user joins the server
  socket.on("newUser", (data) => {
    // Adds the new user to the list of users
    users.push({ socketID: socket.id, username: data });
    // Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    // Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // Sends the updated list of users to the client
    io.emit("newUserResponse", users);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
