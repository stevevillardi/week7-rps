//Initialize JQuery Variables
const playerOneName = $("#player-one-name");
const playerOneWins = $("#player-one-wins");
const playerOneLoses = $("#player-one-loses");
const playerOneChoices = $(".player-one-choices");
const playerTwoName = $("#player-two-name");
const playerTwoWins = $("#player-two-wins");
const playerTwoLoses = $("#player-two-loses");
const playerTwoChoices = $(".player-two-choices");
const tieGames = $(".tie-games");
const actionName = $("#action-name");
const actionBody = $("#action-body");
const submitButton = $("#submit-player");
const submitPlayer = $("#submit-name");
const chatWindow = $("#chat-border");
const chatTextBox = $("#chat-textbox")
const chatButton = $("#chat-button");
const turnStatus = $("#turn-status");
const playerOneChoice = $("#player-one-choice");
const playerTwoChoice = $("#player-two-choice");
const gameResult = $("#game-result");

//local varaibles
let playerName;
let playerNum;
let playerTurn;
let playerKey;
let nextGame = 5000;
let wins1 =0;
let loses1 =0;
let wins2 =0;
let loses2 =0;
let ties =0;

//Firebase configuration
let firebaseConfig = {
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
let database = firebase.database();

// All of our connections will be stored in this directory.
let ref = database.ref();
let connectionsRef = database.ref("/connections");
let connectedRef = database.ref(".info/connected");
let playersRef = database.ref("/players");
let playerOneRef = database.ref("/players/player-one");
let playerTwoRef = database.ref("/players/player-two");
let chatRef = database.ref("/chat");

//Clear chat entries on exit to keep old chats from showing up
chatRef.onDisconnect().remove();
playerOneChoices.hide();
playerTwoChoices.hide();

//Funcitons
function updateChatWindow(chatMessage){
  let p;
  if(chatMessage.player === 1){
    p = $("<p>").addClass("chat-text").html(`<span class="badge badge-primary">Player-${chatMessage.player} (${chatMessage.name}):</span>   ${chatMessage.message}`)
  }
  else if (chatMessage.player === 2) {
    p = $("<p>").addClass("chat-text").html(`<span class="badge badge-success">Player-${chatMessage.player} (${chatMessage.name}):</span>   ${chatMessage.message}`)
  }
  else{
    p = $("<p>").addClass("chat-text").html(`<span class="badge badge-secondary">Admin:</span>   ${chatMessage.message}`)
  }
  chatWindow.append(p);
}

function checkForWinner() {
  let choice1;
  let choice2;
  let name1;
  let name2;


  playerOneRef.once("value", function (snap) {
    choice1 = snap.val().choice;
    name1 = snap.val().name;
  });

  playerTwoRef.once("value", function (snap) {
    choice2 = snap.val().choice;
    name2 = snap.val().name;
  });

  //Update status so both sides can see each other choices
  turnStatus.text(`The results are in!`)
  playerOneChoice.text(`Player 1 chose: ${choice1}`);
  playerTwoChoice.text(`Player 2 chose: ${choice2}`);

  $("#game-restart").text("A new round will start in 5 seconds");


  let time = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });

  console.log(choice1, choice2)
  switch (choice1) {
    case "rock":
      switch (choice2) {
        case "rock":
          ties++
          tieGames.text(ties);
          gameResult.text("You both picked Rock, tie game!");
          
          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Game was a tie!`,
              time: time
            });
          }

          break;
        case "paper":
          wins2++
          playerTwoWins.text(wins2)
          loses1++
          playerOneLoses.text(loses1)
          gameResult.text(`Paper beats Rock, ${name2} wins!`);

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Paper beats Rock, ${name2} wins!`,
              time: time
            });            
          }

          break;
        case "scissors":
          wins1++
          playerOneWins.text(wins1)
          loses2++
          playerTwoLoses.text(loses2)
          gameResult.text(`Rock beats Scissors, ${name1} wins!`);

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Rock beats Scissors, ${name1} wins!`,
              time: time
            });
          }

          break;
      }
      break;
    case "paper":
      switch (choice2) {
        case "rock":
          wins1++
          playerOneWins.text(wins1)
          loses2++
          playerTwoLoses.text(loses2)
          gameResult.text(`Paper beats Rock, ${name1} wins!`);

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Paper beats Rock, ${name1} wins!`,
              time: time
            });
          }

          break;
        case "paper":
          ties++
          tieGames.text(ties);
          gameResult.text("You both picked Paper, tie game!");

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Game was a tie!`,
              time: time
            });
          }

          break;
        case "scissors":
          wins2++
          playerTwoWins.text(wins2)
          loses1++
          playerOneLoses.text(loses1)
          gameResult.text(`Scissors beats Paper, ${name2} wins!`);

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Scissors beats Paper, ${name2} wins!`,
              time: time
            });
          }

          break;
      }
      break;
    case "scissors":
      switch (choice2) {
        case "rock":
          wins2++
          playerTwoWins.text(wins2)
          loses1++
          playerOneLoses.text(loses1)
          gameResult.text(`Rock beats Scissors, ${name2} wins!`);

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Rock beats Scissors, ${name2} wins!`,
              time: time
            });
          }

          break;
        case "paper":
          wins1++
          playerOneWins.text(wins1)
          loses2++
          playerTwoLoses.text(loses2)
          gameResult.text(`Scissors beats Paper, ${name1} wins!`);
          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Scissors beats Paper, ${name1} wins!`,
              time: time
            });
          }

          break;
        case "scissors":
          ties++
          tieGames.text(ties);
          gameResult.text("You both picked Scissors, tie game!");

          if(playerNum === 1){
            chatRef.push({
              name: playerName,
              player: 3,
              message: `Game was a tie!`,
              time: time
            });
          }

          break;
      }
      break;
  }

  setTimeout(function() {
    playerOneChoice.text("");
    playerTwoChoice.text("");
    gameResult.text("");
    $("#game-restart").text("");

    playerOneRef.update({
      choice: null
    });
    playerTwoRef.update({
      choice: null
    });
  }, nextGame);

}

