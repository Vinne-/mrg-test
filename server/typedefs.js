const { gql } = require('apollo-server')

const typeDefs = gql`
	type Query {
		games(providers: [String], gameCollectionIds: [String], offset: Int, limit: Int): [Game]
		allGameProviders: [String]
		allGameCollectionIds: [String]
	}

	type Game {
		id: String!
		gameProvider: String
		gameCollectionIds: [String]
		thumbnailUrl: String
		name: String
	}
`

module.exports = typeDefs
