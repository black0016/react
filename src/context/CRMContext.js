import React, { useState } from 'react';

// Crea un contexto de React llamado CRMContext con un valor por defecto de un array que contiene un objeto vacío y una función vacía
const CRMContext = React.createContext([{}, () => { }]);

// Componente proveedor del contexto CRMProvider
const CRMProvider = props => {
    // Define un estado llamado 'auth' con un objeto que contiene 'token' y 'auth'
    // 'guardarAuth' es la función para actualizar este estado
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    });

    // Retorna el proveedor del contexto con el valor actual del estado 'auth' y la función 'guardarAuth'
    // Esto permite que cualquier componente hijo tenga acceso a 'auth' y 'guardarAuth'
    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children} {/* Renderiza los componentes hijos que están envueltos por CRMProvider */}
        </CRMContext.Provider>
    );
}

// Exporta el contexto y el proveedor para que puedan ser utilizados en otros archivos
export { CRMContext, CRMProvider };