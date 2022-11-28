import express from "express";
import * as path from "path";
import { initializeApp } from "firebase/app";
import { ref, get, getDatabase } from "firebase/database";

const app = express();
const PORT = process.env.PORT || 5000;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUBQosxpjxI2BtKYbkYErCKQZ4wE6Jy4M",
  authDomain: "tripadvisor-copy.firebaseapp.com",
  databaseURL: "https://tripadvisor-copy-default-rtdb.firebaseio.com",
  projectId: "tripadvisor-copy",
  storageBucket: "tripadvisor-copy.appspot.com",
  messagingSenderId: "889726918247",
  appId: "1:889726918247:web:13dbea05e74f55ecdf7ec2",
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  console.log("headers added")
  next();
});

app.get("/", (req, res) => {
  readDataFromFirebase().then((r) => {
    console.log(r);
    res.json(r);
  });
});

app.get("/test", (req, res) => res.send("test"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
