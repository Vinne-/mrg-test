const R = require('ramda');

const allGamesData = require('../data/all-games.json');

const filteredGames = (providers, gameCollectionIds) => {
	let result = allGamesData;

	if (providers) {
		result = result.filter(game => providers.includes(game.gameProvider))
	}
	if (gameCollectionIds) {
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
	return result;
}

module.exports = {
	filteredGames,
}