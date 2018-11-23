const R = require('ramda');

const allGamesData = require('../data/all-games.json');
const {filteredGames} = require('../services/gameService');

module.exports = {
	Query: {
		allGames: async (obj, args, context, info) => allGames(),
		games: async (obj, {providers, gameCollectionIds}, context, info) => filteredGames(providers, gameCollectionIds),
	}
};

const allGames = () => {
	return allGamesData;
};