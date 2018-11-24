import React from 'react'
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import GameTile from './GameTile'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HELLO_WORLD = gql`
	query GamesFeed($providers: [GameProviders], $gameCollectionIds: [GameCollectionIds], $cursor: String) {
		games(providers: $providers, gameCollectionIds: $gameCollectionIds, cursor: $cursor) {
			cursor
			data
		}
	}
`;

const GameTileGrid = ({classes}) => (
	<div className={classNames(classes.layout, classes.cardGrid)}>
	  {/* End hero unit */}
	  {console.log(classes)}
  	<Query 
  		query={HELLO_WORLD}
  		variables={{providers: [], gameCollectionIds: []}}
  		>
  		{({ loading, error, data }) => {
		    if (loading) return "Loading...";
		    if (error) return `Error! ${error.message}`;
	    	console.log(data.helloWorld)
		    return (
					<Grid container spacing={40}>
				    {data.games.data.map(game => <GameTile key={game.id} classes={classes} game={game} />)}
				  </Grid>);
			}}
  	</Query>
	</div>)

export default GameTileGrid