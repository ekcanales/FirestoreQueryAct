const teams = [
  {
    name: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    worldwideFans: 798,
  },
  {
    name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    worldwideFans: 738,
  },
  {
    name: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    worldwideFans: 755,
  },
  {
    name: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    worldwideFans: 537,
  },
  {
    name: "Brazil National Team",
    city: null,
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    worldwideFans: 950,
  },
  {
    name: "Argentina National Team",
    city: null,
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    worldwideFans: 888,
  },
  {
    name: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torez"],
    worldwideFans: 400,
  },
];

teams.forEach(async (team) => {
  try {
    await db.collection("teams").add(team);
    console.log(`Added ${team.name} to Firestore`);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});