function displayTurnStatus(turn){
	if(playerNum === 1) {
		if(turn === "choosing") {
      turnStatus.text("It's your turn, choose your selection!");
      playerOneChoices.show();
    } 
    else if(turn === "waiting") {
      turnStatus.text("Waiting for your opoenent to choose a selection...");
      playerTwoChoices.hide();
		}
  } 
  else if(playerNum === 2) {
		if(turn === "choosing") {
      turnStatus.text("It's your turn, choose your selection!");
      playerTwoChoices.show();
    } 
    else if(turn === "waiting") {
      turnStatus.text("Waiting for your opoenent to choose a selection...");
      playerOneChoices.hide();
		}
	}
}

function updatePlayerDisplay(snap,action){
  let time = new Date().toLocaleString("en-US", {hour: "numeric", minute: "numeric", second: "numeric"});

  if(action === "add"){
    if(snap.player === 1){
      playerOneName.text(`Player 1: ${snap.name}`);
    }
    else{
      playerTwoName.text(`Player 2: ${snap.name}`);
    }
  }
  else{
    if(snap.player === 1){
      chatRef.push({
        name: snap.name,
        player: 3,
        message: `${snap.name} has left the game!`,
        time: time
      });

      playerOneName.text(`Waiting for player...`);
    }
    else{
      chatRef.push({
        name: snap.name,
        player: 3,
        message: `${snap.name} has left the game!`,
        time: time
      });

      playerTwoName.text(`Waiting for player...`);
    }
  }

}

//Track connections to DB
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    let con = connectionsRef.push(true);
    playerKey = con.getKey();
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

playerOneChoices.on("click", function (){
  let choice = $(this).attr("data-choice");
  playerOneChoice.text(`Player 1 chose: ${choice}`);
  playerOneRef.update({
    choice: choice
  });
  playerOneChoices.hide();
});

