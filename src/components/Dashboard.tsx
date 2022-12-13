import React from "react";
import { Timestamp } from "firebase/firestore";
import { ref, set } from "firebase/database";

function Dashboard(props: any) {
  return (
    <>
      <p>You are logged in!</p>
      <button onClick={() => generateDocument(props.database)}>
        Generate unique document
      </button>
    </>
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

function generateDocument(database: any) {
  let randomString = generateString(5);
  let createdAt = Timestamp.fromDate(new Date()).toDate();

  set(ref(database, "hello/"), {
    testField: `${randomString}`,
    newDate: `${createdAt}`,
  });
  console.log(`Generated data: ${randomString} at ${createdAt}`);
}

export default Dashboard;
