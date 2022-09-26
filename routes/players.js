const express = require("express");
const router = express.Router();

const { Game, Player } = require("../db");

const { listAllPlayers, listOnePlayer } = require("../views/gameView");

// //--------------------------------------
// // GET /player
// // Returns a list of all players

router.get("/", async (req, res, next) => {
  const players = await Player.findAll();
  res.send(listAllPlayers(players));
});

// //--------------------------------------
// // Returns a specific player, along with their games played

router.get("/:playerId", async (req, res, next) => {
  let playerId = req.params.playerId;
  const player = await Player.findByPk(playerId);

  const games = await Game.findAll({
    where: { playerId: playerId },
  });
  res.send(listOnePlayer(player, games));
});

// //--------------------------------------
// // PUT /player/:playerId
// // Body:
// // username: string representing a username
// // Updates a players name to be the given name
// // HINT: use Postman to test this out
router.put("/:playerId", async (req, res, next) => {
  const playerId = req.params.playerId;
  const player = await Player.findByPk(playerId);
  // console.log(player);

  const changeUserName = await Player.update(
    { username: req.body.username },
    {
      where: {
        id: playerId,
      },
    }
  );

  res.redirect("/players");
});

module.exports = router;
