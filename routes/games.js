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

//-----------------GET /games/----------------------------

router.get("/", async (req, res, next) => {
  res.send(homepage());
});

//-----------------GET /games/:gameId---------------------
router.get("/:gameId", async (req, res, next) => {
  const games = await Game.findAll({
    where: { id: req.params.gameId },
    include: [Player],
  });

  const gameToCheck = games[0];
  res.send(gameResult(gameToCheck));
});

//-----------------POST /games----------------------------

router.post("/", async (req, res, next) => {
  //identify user playing
  const playerUsername = req.body.username;
  let player = await Player.findOne({ where: { username: playerUsername } });

  //if the player doesnt exist yet, create a new one and set them to player
  if (!player) {
    let newPlayer = await Player.create({
      username: playerUsername,
    });
    player = newPlayer;
  }

  const playerChoice = req.body.choice;
  const compChoice = await computerChoice();
  const result = await determineWinner(playerChoice, compChoice);

  // create new game when RPS is thrown
  const newGame = await Game.create({
    result: result,
    playerId: player.id,
  });

  res.send(playGame(player, playerChoice, compChoice, newGame));
});
//--------------------PORT----------------------------

module.exports = router;
