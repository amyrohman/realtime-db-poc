import React from "react";

export default function SignOut(props: any) {
  return (
    props.auth.currentUser && (
      <button onClick={() => props.auth.signOut()}>Sign Out</button>
    )
  );
}
