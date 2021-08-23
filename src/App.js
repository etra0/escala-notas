import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Fade from "@material-ui/core/Fade";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

// function ScoreTable(props) {
//   const { rows, valid, notaAprobacion } = props;

//   return (
//     <Fade in={valid}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Puntos</TableCell>
//             <TableCell>Nota</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(([p, n]) => (
//             <TableRow key={p}>
//               <TableCell>{p}</TableCell>
//               <TableCell
//                 style={{ color: n.toFixed(1) < parseFloat(notaAprobacion) ? "#f34a4a" : "white" }}
//               >
//                 {n.toFixed(1)}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Fade>
//   );
// }

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
        InputProps={keyName === "exigencia" ? { endAdornment: "%" } : {}}
        error={isNaN(value) || value < 0}
      />
    </div>
  );
}

function App() {

  const [parameters, setParameters] = useState({});
  useEffect(() => {
    const dataTemplate = {
      exigencia: { name: "Exigencia", value: 60 },
      notaAprobacion: { name: "Nota aprobación", value: 4.0 },
      notaMin: { name: "Nota mínima", value: 2.0 },
      notaMax: { name: "Nota máxima", value: 7.0 },
      puntajeMin: { name: "Puntaje mínimo", value: 0 },
      puntajeMax: { name: "Puntaje máximo", value: 100 },
      incremento: { name: "Incremento", value: 1 }
    }

    const data = JSON.parse(localStorage.getItem('data')) || dataTemplate;
    setParameters(data);
  }, [])


  const [tableData, setTableData] = useState([]);
  const [validTable, setValidTable] = useState(false);

  const changeValue = (key, value) => {
    const _p = JSON.parse(JSON.stringify(parameters));
    _p[key].value = value;
    setParameters(_p);
  };

  useEffect(() => {
    const isValid =
      Object.keys(parameters).reduce(
        (acc, v) =>
          acc +
          (typeof parameters[v].value === "undefined" ||
            isNaN(parseFloat(parameters[v].value))),
        0
      ) === 0;
    setValidTable(isValid);

    const _p = JSON.parse(JSON.stringify(parameters));
    Object.keys(_p).forEach(v => (_p[v].values = parseFloat(_p[v].values)));

    if (Object.keys(_p).length === 0 || _p.incremento.value <= 0 || !isValid) return;
    let calc = p => {
      let exigencia = _p.exigencia.value / 100.;
      let puntajeAprobacion = _p.puntajeMax.value * exigencia;
      let m1 =
        (_p.notaAprobacion.value - _p.notaMin.value) /
        (puntajeAprobacion - _p.puntajeMin.value);
      let a1 = _p.notaMin.value - m1 * _p.puntajeMin.value;

      let m2 =
        (_p.notaMax.value - _p.notaAprobacion.value) /
        (_p.puntajeMax.value - puntajeAprobacion);
      let a2 = _p.notaMax.value - m2 * _p.puntajeMax.value;


      return p >= puntajeAprobacion ? m2 * p + a2 : m1 * p + a1;
    };

    let arr = [];
    for (
      let i = +_p.puntajeMin.value, id = 0;
      i <= +_p.puntajeMax.value;
      i += +_p.incremento.value, id++
    ) {
      arr.push({id: id, score: +i, grade: calc(i).toFixed(1)});
    }

    setTableData(arr);
    localStorage.setItem('data', JSON.stringify(_p));

  }, [parameters]);

  const columns = [
    {field: "score", headerName: "Puntaje", width: 150},
    {field: "grade", headerName: "Nota", width: 150, 
      cellClassName: (params) =>  (+params.value) < (+parameters.notaAprobacion.value) ? "rojo" : "" },
  ];


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App-body">
          <div className="App-content">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {Object.keys(parameters).map(v => (
                  <ParameterInput
                    key={v}
                    keyName={v}
                    values={parameters[v]}
                    handler={changeValue}
                  />
                ))}
              </Grid>

              <Grid item xs={12} md={8} style={{width: "100%", minHeight: "400px"}}>
                <DataGrid
                 rows={tableData}
                 columns={columns}
                 autoPageSize={true}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
