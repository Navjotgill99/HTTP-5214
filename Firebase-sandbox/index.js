
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {
    getDatabase,
    ref,
    child,
    get,
    set,
    push,
    onValue,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";               
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDOLuF6tL79SnBdIjvDBkunwBlcii3jw1Y",
    authDomain: "humber-sandbox-66eea.firebaseapp.com",
    projectId: "humber-sandbox-66eea",
    storageBucket: "humber-sandbox-66eea.appspot.com",
    messagingSenderId: "138903739134",
    appId: "1:138903739134:web:d0b17bd413d37c721823af"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const database = getDatabase();

  const messagesRef = ref(database, "messages");

  document.getElementById("form").addEventListener("submit", () => {
    const name = document.getElementById("name").value;
    const msg = document.getElementById("msg").value;
    const newMessage = push(messagesRef);

    set(newMessage, {
        createdAt: Date.now(),
        message: msg,
        name: name
    });
  });

  onValue(messagesRef, (snapshot) => {
    //console.log(snapshot);
    const ul = document.getElementById("messages");

    ul.replaceChildren();

    snapshot.forEach((childSnapShot) => {
        console.log(childSnapShot.key);
        console.log(childSnapShot.val());
    
        const childData = childSnapShot.val();

        const text = document.createTextNode(childData.message + " ~ " + childData.name);
        const li = document.createElement("li");

        li.appendChild(text);
        ul.appendChild(li);
    });
  });
