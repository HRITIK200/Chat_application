// ✅ Import Firebase setup
import { db, ref, push, onChildAdded } from "./firebase.js";


// ==== SELECT ELEMENTS ====
const loginScreen = document.getElementById("loginScreen");
const chatScreen = document.getElementById("chatScreen");
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("joinBtn");
const logoutBtn = document.getElementById("logoutBtn");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// ==== VARIABLES ====
let username = "";
const chatRef = ref(db, "messages");

// ==== LOGIN FUNCTION ====
joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name === "") {
    alert("Please enter your name to join the chat!");
    return;
  }
  username = name;
  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});

// ==== LOGOUT FUNCTION ====
logoutBtn.addEventListener("click", () => {
  username = "";
  chatScreen.classList.add("hidden");
  chatBox.innerHTML = "";
  loginScreen.classList.remove("hidden");
  usernameInput.value = "";
});

// ==== SEND MESSAGE FUNCTION ====
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msgText = messageInput.value.trim();
  if (msgText === "") return;

  const msgData = {
    sender: username,
    message: msgText,
   time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })

  };

  push(chatRef, msgData);
  messageInput.value = "";
}

// ==== RECEIVE MESSAGE FUNCTION ====
onChildAdded(chatRef, (data) => {
  const msg = data.val();
  displayMessage(msg);
});

function displayMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  if (msg.sender === username) {
    div.classList.add("my-message");
  }

  div.innerHTML = `
    <div class="sender">${msg.sender}</div>
    <div class="text">${msg.message}</div>
    <div class="time">${msg.time}</div>
  `;
  if (msg.sender === username) {
  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (confirm("Delete this message?")) {
      remove(ref(db, "messages/" + data.key));
      div.remove();
    }
  });
}

  chatBox.appendChild(div);
  if (msg.sender !== username) {
  document.getElementById("msgSound").play();
  }

 chatBox.scrollTo({
  top: chatBox.scrollHeight,
  behavior: "smooth"
});

}
const typingIndicator = document.getElementById("typingIndicator");
let typingTimeout;

messageInput.addEventListener("input", () => {
  push(ref(db, "typing/"), { user: username, typing: true });
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    push(ref(db, "typing/"), { user: username, typing: false });
  }, 1000);
});

import { onChildAdded as onTypingAdded } from "./firebase.js";
onTypingAdded(ref(db, "typing/"), (data) => {
  const typingData = data.val();
  if (typingData.user !== username && typingData.typing === true) {
    typingIndicator.classList.remove("hidden");
  } else {
    typingIndicator.classList.add("hidden");
  }
});
