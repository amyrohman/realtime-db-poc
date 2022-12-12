import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNiPxZg88ToKmS2-SdyLHK8SD1qrBm5IM",
  authDomain: "rtdb-poc-563aa.firebaseapp.com",
  databaseURL: "https://rtdb-poc-563aa-default-rtdb.firebaseio.com",
  projectId: "rtdb-poc-563aa",
  storageBucket: "rtdb-poc-563aa.appspot.com",
  messagingSenderId: "368443448565",
  appId: "1:368443448565:web:f2e2fca89c87a28eba79bc",
  measurementId: "G-H1P6K2W5FN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function App() {
  return <div className="App">
    <button onClick={generateDocument}>Generate unique document</button>
  </div>;
}

function generateString(length: number) {
  let result = "";
  const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateDocument() {
  let randomString = generateString(5);

  set(ref(database, 'hello/'), {
    testField: `${randomString}`
  });
  console.log(`Generated data: ${randomString}`)
}


export default App;
