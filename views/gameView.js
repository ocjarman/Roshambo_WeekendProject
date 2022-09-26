const html = require("html-template-tag");

// '/games/:id'
function gameResult(game) {
  return html`
    <head>
      <link rel="stylesheet" href="/public/styles.css" />
    </head>
    <body>
      <div>
        <h2>Game id: ${game.id}</h2>
        <h3>Player id: ${game.player.username}</h3>
        <p>Result: ${game.result}</p>
      </div>
    </body>
  `;
}

// '/games'
function homepage() {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="/public/styles.css">
        <title>ROSHAMBO</title>
      </head>
      <body>
        <h1>Roshambo</h1>
        <div>
          <form method="post" action="/games">
            <label for="username">username</label><br />
            <input type="text" name="username" /><br />
            <label for="choice">Choose a weapon</label><br />
            <select id="select" name="choice">
              <option>Rock</option>
              <option>Paper</option>
              <option>Scissors</option>
            </select>
            <button type="submit">throw</button>
          </form>
          <button><a href='/players'>Click to see all players</a</button>
        </div>
      </body>
    </html>
  `;
}

// /players

function listAllPlayers(players) {
  return html`
    <head>
      <link rel="stylesheet" href="/public/styles.css" />
    </head>
    <body>
      <h1>Roshambo Players</h1>
      <div>
        <p>
          ${players
            .map(
              (player) => `
                    <p><b>Player ${player.id}</b>: ${player.username}                    <a href='/players/${player.id}'>results</a>
                    </p>
            `
            )
            .sort()}
        </p>
        <br />
      </div>
      <a href="/games">Play Roshambo</a>
    </body>
  `;
}

// /players/:playerId
function listOnePlayer(player, games) {
  return html`
    <head>
      <link rel="stylesheet" href="/public/styles.css" />
    </head>
    <body>
      <div>
        <h2>Player id: ${player.id}</h2>
        <h2>Player username: ${player.username}</h2>
        ${games.map(
          (game) => `
                    <div>
                        <b>Game ID: ${game.dataValues.id}</b><br>
                        <b>Game RESULT:</b> ${game.dataValues.result}</p>
                        <p>-------------------</p>
                    </div>
                `
        )}
      </div>

      <!--Using the method-override middleware to turn POST request into DELETE request-->
      <form method="POST" action="/players/${player.id}?_method=PUT">
        <label for="newusername">change your username</label><br />
        <input type="text" placeholder="new username" name="username" />
        <button type="submit">submit</button>
      </form>
    </body>
  `;
}

// POST /games
function playGame(player, playerChoice, computerChoice, game) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <head>
          <link rel="stylesheet" href="/public/styles.css" />
        </head>
        <title>ROSHAMBO</title>
      </head>
      <body>
        <h1>Roshambo</h1>
        <div>
          <hr />
          <p>${player.username} threw: ${playerChoice}</p>
          <p>Computer threw: ${computerChoice}</p>
          <p>Result: The winner of game ${game.id} is ${game.result}</p>
        </div>
        <a href="/games">Play again</a>
        <p>
          See all of ${player.username}'s game results
          <a href="/players/${player.id}">here</a>
        </p>
      </body>
    </html>
  `;
}

//fxn to get random computer choice
function computerChoice() {
  let rpcArray = ["rock", "paper", "scissors"];
  let randomNum = Math.floor(Math.random() * 3);
  return rpcArray[randomNum];
}

//fxn to determine winner
function determineWinner(playerChoice, compChoice) {
  let lcplayerChoice = playerChoice.toLowerCase();
  let resultOfGame = "";
  if (lcplayerChoice === "rock" && compChoice === "scissors") {
    resultOfGame = "human";
  } else if (lcplayerChoice === "scissors" && compChoice === "paper") {
    resultOfGame = "human";
  } else if (lcplayerChoice === "paper" && compChoice === "rock") {
    resultOfGame = "human";
  } else if (lcplayerChoice === compChoice) {
    resultOfGame = "tie";
  } else {
    resultOfGame = "computer";
  }
  return resultOfGame;
}

module.exports = {
  gameResult,
  homepage,
  listAllPlayers,
  listOnePlayer,
  playGame,
  computerChoice,
  determineWinner,
};
