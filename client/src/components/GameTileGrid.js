import React, { Component } from 'react'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import GameTile from './GameTile'
import GameTiles from './GameTiles'

const GET_GAMES = gql`
	query GamesFeed($providers: [String], $gameCollectionIds: [String], $offset: Int, $limit: Int) {
		games(providers: $providers, gameCollectionIds: $gameCollectionIds, offset: $offset, limit: $limit) {
			id
			gameProvider
			gameCollectionIds
			thumbnailUrl
			name
		}
	}
`

const GameTileGrid = ({ classes, gameProviders, gameCollectionIds }) => (
	<div className={classNames(classes.layout, classes.cardGrid)}>
		<Query
			query={GET_GAMES}
			variables={{ providers: gameProviders, gameCollectionIds: gameCollectionIds, offset: 0, limit: 12 }}
			fetchPolicy="cache-and-network"
		>
			{({ loading, error, data, fetchMore }) => {
				if (loading && !(data && data.games)) return 'Loading...'
				if (error) return `Error! ${error.message}`
				if (data && data.games) {
					return (
						<div>
							<GameTiles classes={classes} games={data.games} />
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: 70 }}>
								<Button
									style={{ width: 350, height: 40 }}
									variant="contained"
									color="primary"
									onClick={() => {
										const result = fetchMore({
											variables: { offset: data.games.length },
											updateQuery: (previousResult, { fetchMoreResult }) => {
												if (!fetchMoreResult) return previousResult
												return Object.assign({}, previousResult, {
													games: [...previousResult.games, ...fetchMoreResult.games],
												})
											},
										})
									}}
								>
									Ladda fler spel
								</Button>
							</div>
						</div>
					)
				}
			}}
		</Query>
	</div>
)

export default GameTileGrid
