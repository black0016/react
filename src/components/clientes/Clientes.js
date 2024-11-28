import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importar clienteAxios de axios para las peticiones al servidor
import clienteAxios from '../../config/axios';
// Importar el componente de cliente para mostrar la información de los clientes
import Cliente from './Cliente';
// Importar el componente Spinner para mostrar un indicador de carga
import Spinner from '../layout/Spinner';

// Importar el contexto de CRMContext para acceder al estado de autenticación
import { CRMContext } from '../../context/CRMContext';

const Clientes = () => {
    // Obtener la función navigate
    const navigate = useNavigate();

    // Hook useState para manejar el estado de los clientes
    const [clientes, guardarClientes] = useState([]);

    // Utilizar valores del contexto de CRMContext para acceder al estado de autenticación
    const [auth, guardarAuth] = useContext(CRMContext);

    // Hook useEffect para ejecutar efectos secundarios en componentes funcionales
    useEffect(() => {
        if (auth.token !== '') {
            // Función asíncrona para consultar la API
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    guardarClientes(clientesConsulta.data);
                } catch (error) {
                    // Si hay un error, mostrarlo en consola
                    console.log(error);
                    // Si hay un error con el token, redirige al usuario a iniciar sesión
                    if (error.response.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            // Llama a la función para consultar la API
            consultarAPI();
        } else {
            // Si no hay un token, redirige al usuario a iniciar sesión
            navigate('/iniciar-sesion');
        }

    }, [clientes, auth.token, navigate]);

    useEffect(() => {
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth.auth, navigate]);

    // Si no hay clientes en el estado, muestra el componente Spinner (indicador de carga)
    if (!clientes.length) return <Spinner />

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