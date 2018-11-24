const gameResolvers = require('./resolvers/gameResolvers');

const resolvers = {
  Query: {
    helloWorld: () => 'HelloWorld!',
    allGames: gameResolvers.Query.allGames,
    games: gameResolvers.Query.games,
  },
};


module.exports = resolvers;