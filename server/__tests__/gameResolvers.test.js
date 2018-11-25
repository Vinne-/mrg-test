const { ApolloServer, gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('../typedefs')
const resolvers = require('../resolvers')
const allGamesData = require('../data/all-games.json')
const R = require('ramda')

describe('Graphql endpoints tests', () => {
  it('tests offset', async () => {
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

  it('tests limit is correct', async () => {
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

  it('tests gameProvider filter', async () => {
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

  it('tests gameCollectionIds filter', async () => {
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

  it('tests that allGameProviders returns correctly', async () => {
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

  it('tests that allGameCollectionIds returns correctly', async () => {
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

  it('tests that allGameCollectionIds returns correctly', async () => {
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

  it('tests negative offset input returns error', async () => {
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

  it('tests negative limit input returns error', async () => {
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
