import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import GameTile from './GameTile'

const GameTiles = ({classes, games}) => 
	(<Grid container spacing={40} style={{justifyContent: 'center'}}>
			{games.map(game => <GameTile key={game.id} classes={classes} game={game} />)}
  </Grid>)


export default GameTiles