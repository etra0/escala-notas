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

function ParameterInput(props) {

  const { keyName, values, handler } = props;
  const { name, value } = values;
  
  return (
    <div className='input-box'>
      <TextField
      label={name}
      onChange={(v) => handler(keyName, v.target.value)}
      type="number"
      fullWidth={false}
      value={value}
      InputProps={keyName == 'exigencia' ? {endAdornment: "%"} : {}}
      error={isNaN(value) || value < 0 }
    />
  </div>
  )
}

function App() {

  const [parameters, setParameters] = useState({
    'exigencia': {name: "Exigencia", value: 60},
    'notaMin': {name: "Nota mínima", value: 2.0},
    'notaMax': {name: "Nota máxima", value: 7.0},
    'puntajeMin': {name: "Puntaje mínimo", value: 0},
    'puntajeMax': {name: "Puntaje máximo", value: 100},
    'incremento': {name: "Incremento", value: 1}
  });

  const changeValue = (key, value) => {
    const _p = JSON.parse(JSON.stringify(parameters));
    _p[key].value = value;
    setParameters(_p);
  }
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <div className="App-body">

          <div className="App-content">
          
          
          {Object.keys(parameters).map(v => (<ParameterInput key={v} keyName={v} values={parameters[v]} handler={changeValue}/>))}


        </div>

      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
