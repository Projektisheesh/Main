const socket = io("https://hakkerikone-server.northeurope.cloudapp.azure.com/");

// Destructure DOM elements for ease of use
const {
  join: joinForm,
  roomDiv,
  "msg-input": writeMsg,
  leaveBtn,
  roomNumber,
  messages,
  username,
  message: inp,
  sendMsg,
} = document;

const toggleDisplays = (showJoin) => {
  joinForm.style.display = showJoin ? "block" : "none";
  roomDiv.style.display = showJoin ? "none" : "block";
  writeMsg.style.display = showJoin ? "none" : "block";
  leaveBtn.style.display = showJoin ? "none" : "block";
  roomNumber.style.display = showJoin ? "none" : "block";
};

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const room = document.querySelector('input[name="room"]:checked').value;
  socket.emit("join", username.value, room);

  username.value = "";
  toggleDisplays(false);
  roomNumber.innerHTML = `You are chatting about ${room}`;
});

leaveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  socket.emit("leave");
  toggleDisplays(true);
  messages.innerHTML = "";
});

writeMsg.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("emitting", inp.value);
  socket.emit("write message", inp.value);
  inp.value = "";
});

socket.on("new message", (msg, user) => {
  const item = document.createElement("li");
  item.innerHTML = `${user}: </b>${msg}`;
  messages.appendChild(item);
});

socket.on("response", console.log);
socket.on("leaveResponse", console.log);

// Send chat message also by pressing enter
writeMsg.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMsg.click();
  }
});
