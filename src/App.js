import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {

  //State principal
  //ciudad = state, guardarCiudad = this.setState()
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {

    //prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {

      const appId = '18de4ee1de3c4b517e2fa44cb037713b';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
     //consultar la url
     const respuesta = await fetch(url);
     const resultado = await respuesta.json();
  
     guardarResultado(resultado);
  
  
    }

    consultarAPI();
  }, [ ciudad, pais ]);


  const datosConsulta = datos => {
    
    //Validar que ambos campos estén
    if(datos.ciudad === '' || datos.pais === ''){
      guardarError(true);
      return;
    }

    //si ciudad y país existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

 
  //Cargar un componente condicionalmente
  let componente;
  if(error){
    //Hay un error y mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios"/>

  } else if(resultado.cod === "404"){
    
    componente = <Error mensaje="La ciudad no existe en nuetro registro"/>

  } else{
    //Mostrar el clima
    componente = <Clima
                    resultado = {resultado}
                 />;
  }

  return (
    <div className="App">
      <Header
        titulo = "Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta = {datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
   
  );
}

export default App;
