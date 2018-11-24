const R = require('ramda');

const allGamesData = require('../data/all-games.json');
const {filteredGames} = require('../services/gameService');
const RETURN_SIZE = 10;

module.exports = {
	Query: {
		allGames: async (obj, args, context, info) => allGames(),
		games: async (obj, {providers, gameCollectionIds, cursor}, context, info) => {
			const filtered = filteredGames(providers, gameCollectionIds);
			let returnSet = R.take(RETURN_SIZE, filtered);
			if (cursor) {
				const cursorIndex = filtered.findIndex(e => e.id === cursor);
				returnSet = filtered.slice(cursorIndex + 1, cursorIndex + RETURN_SIZE);
			}
			return {
				cursor: R.path(['id'], R.last(returnSet)),
				data: returnSet,
			}
			
		},
	}
};

const allGames = () => {
	return allGamesData;
};