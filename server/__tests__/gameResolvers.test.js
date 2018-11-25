const { ApolloServer, gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')
const allGamesData = require('../data/all-games.json')
const R = require('ramda')

describe('GraphQL endpoints', () => {
  it('big query with all fields selected', async () => {
    const QUERY = gql`
      query Games($limit: Int) {
        games(limit: $limit) {
          id
          status
          gameProvider
          startType
          isFreeplayAllowed
          showIsLeavingJurisdiction
          allowedOrientation
          tags
          gameCollectionIds
          gameId
          name
          width
          height
          description
          themeUrl
          thumbnailUrl
          helpUrl
          trivia
          seoName
          friendlyName
        }
      }
    `

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { limit: 900 } })
    expect(res.data.games.length).toEqual(900)
  })

  it('offset query', async () => {
    const QUERY = gql`
      query Games($offset: Int) {
        games(offset: $offset) {
          id
        }
      }
    `

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { offset: 5 } })
    expect(res.data.games[0].id).toEqual(allGamesData[5].id)
  })

  it('limit query', async () => {
    const QUERY = gql`
      query Games($limit: Int) {
        games(limit: $limit) {
          id
        }
      }
    `

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { limit: 100 } })
    expect(res.data.games.length).toEqual(100)
  })

  it('gameProvider filtered query', async () => {
    const QUERY = gql`
      query Games($providers: [String], $limit: Int) {
        games(providers: $providers, limit: $limit) {
          id
          gameProvider
        }
      }
    `

    const gameProviders = ['BALLY', 'COZY', 'KAMBI']

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { providers: gameProviders, limit: 200 } })
    res.data.games.forEach(game => {
      expect(gameProviders.includes(game.gameProvider)).toBeTruthy()
    })
  })

  it('gameCollectionIds filter query', async () => {
    const QUERY = gql`
      query Games($gameCollectionIds: [String], $limit: Int) {
        games(gameCollectionIds: $gameCollectionIds, limit: $limit) {
          id
          gameProvider
          gameCollectionIds
        }
      }
    `

    const gameCollectionIds = ['mrgreen', 'jackpot', 'roulette-live']

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { gameCollectionIds: gameCollectionIds, limit: 200 } })
    res.data.games.forEach(game => {
      expect(R.intersection(gameCollectionIds, game.gameCollectionIds).length).toBeTruthy()
    })
  })

  it('allGameProviders query', async () => {
    const QUERY = gql`
      {
        allGameProviders
      }
    `

    // Creating correct expected result
    let expectedResult = []
    allGamesData.forEach(game => {
      if (!expectedResult.includes(game.gameProvider)) {
        expectedResult.push(game.gameProvider)
      }
    })
    expectedResult = expectedResult.sort()

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY })
    for (var i = res.data.allGameProviders.length - 1; i >= 0; i--) {
      expect(res.data.allGameProviders[i]).toEqual(expectedResult[i])
    }
  })

  it('allGameCollectionIds query', async () => {
    const QUERY = gql`
      {
        allGameCollectionIds
      }
    `

    // Creating correct expected result
    let expectedResult = []
    allGamesData.forEach(game => {
      if (!game.gameCollectionIds) return
      game.gameCollectionIds.forEach(id => {
        if (!expectedResult.includes(id)) {
          expectedResult.push(id)
        }
      })
    })
    expectedResult = expectedResult.sort()

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY })
    for (var i = res.data.allGameCollectionIds.length - 1; i >= 0; i--) {
      expect(res.data.allGameCollectionIds[i]).toEqual(expectedResult[i])
    }
  })


  it('negative offset query returns error', async () => {
    const QUERY = gql`
      query Games($offset: Int) {
        games(offset: $offset) {
          id
        }
      }
    `

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { offset: -5 } })
    expect(res.errors).toBeDefined()
  })

  it('negative limit query input returns error', async () => {
    const QUERY = gql`
      query Games($limit: Int) {
        games(limit: $limit) {
          id
        }
      }
    `

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })

    const { query } = createTestClient(server)

    const res = await query({ query: QUERY, variables: { limit: -5 } })
    expect(res.errors).toBeDefined()
  })
})
