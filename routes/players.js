const express = require("express");
const router = express.Router();

const { Game, Player } = require("../db");

const { listAllPlayers, listOnePlayer } = require("../views/gameView");

//------------------GET /players--------------------

router.get("/", async (req, res, next) => {
  const players = await Player.findAll();
  res.send(listAllPlayers(players));
});

// //----------------GET /players/:id----------------------
router.get("/:playerId", async (req, res, next) => {
  let playerId = req.params.playerId;
  const player = await Player.findByPk(playerId);

  const games = await Game.findAll({
    where: { playerId: playerId },
  });
  res.send(listOnePlayer(player, games));
});

//----------------PUT /player/:playerId----------------------
//*****--Updates a players name to be the given name--***********

router.put("/:playerId", async (req, res, next) => {
  const playerId = req.params.playerId;
  const player = await Player.findByPk(playerId);

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
