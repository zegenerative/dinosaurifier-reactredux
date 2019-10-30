import React, { Component } from 'react';
import Results from './Components/Results'
import DinoNameContainer from './Components/DinoNameContainer';
import DinoDescriptionContainer from './Components/DinoDescriptionContainer';
import store from './store'
import { Provider } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Grid
          container
          direction='column'
          alignItems="center"
          justify='center'
          m={3}
        >
          <h1>THE DINOSAURIFIER</h1>
          <Box m={3}><Results /></Box> 
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignContent='center'
            flexWrap='wrap'
            m={5}
          >
            <Box 
              border={3}
              borderColor='primary.main'
              borderRadius={10}
              m={3}
              p={3}>
                <DinoNameContainer />
            </Box>  
            <Box 
              border={3}
              borderColor='primary.main'
              borderRadius={10}
              m={3}
              p={3}>
                <DinoDescriptionContainer />
            </Box>
          </Box>
        </Grid>
      </Provider>
    )
  }
}