import express from "express";
import * as path from "path";
import { initializeApp } from "firebase/app";
import { ref, get, getDatabase } from "firebase/database";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG1vtZvk39qu54WTcZOFnWxvD6tLM8Bjw",
  authDomain: "putevoditel-41656.firebaseapp.com",
  projectId: "putevoditel-41656",
  storageBucket: "putevoditel-41656.appspot.com",
  messagingSenderId: "219263055462",
  appId: "1:219263055462:web:00f8f1155d2eee28e31fa7"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);

const readDataFromFirebase = async (id) =>
  get(ref(db))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

app.use(cors());

app.get("/", (req, res) => {
  readDataFromFirebase().then((r) => {
    console.log(r);
    res.json(r);
  });
});

app.get("/test", (req, res) => res.send("test"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
