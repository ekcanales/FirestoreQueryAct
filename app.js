//Firestore Query Activity: Task 2

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNvaLICElsdDBEQxSYypIbz85jYw3s6_4",
  authDomain: "is424-query-activity.firebaseapp.com",
  projectId: "is424-query-activity",
  storageBucket: "is424-query-activity.appspot.com",
  messagingSenderId: "45033283625",
  appId: "1:45033283625:web:32f295a0449ef2334f3c38",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const teamsRef = collection(db, "teams");

// 1. Show all teams in Spain
const q1 = query(teamsRef, where("country", "==", "Spain"));
const snapshot1 = await getDocs(q1);
snapshot1.forEach((doc) => console.log("Spain:", doc.data()));

// 2. Show all teams in Madrid, Spain
const q2 = query(
  teamsRef,
  where("country", "==", "Spain"),
  where("city", "==", "Madrid")
);
const snapshot2 = await getDocs(q2);
snapshot2.forEach((doc) => console.log("Madrid, Spain:", doc.data()));

// 3. Show all national teams (city === null)
const snapshot3 = await getDocs(teamsRef);
snapshot3.docs
  .filter((doc) => doc.data().city === null)
  .forEach((doc) => console.log("National:", doc.data()));

// 4. Show all teams that are not in Spain
const snapshot4 = await getDocs(teamsRef);
snapshot4.docs
  .filter((doc) => doc.data().country !== "Spain")
  .forEach((doc) => console.log("Not Spain:", doc.data()));

// 5. Show all teams not in Spain or England
const snapshot5 = await getDocs(teamsRef);
snapshot5.docs
  .filter((doc) => !["Spain", "England"].includes(doc.data().country))
  .forEach((doc) => console.log("Not Spain or England:", doc.data()));

// 6. Teams in Spain with more than 700M fans
const snapshot6 = await getDocs(teamsRef);
snapshot6.docs
  .filter(
    (doc) => doc.data().country === "Spain" && doc.data().worldwideFans > 700
  )
  .forEach((doc) => console.log("Spain + >700M fans:", doc.data()));

// 7. Teams with 500M–600M fans
const q7 = query(
  teamsRef,
  where("worldwideFans", ">=", 500),
  where("worldwideFans", "<=", 600)
);
const snapshot7 = await getDocs(q7);
snapshot7.forEach((doc) => console.log("Fans 500M–600M:", doc.data()));

// 8. Teams where Ronaldo is a top scorer
const q8 = query(teamsRef, where("topScorers", "array-contains", "Ronaldo"));
const snapshot8 = await getDocs(q8);
snapshot8.forEach((doc) => console.log("Top scorer Ronaldo:", doc.data()));

// 9. Ronaldo, Messi, or Maradona are top scorers
const q9 = query(
  teamsRef,
  where("topScorers", "array-contains-any", ["Ronaldo", "Messi", "Maradona"])
);
const snapshot9 = await getDocs(q9);
snapshot9.forEach((doc) => console.log("Top scorer legends:", doc.data()));
