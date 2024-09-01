import React from 'react';
import ConsultaAlumnoPorCarnet from './ConsultaAlumnoPorCarnet';
//Este archivo nos permite importar los archivos tsx ConsultaAlumnoPorCarnet para que la interfaz desarrollada en el mismo
//pueda se ejecutada, llamandola desde la app.txs

const App: React.FC = () => {
  return (
    <div className="App">
      <ConsultaAlumnoPorCarnet />
    </div>
  );
}

export default App;
