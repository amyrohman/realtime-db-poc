import React from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

export default function SignInAnonymous(props: any) {
  signInAnonymously(props.auth)
    .then(() => {
      // User is signed in
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });

  // Add observer for changes to user's sign in state
  onAuthStateChanged(props.auth, (user) => {
    if (user) {
      console.log(
        `${user.uid}: hit auth state changed hook, user is signed in`
      );
    } else {
      console.log("User is signed out from hook");
    }
  });

  return (
    <div>
      <p>Sign in anonymously</p>
    </div>
  );
}
