// ✅ Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQAjF0kbVo_Qy2I8rxuZAZ9viDvaPx9M4",
    authDomain: "chat-app-hritik-5d4a5.firebaseapp.com",
    projectId: "chat-app-hritik-5d4a5",
    storageBucket: "chat-app-hritik-5d4a5.firebasestorage.app",
    messagingSenderId: "166594487875",
    appId: "1:166594487875:web:6eff3c5ee6cf2225eb16f6"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, push, onChildAdded };
