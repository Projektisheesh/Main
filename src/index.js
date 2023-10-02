const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    //TODO: remove user with socket.id from users array
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
    io.emit("chat message", msg);
  });
});
http.listen(5502, () => {
  console.log("port is 5502");
});
