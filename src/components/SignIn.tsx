import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn(props: any) {
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(props.auth, provider)
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
