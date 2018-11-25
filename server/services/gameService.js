const R = require('ramda')
const crypto = require('crypto')

const allGamesData = require('../data/all-games.json')
const searchCache = {}
const md5Hash = string =>
	crypto
		.createHash('md5')
		.update(string)
		.digest('hex')

const filteredGames = (providers, gameCollectionIds) => {
	let result = allGamesData

	const queryHash = md5Hash(
		`${providers ? providers.sort().join() : ''}${gameCollectionIds ? gameCollectionIds.sort().join() : ''}`,
	)

	// dynamic build cache for increased speed
	if (searchCache[queryHash]) {
		return searchCache[queryHash]
	}

	if (providers && !R.isEmpty(providers)) {
		result = result.filter(game => providers.includes(game.gameProvider))
	}
	if (gameCollectionIds && !R.isEmpty(gameCollectionIds)) {
		result = result.filter(game => {
			if (!game.gameCollectionIds) return false
			const intersection = R.intersection(gameCollectionIds, game.gameCollectionIds)
			return !R.isEmpty(intersection)
		})
	}
	searchCache[queryHash] = result
	return result
}

const allGameCollectionIds = () => {
	const result = []
	allGamesData.forEach(game => {
		if (game.gameCollectionIds) {
			game.gameCollectionIds.forEach(id => {
				if (!result.includes(id)) {
					result.push(id)
				}
			})
		}
	})
	return result.sort()
}

const allGameProviders = () => {
	const result = []
	allGamesData.forEach(game => {
		if (game.gameProvider && !result.includes(game.gameProvider)) {
			result.push(game.gameProvider)
		}
	})
	return result.sort()
}

module.exports = {
	filteredGames,
	allGameProviders,
	allGameCollectionIds,
}
