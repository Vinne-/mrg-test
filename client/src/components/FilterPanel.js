import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import MultipleSelect from './MultipleSelect'

const QUERY = gql`
  {
    allGameProviders
    allGameCollectionIds
  }
`

class FilterPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameProviders: [],
      gameCollectionIds: [],
    }
    this.handleGameProviderChange = this.handleGameProviderChange.bind(this)
    this.handleGameCollectionIdsChange = this.handleGameCollectionIdsChange.bind(this)
  }

  handleGameProviderChange(selected) {
    this.setState({
      gameProviders: selected,
    })
    this.props.onFilterChange({
      gameProviders: selected,
      gameCollectionIds: this.state.gameCollectionIds,
    })
  }

  handleGameCollectionIdsChange(selected) {
    this.setState({
      gameCollectionIds: selected,
    })
    this.props.onFilterChange({
      gameProviders: this.state.gameProviders,
      gameCollectionIds: selected,
    })
  }

  render() {
    return (
      <div className={this.props.classes.heroUnit}>
        <div className={this.props.classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Spel filter
          </Typography>
          <Query query={QUERY}>
            {({ loading, error, data: { allGameProviders, allGameCollectionIds } }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`
              return (
                <div >
                  <MultipleSelect
                    style={{justifyContent: 'center'}}
                    title={'Spel tillverkare'}
                    onSelectChange={this.handleGameProviderChange}
                    choices={allGameProviders}
                    clearText={'Ränsa filter'}
                  />
                  <MultipleSelect
                    title={'Spel kollektion'}
                    onSelectChange={this.handleGameCollectionIdsChange}
                    choices={allGameCollectionIds}
                    clearText={'Ränsa filter'}
                  />
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default FilterPanel
