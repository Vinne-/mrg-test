import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const FilterPanel = ({classes}) => (
	<div className={classes.heroUnit}>
    <div className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Album layout
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Something short and leading about the collection below—its contents, the creator, etc.
        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
        entirely.
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={16} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Main call to action
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Secondary action
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>)

export default FilterPanel