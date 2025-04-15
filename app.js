//Firestore Query Activity: Task 2

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
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

function displayResults(title, dataArray) {
  const outputDiv = document.getElementById("output");
  const section = document.createElement("section");
  section.innerHTML = `<h3>${title}</h3>`;

  const ul = document.createElement("ul");
  dataArray.forEach((data) => {
    const li = document.createElement("li");
    li.textContent = `${data.name} — ${data.city ?? "N/A"}, ${data.country} — ${
      data.worldwideFans
    }M fans`;
    ul.appendChild(li);
  });

  section.appendChild(ul);
  outputDiv.appendChild(section);
}

// 1. Show all teams in Spain
// const q1 = query(teamsRef, where("country", "==", "Spain"));
// const snapshot1 = await getDocs(q1);
// const results1 = [];
// snapshot1.forEach((doc) => {
//   results1.push(doc.data());
// });
// displayResults("Teams in Spain:", results1);

// // 2. Show all teams in Madrid, Spain
// const q2 = query(
//   teamsRef,
//   where("country", "==", "Spain"),
//   where("city", "==", "Madrid")
// );
// const snapshot2 = await getDocs(q2);
// const results2 = [];
// snapshot2.forEach((doc) => {
//   results2.push(doc.data());
// });
// displayResults("Teams in Madrid:", results2);

// 3. Show all national teams (city === null)
// const snapshot3 = await getDocs(teamsRef);
// const results3 = snapshot3.docs
//   .filter((doc) => doc.data().city === null)
//   .map((doc) => doc.data());
// displayResults("National Teams", results3);

// 4. Show all teams that are not in Spain
// const snapshot4 = await getDocs(teamsRef);
// const results4 = snapshot4.docs
//   .filter((doc) => doc.data().country !== "Spain")
//   .map((doc) => doc.data());
// displayResults("Non-Spanish Teams:", results4);

// 5. Show all teams not in Spain or England
// const snapshot5 = await getDocs(teamsRef);
// const results5 = snapshot5.docs
//   .filter((doc) => !["Spain", "England"].includes(doc.data().country))
//   .map((doc) => doc.data());
// displayResults("Non-Spanish or English Teams:", results5);

// 6. Teams in Spain with more than 700M fans
// const snapshot6 = await getDocs(teamsRef);
// const results6 = snapshot6.docs
//   .filter(
//     (doc) => doc.data().country === "Spain" && doc.data().worldwideFans > 700
//   )
//   .map((doc) => doc.data());
// displayResults("Spanish teams >700M:", results6);

// 7. Teams with 500M-600M fans
// const q7 = query(
//   teamsRef,
//   where("worldwideFans", ">=", 500),
//   where("worldwideFans", "<=", 600)
// );
// const snapshot7 = await getDocs(q7);
// const results7 = [];
// snapshot7.forEach((doc) => {
//   results7.push(doc.data());
// });
// displayResults("Teams with 500M to 600M", results7);

// 8. Teams where Ronaldo is a top scorer
// const q8 = query(teamsRef, where("topScorers", "array-contains", "Ronaldo"));
// const snapshot8 = await getDocs(q8);
// const results8 = [];
// snapshot8.forEach((doc) => {
//   results8.push(doc.data());
// });
// displayResults("Ronaldo is a top scorer", results8);

// 9. Ronaldo, Messi, or Maradona are top scorers
// const q9 = query(
//   teamsRef,
//   where("topScorers", "array-contains-any", ["Ronaldo", "Messi", "Maradona"])
// );
// const snapshot9 = await getDocs(q9);
// const results9 = [];
// snapshot9.forEach((doc) => {
//   results9.push(doc.data());
// });
// displayResults("Ronaldo, Messi, or Maradona are top scorer", results9);

// -------------------------------------------------------------------

// Task 3 - Updating Data

// Task 3 Part A

async function updateTeamsData() {
  const snapshot = await getDocs(teamsRef);

  snapshot.forEach(async (teamDoc) => {
    const data = teamDoc.data();
    const ref = doc(db, "teams", teamDoc.id);

    // Update Real Madrid
    if (data.name.includes("Real Madrid")) {
      await updateDoc(ref, {
        name: "Real Madrid FC",
        worldwideFans: 811,
        topScorers: data.topScorers
          .filter((scorer) => scorer !== "Hazard")
          .concat("Crispo"),
      });
      console.log("Updated Real Madrid FC");
    }

    // Update Barcelona
    if (data.name === "Barcelona") {
      await updateDoc(ref, {
        name: "FC Barcelona",
        worldwideFans: 747,
        topScorers: data.topScorers
          .filter((scorer) => scorer !== "Puyol")
          .concat("Deco"),
      });
      console.log("Updated FC Barcelona");
    }
  });
}

//  Task 3 Part B

async function addJerseyColors() {
  const snapshot = await getDocs(teamsRef);

  snapshot.forEach(async (teamDoc) => {
    const data = teamDoc.data();
    const ref = doc(db, "teams", teamDoc.id);

    if (data.name === "Real Madrid FC") {
      await updateDoc(ref, {
        color: {
          home: "White",
          away: "Black",
        },
      });
      console.log("Added color to Real Madrid FC");
    }

    if (data.name === "FC Barcelona") {
      await updateDoc(ref, {
        color: {
          home: "Red",
          away: "Gold",
        },
      });
      console.log("Added color to FC Barcelona");
    }
  });
}

//  Task 3 Part C

async function updateJerseyAwayColors() {
  const snapshot = await getDocs(teamsRef);

  snapshot.forEach(async (teamDoc) => {
    const data = teamDoc.data();
    const ref = doc(db, "teams", teamDoc.id);

    if (data.name === "Real Madrid FC") {
      await updateDoc(ref, {
        "color.away": "Purple",
      });
      console.log("Changed RM away to Purple");
    }

    if (data.name === "FC Barcelona") {
      await updateDoc(ref, {
        "color.away": "Pink",
      });
      console.log("Changed Barca away to Pink");
    }
  });
}

updateTeamsData();
addJerseyColors();
updateJerseyAwayColors();
