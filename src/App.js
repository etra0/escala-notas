import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fade from '@material-ui/core/Fade';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function ScoreTable(props) {
  const { rows, valid } = props;
  
  return (
    <Fade in={valid}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Puntos</TableCell>
          <TableCell>Nota</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(([p, n]) => (<TableRow key={p}>
          <TableCell>{p}</TableCell>
          <TableCell style={{color: n.toFixed(1) < 4 ? '#f34a4a' : 'white'}}>{n.toFixed(1)}</TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
    </Fade>
  )
}

function ParameterInput(props) {
  const { keyName, values, handler } = props;
  const { name, value } = values;

  return (
    <div className="input-box">
      <TextField
        label={name}
        onChange={v => handler(keyName, v.target.value)}
        type="number"
        fullWidth={true}
        value={value}
        InputProps={keyName == "exigencia" ? { endAdornment: "%" } : {}}
        error={isNaN(value) || value < 0}
      />
    </div>
  );
}

function App() {
  const [parameters, setParameters] = useState({
    exigencia: { name: "Exigencia", value: 60 },
    notaAprobacion: { name: "Nota aprobación", value: 4.0 },
    notaMin: { name: "Nota mínima", value: 2.0 },
    notaMax: { name: "Nota máxima", value: 7.0 },
    puntajeMin: { name: "Puntaje mínimo", value: 0 },
    puntajeMax: { name: "Puntaje máximo", value: 100 },
    incremento: { name: "Incremento", value: 1 }
  });

  const [tableData, setTableData] = useState([]);
  const [validTable, setValidTable] = useState(false);

  const changeValue = (key, value) => {
    const _p = JSON.parse(JSON.stringify(parameters));
    _p[key].value = value;
    setParameters(_p);
  };

  useEffect(() => {
    const isValid = Object.keys(parameters).reduce((acc, v) => acc + (typeof(parameters[v].value) === 'undefined' || isNaN(parseFloat(parameters[v].value))), 0) == 0
    setValidTable(isValid)
    const _p = JSON.parse(JSON.stringify(parameters));
    Object.keys(_p).forEach(v => _p[v].values = parseFloat(_p[v].values))


    console.log(isValid)
    if (_p.incremento.value == 0 || !isValid) return;
    let calc = p => {
      let exigencia = _p.exigencia.value / 100.;
      let puntajeAprobacion = _p.puntajeMax.value * exigencia;
      let m1 = (_p.notaAprobacion.value - _p.notaMin.value)/(puntajeAprobacion - _p.puntajeMin.value);
      let a1 = _p.notaMin.value - m1*_p.puntajeMin.value;

      let m2 = (_p.notaMax.value - _p.notaAprobacion.value)/(_p.puntajeMax.value - puntajeAprobacion)
      let a2 = _p.notaMax.value - m2*_p.puntajeMax.value;
      console.log(exigencia, puntajeAprobacion, m1, a1, m2, a2, typeof(_p.incremento.value))

      return p >= puntajeAprobacion ? m2*p + a2 : m1*p + a1;
    }

    let arr = [];
    for (let i = _p.puntajeMin.value; i <= _p.puntajeMax.value; i+= +_p.incremento.value) {
      arr.push([i, calc(i)]);
    }

    setTableData(arr);
  }, [parameters])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App-body">
          <div className="App-content">
            {Object.keys(parameters).map(v => (
              <ParameterInput
                key={v}
                keyName={v}
                values={parameters[v]}
                handler={changeValue}
              />
            ))}

            {tableData && <ScoreTable rows={tableData} valid={validTable}/>}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
