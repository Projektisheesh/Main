const socket = io();
const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("message");

function showMessagesList() {
  messagesList.style.display = "block";
}
function hideMessagesList() {
  messagesList.style.display = "none";
}
hideMessagesList();

document
  .querySelector("#chat-message-input")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const inp = document.getElementById("message");
    console.log("emitting:", inp.value);
    socket.emit("chat message", inp.value);
    inp.value = "";
    showMessagesList();
  });

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = msg;
  document.getElementById("messages").appendChild(item);
  showMessagesList();
});
socket.on("response", (msg) => {
  console.log(msg);
});
