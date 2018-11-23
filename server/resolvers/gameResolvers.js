const R = require('ramda');

const allGames = require('../all-games.json');

module.exports = {
	Query: {
		allGames: async (obj, params, context, info) => allGamesResolver,
	}
};

const allGamesResolver = () => allGames;