playerTwoChoices.on("click", function (){
  let choice = $(this).attr("data-choice");
  playerTwoChoice.text(`Player 2 chose: ${choice}`);
  playerTwoRef.update({
    choice: choice
  });
  playerTwoChoices.hide();
});



submitButton.on("click", function (e) {
  e.preventDefault();
  playerName = submitPlayer.val();
  submitPlayer.val("");

  //When we submit a player we check whos already in game and set thier player number accordingly
  playersRef.once("value", function (snap) {
    if (snap.exists() === false) {
      playerNum = 1;
      playerOneRef.update({
        name: playerName,
        player: playerNum,
        wins: 0,
        losses: 0,
        key: playerKey
      });
      connectionsRef.child(playerKey).set(playerName);
      playerOneRef.onDisconnect().remove();
    }
    else if (snap.child("player-two").exists() === true && snap.child("player-one").exists() === false) {
      playerNum = 1;
      playerOneRef.update({
        name: playerName,
        player: playerNum,
        wins: 0,
        losses: 0,
        key: playerKey
      });

      connectionsRef.child(playerKey).set(playerName);
      playerOneRef.onDisconnect().remove();
    }
    else {
      playerNum = 2;
      playerTwoRef.update({
        name: playerName,
        player: playerNum,
        wins: 0,
        losses: 0,
        key: playerKey
      });

      connectionsRef.child(playerKey).set(playerName);
      playerTwoRef.onDisconnect().remove();
    }
  }).then(function () {

    let message = `${playerName} has entered the game as Player ${playerNum}!`;
    let time = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });

    chatRef.push({
      name: playerName,
      player: 3,
      message: message,
      time: time
    });
  });
});

//Send button for chat click event listener
chatButton.on("click", function(e) {
	e.preventDefault();

	if(playerName !== undefined) {
		var message = chatTextBox.val();
		var time = new Date().toLocaleString("en-US", {hour: "numeric", minute: "numeric", second: "numeric"});

		chatRef.push({
      name: playerName,
      player: playerNum,
			message: message,
			time: time
		});
	}
  chatTextBox.val("");
});

//Updated chat window when new value added
chatRef.on("child_added", function(snap) {
  //Update Chat Window
  updateChatWindow(snap.val())
});

//Prevent 3rd party from joining game in progress
playersRef.on("value", function(snap){
  if(snap.child("player-one").exists() === true && snap.child("player-two").exists() === true) {
    submitButton.hide();
    submitPlayer.hide();

    //We have both players can can proceed with the game
    if(snap.child("player-two").child("choice").exists() === true && snap.child("player-one").child("choice").exists() === true){
      //We have both choices so we can not see who won
      checkForWinner();
    }
    else if(playerNum === 1){
      if(snap.child("player-two").child("choice").exists() === false && snap.child("player-one").child("choice").exists() === false){
        console.log("running player1 section 1")
        playerOneChoices.hide();
        playerTwoChoices.hide();
        displayTurnStatus("choosing")
      }
      else{
        console.log("running player1 section 2")
        playerOneChoices.hide();
        playerTwoChoices.hide();
        displayTurnStatus("waiting")
      }
    }
    else if (playerNum === 2){
      if(snap.child("player-two").child("choice").exists() === false && snap.child("player-one").child("choice").exists() === false){
        console.log("running player2 section 1")
        playerOneChoices.hide();
        playerTwoChoices.hide();
        displayTurnStatus("waiting")
      }
      else{
        console.log("running player2 section 2")
        playerOneChoices.hide();
        playerTwoChoices.hide();
        displayTurnStatus("choosing")
      }
    }
  }
  else{
    submitButton.show();
    submitPlayer.show();
  }
});

playersRef.on("child_added", function(snap) {
  //Update Chat Window
  updatePlayerDisplay(snap.val(),"add");
});

playersRef.on("child_removed", function(snap) {
  //Update Chat Window
  updatePlayerDisplay(snap.val(),"remove");
});
