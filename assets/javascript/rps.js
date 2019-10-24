//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAIjhcMf_VZ_DAnH2DGqYZAi_Xx2rJj6J0",
    authDomain: "rock-paper-scissors-88687.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-88687.firebaseio.com",
    projectId: "rock-paper-scissors-88687",
    storageBucket: "rock-paper-scissors-88687.appspot.com",
    messagingSenderId: "321975771041",
    appId: "1:321975771041:web:be848e72f3e6fed9ab75e0",
    measurementId: "G-Q7X5DS6F0D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

firebase.database().ref("/").set({
    username: "Steve",
    email: "stevevillardi@gmail.com"
});

//RPS Logic once we are ready to check who won
function didYouWin(yourRPS, opponentRPS) {
  // Run traditional rock, paper, scissors logic and return whether you won, lost, or had a draw.
  switch (yourRPS) {
    case "rock":
      switch (opponentRPS) {
        case "rock":
          return "draw";
        case "paper":
          return "lose";
        case "scissors":
          return "win";
      }
      break;
    case "paper":
      switch (opponentRPS) {
        case "rock":
          return "win";
        case "paper":
          return "draw";
        case "scissors":
          return "lose";
      }
      break;
    case "scissors":
      switch (opponentRPS) {
        case "rock":
          return "lose";
        case "paper":
          return "win";
        case "scissors":
          return "draw";
      }
      break;
  }
}