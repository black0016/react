import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Importar clienteAxios de axios para las peticiones al servidor
import clienteAxios from '../../config/axios';

// Importar el componente de cliente para mostrar la información de los clientes
import Cliente from './Cliente';

const Clientes = () => {

    // Hook useState para manejar el estado de los clientes
    const [clientes, guardarClientes] = useState([]);

    // Hook useEffect para ejecutar efectos secundarios en componentes funcionales
    useEffect(() => {
        // Función asíncrona para consultar la API
        const consultarAPI = async () => {
            // Realiza una solicitud GET a la API para obtener los clientes
            const clientesConsulta = await clienteAxios.get('/clientes');
            // Guarda los datos obtenidos en el estado 'clientes'
            guardarClientes(clientesConsulta.data);
        }

        // Llama a la función para consultar la API
        consultarAPI();
    }, [clientes]); // La dependencia 'clientes' hace que el efecto se ejecute cada vez que 'clientes' cambia

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to="/clientes/nuevo-cliente" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente key={cliente._id} cliente={cliente} />
                ))}
            </ul>

        </Fragment>
    );
}

export default Clientes;