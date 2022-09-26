//initial setup to get sequelize running

const Sequelize = require("sequelize");

const DB_URL = process.env.DB_URL || "postgres://localhost/roshambo";
const db = new Sequelize(DB_URL);

//-------TABLE FOR GAMES---------
const Game = db.define("game", {
  result: {
    type: Sequelize.ENUM(["computer", "human", "tie"]),
  },
});

//-------TABLE FOR PLAYER---------

const Player = db.define("player", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

Player.hasMany(Game);
Game.belongsTo(Player);

module.exports = {
  db,
  Game,
  Player,
};
