//const socket = io("https://mdds-server-jj.northeurope.cloudapp.azure.com/");
const socket = io();

const joinForm = document.querySelector("#join");
const roomDiv = document.querySelector("#roomDiv");
const writeMsg = document.querySelector("#msg-input");
const leaveBtn = document.querySelector("#leaveBtn");
const roomNumber = document.querySelector("#roomNumber");
const messages = document.getElementById("messages");

joinForm.addEventListener("submit", (event) => {
  const username = document.getElementById("username");
  const room = document.querySelector('input[name="room"]:checked').value;
  socket.emit("join", username.value, room);
  username.value = "";
  joinForm.style.display = "none";
  roomDiv.style.display = "block";
  writeMsg.style.display = "block";
  leaveBtn.style.display = "block";
  roomNumber.style.display = "block";
  roomNumber.innerHTML = "You are chatting about " + room;
  event.preventDefault();
});

leaveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  socket.emit("leave");
  joinForm.style.display = "block";
  roomDiv.style.display = "none";
  writeMsg.style.display = "none";
  leaveBtn.style.display = "none";
  roomNumber.style.display = "none";
  messages.innerHTML = "";
});

writeMsg.addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("message");
  console.log("emitting", inp.value);
  socket.emit("write message", inp.value);
  inp.value = "";
});

socket.on("new message", (msg, username) => {
  const item = document.createElement("li");
  item.innerHTML = `${username}: </b>` + msg;
  document.getElementById("messages").appendChild(item);
});

socket.on("response", (msg) => {
  console.log(msg);
});

socket.on("leaveResponse", (msg) => {
  console.log(msg);
});

// Send chat message also by pressing enter
writeMsg.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("sendMsg").click();
  }
});
