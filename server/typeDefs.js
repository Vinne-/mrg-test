const { gql } = require('apollo-server')

const typeDefs = gql`
	type Query {
		games(providers: [String], gameCollectionIds: [String], offset: Int, limit: Int): [Game]
		allGameProviders: [String]
		allGameCollectionIds: [String]
	}

	type Game {
		id: String!
		status: String
		gameProvider: String
		startType: String
		isFreeplayAllowed: Boolean
		showIsLeavingJurisdiction: Boolean
		allowedOrientation: String
		tags: [String]
		gameCollectionIds: [String]
		gameId: String
		name: String
		width: Int
		height: Int
		description: String
		themeUrl: String
		thumbnailUrl: String
		helpUrl: String
		trivia: [String]
		seoName: String
		friendlyName: String
	}


`

module.exports = typeDefs
