// Importacion de useSate
//Importacion del archivo css para la aplicación de los estilos


import React, { useState } from 'react';
import './ConsultaAlumnoPorCarnet.css';

// Creación de las variables

interface Estudiante {
  id: number;
  carnet: string;
  nombres: string;
  correo: string;
  seccion: string;
}


// Desarrollo para la busqueda por carnet y los botones que se usuaran en la interfaz consulta alumnos
//Asi como la consula a la api test deploy-12onrender.com/estudiantes
const ConsultaAlumnoPorCarnet: React.FC = () => {
  const [carnet, setCarnet] = useState<string>('');
  const [resultado, setResultado] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const response = await fetch(
        'https://test-deploy-12.onrender.com/estudiantes?carnet=${carnet}'
      );
      if (!response.ok) {
        throw new Error('Error al consultar la API');
      }
      const data: Estudiante[] = await response.json();
      if (data.length > 0) {
        setResultado(data.find(est => est.Carnet === carnet) || null);
        if (!resultado) {
          setError('No se encontró ningún estudiante con ese carnet');
        }
      } else {
        setError('No se encontró ningún estudiante con ese carnet');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar el cuadro de busqueda
  const handleLimpiar = () => {
    setCarnet('');
    setResultado(null);
    setError(null);
  };
  // Cancelar Busqueda
  const handleCancelar = () => {
    handleLimpiar();
  };

  return (
    <div className="consulta-alumno-container">
      <h1>Consulta de alumnos</h1>
      <h2>Tarea del Curso Desarrollo Web Seccion A UMG 2024</h2>
      <div className="form-group">
        <label>Carnet:</label>
        <input
          type="text"
          value={carnet}
          onChange={(e) => setCarnet(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleBuscar} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        <button onClick={handleLimpiar}>Limpiar</button>
        <button onClick={handleCancelar}>Cancelar</button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      {resultado && (
        <div className="resultado">
          <h2>Resultado:</h2>
          <p><strong>Carnet:</strong> {resultado.Carnet}</p>
          <p><strong>Nombres:</strong> {resultado.Estudiante}</p>
          <p><strong>Correo Electrónico:</strong> {resultado.Email}</p>
          <p><strong>Sección:</strong> {resultado.Seccion}</p>
        </div>
      )}
    </div>
  );
};

export default ConsultaAlumnoPorCarnet;
