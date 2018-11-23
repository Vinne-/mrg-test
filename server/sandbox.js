const R = require('ramda');

const allGames = require('./data/all-games.json');
const gameCollectionIds = require('./data/gameCollectionIds.json');

const uniqueGamesCollectionIds = [];


// allGames.forEach((game) => {
// 	console.log(game.gameCollectionIds);
// });

gameCollectionIds.forEach(id => {
	let newName = id.replace(/-/g, '_');
	newName = newName.toUpperCase();
	console.log(newName);
});