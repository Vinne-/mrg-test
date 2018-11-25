const gameResolvers = require('./resolvers/gameResolvers')

const resolvers = {
	Query: {
		games: gameResolvers.Query.games,
		allGameProviders: gameResolvers.Query.allGameProviders,
		allGameCollectionIds: gameResolvers.Query.allGameCollectionIds,
	},
}

module.exports = resolvers
