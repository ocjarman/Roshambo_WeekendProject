const express = require("express");
const router = express.Router();

const { Game, Player } = require("../db");

const {
  gameResult,
  homepage,
  playGame,
  computerChoice,
  determineWinner,
} = require("../views/gameView");

router.get("/", async (req, res, next) => {
  res.send(homepage());
});

//--------------------------------------
// GET /game/:gameId
// Returns the winner for the game matching the given ID as well as the player for the game

router.get("/:gameId", async (req, res, next) => {
  const games = await Game.findAll({
    where: { id: req.params.gameId },
    include: [Player],
  });

  const gameToCheck = games[0];
  res.send(gameResult(gameToCheck));
});

// //--------------------------------------
// //EXTRA CREDIT: POST /game
// // Body:
// // symbol: A players chosen move - either "rock", "paper", or "scissors"
// // playerId: the ID of the player playing the game
// // Does the following:
// // Pick a random symbol using javascript for the computer
// // Compare randomly selected move to the users move
// // Scissors beats paper
// // Paper beats Rock
// // Rock beats Scissors
// // Create a game with the resulting winner
// // Send the result to the client

router.post("/", async (req, res, next) => {
  //identify user playing
  const playerUsername = req.body.username;
  const player = await Player.findOne({ where: { username: playerUsername } });

  //if the player doesnt exist yet, create a new one
  if (!player) {
    player = await Player.create({
      username: playerUsername,
    });
  }

  const playerChoice = req.body.choice;
  const compChoice = await computerChoice();

  //--------------if statements here-------------
  const result = await determineWinner(playerChoice, compChoice);

  const newGame = await Game.create({
    result: result,
    playerId: player.id,
  });

  res.send(playGame(player, playerChoice, compChoice, newGame));
});
//--------------------PORT----------------------------

module.exports = router;
