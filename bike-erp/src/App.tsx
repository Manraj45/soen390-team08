import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import { Grid } from '@material-ui/core';
import Content from './components/content';


function App() {
  return (
    <Grid container direction="column">
        <Grid item container>
          <Grid item xs={1} sm={2}>
            This is where the menu will be
          </Grid>
          <Grid item xs={11} sm={10}>
            <Content />
          </Grid>
        </Grid>
    </Grid>
  );
}

export default App;
