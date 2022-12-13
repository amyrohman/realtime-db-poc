import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "./components/SignOut";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <p>User: {user ? "is logged in" : "is null"}</p>
      <section>
        {user ? <Dashboard database={database} /> : <SignIn auth={auth} />}
      </section>
      <section>
        <SignOut auth={auth} />
      </section>
    </div>
  );
}

export default App;
