import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const GameTile = ({ game, classes }) => (
	<Grid item sm={6} md={4} lg={3}>
		<Card className={classes.card}>
			<CardMedia className={classes.cardMedia} image={game.thumbnailUrl} title="Image title" />
			<CardContent style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}} className={classes.cardContent}>
				<Typography gutterBottom variant="h5" component="h2">
					{game.name}
				</Typography>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button
						style={{
							width: 200
						}}
						variant="contained"
						color="primary"
					>
						Spela
					</Button>
				</div>
			</CardContent>
		</Card>
	</Grid>
)

export default GameTile
