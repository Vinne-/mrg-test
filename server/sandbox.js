const R = require('ramda');

const allGames = require('./all-games.json');

const uniqueGamesCollectionIds = [];

allGames.forEach((game) => {
	console.log(game.gameCollectionIds);
});
