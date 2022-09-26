const { Game, Player } = require("./db");

const express = require("express");
const app = express();

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// importing routes
const gameRouter = require("./routes/games");
const playerRouter = require("./routes/players");

// methodOverride middleware for overriding POST and GET requests in forms
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/games", gameRouter);
app.use("/players", playerRouter);

// //--------------------------------------

app.get("/", async (req, res) => {
  res.redirect("/games");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to PORT: ", PORT);
});
