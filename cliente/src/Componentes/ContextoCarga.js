import React from "react";
import { createContext,useContext,useState } from "react";

const contextoEstadoCarga = createContext(); //Se crea la variable que tiene acceso para crear el contexto//

export const usarCarga = () => useContext(contextoEstadoCarga);


export const CargarProvider= ({children}) =>
{
    const [estaCargando, setEstaCargando] = useState(false); // inicializo el estado para invocar el componente //
    return (
        <contextoEstadoCarga.Provider value={{estaCargando,setEstaCargando}}>
            {children}
        </contextoEstadoCarga.Provider>
    );
}