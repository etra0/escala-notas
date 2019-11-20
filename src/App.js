import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import logo from './logo.svg';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

function Table() {

}

function App() {

  const [requirement, setRequirement] = useState(0)
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <div className="App-body">

          <div className="App-content">
          
          <div className='input-box'>
            <TextField
              label='Exigencia'
              onChange={(v) => setRequirement(v.target.value)}
              type="number"
              fullWidth={false}
              value={requirement}
              InputProps={{endAdornment: "%"}}
            />
          </div>


        </div>

      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
