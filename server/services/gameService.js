const R = require('ramda');
const crypto = require('crypto');

const allGamesData = require('../data/all-games.json');

const searchCache = {};

const filteredGames = (providers, gameCollectionIds) => {
	let result = allGamesData;

	const queryHash = md5Hash(`${providers ? providers.sort().join() : ''}${gameCollectionIds ? gameCollectionIds.sort().join() : ''}`);
	
	if (searchCache[queryHash]) {
		return searchCache[queryHash];
	}

	if (providers && !R.isEmpty(providers)) {
		result = result.filter(game => providers.includes(game.gameProvider));
	}
	if (gameCollectionIds && !R.isEmpty(gameCollectionIds)) {
		result = result.filter(game => {
			if (!game.gameCollectionIds) return false;
			const normalized = game.gameCollectionIds.map(id => {
				let newName = id.replace(/-/g, '_');
				newName = newName.toUpperCase();
				return newName;
			});
			const intersection = R.intersection(gameCollectionIds, normalized);
			return !R.isEmpty(intersection);
		});
	}
	searchCache[queryHash] = result;
	return result;
}

const md5Hash = (string) => crypto.createHash('md5').update(string).digest('hex');


module.exports = {
	filteredGames,
}