import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import GamesIcon from '@material-ui/icons/Games'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import GameTileGrid from './GameTileGrid'
import FilterPanel from './FilterPanel'

//the style and theme of the page is taken from https://material-ui.com/getting-started/page-layout-examples/
const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
})

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameProviders: [],
      gameCollectionIds: [],
    }
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange(filter) {
    this.setState(filter)
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <GamesIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Game Lobby
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <FilterPanel onFilterChange={this.onFilterChange} classes={classes} />
          <GameTileGrid
            gameProviders={this.state.gameProviders}
            gameCollectionIds={this.state.gameCollectionIds}
            classes={classes}
          />
        </main>
      </React.Fragment>
    )
  }
}

Lobby.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Lobby)
