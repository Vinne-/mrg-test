import React from 'react'
import { hot } from 'react-hot-loader'
import Counter from './Counter'
import Lobby from './components/Lobby'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const App = () => (
  <ApolloProvider client={client}>
  	<Lobby />
  </ApolloProvider>
)

export default hot(module)(App)