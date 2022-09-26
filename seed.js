const { db, Game, Player } = require("./db");

const seedDb = async () => {
  //connects to your db
  //clears everything out
  await db.sync({ force: true, logging: false });

  const player1 = await Player.create({
    username: "shanejarman",
  });
  const player2 = await Player.create({
    username: "oliviajarman",
  });
  const player3 = await Player.create({
    username: "deanjarman",
  });
  const player4 = await Player.create({
    username: "jessjones",
  });
  const player5 = await Player.create({
    username: "brittpoole",
  });

  const game1 = await Game.create({
    result: "human",
    playerId: player1.id,
  });

  const game2 = await Game.create({
    result: "tie",
    playerId: player4.id,
  });

  const game3 = await Game.create({
    result: "human",
    playerId: player1.id,
  });

  const game4 = await Game.create({
    result: "computer",
    playerId: player5.id,
  });

  const game5 = await Game.create({
    result: "human",
    playerId: player3.id,
  });

  console.log((await Game.findAll()).map((game) => game.result));
  console.log((await Player.findAll()).map((player) => player.username));
  // console.log((await Comment.findAll({})).map((post) => post.title));
};

seedDb();

//   const players = [
//     { username: oliviajarman },
//     { username: shanejarman },
//     { username: deanjarman },
//     { username: brittpoole },
//     { username: savpoole },
//     { username: jessjones },
//   ];

//   //making an array of promises
//   const Promises = players.map((user) => Player.create(player)); //creating an array of diff promises

//   // wait for all promises passed into promise.all to finish before continuing
//   Promise.all(Promises);
