const { filteredGames, allGameProviders, allGameCollectionIds } = require('../services/gameService')
const RETURN_SIZE = 10

module.exports = {
	Query: {
		games: (obj, { providers, gameCollectionIds, offset, limit }, context, info) => {
			if (offset < 0 || limit < 0 || limit > 1000) throw Error('Invalid input argument.')
			const filtered = filteredGames(providers, gameCollectionIds)
			const sliceStart = offset ? offset : 0
			const sliceEnd = limit ? limit + sliceStart : RETURN_SIZE + sliceStart
			let returnSet = filtered.slice(sliceStart, sliceEnd)
			return returnSet
		},
		allGameProviders: (obj, args, context, info) => allGameProviders(),
		allGameCollectionIds: (obj, args, context, info) => allGameCollectionIds(),
	},
}
