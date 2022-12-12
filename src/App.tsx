import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat";
import { Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <p>User: {user ? "is logged in" : "is null"}</p>
        <section>{user ? <LoggedIn /> : <SignIn />}</section>
        <section>
          <SignOut />
        </section>
      </header>
    </div>
  );
}

function SignIn() {
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
}

function LoggedIn() {
  let createdAt = Timestamp.fromDate(new Date()).toDate();

  return (
    <>
      <p>You are logged in!</p>
      <button onClick={generateDocument}>Generate unique document</button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
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
  let createdAt = Timestamp.fromDate(new Date()).toDate();

  set(ref(database, "hello/"), {
    testField: `${randomString}`,
    newDate: `${createdAt}`,
  });
  console.log(`Generated data: ${randomString} at ${createdAt}`);
}

export default App;
