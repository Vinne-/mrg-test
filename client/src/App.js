import React from 'react'
import { hot } from 'react-hot-loader'
import Lobby from './components/Lobby'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache,
})

const App = () => (
	<ApolloProvider client={client}>
		<Lobby />
	</ApolloProvider>
)

export default hot(module)(App)
