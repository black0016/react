import React, { useState, useEffect, useContext } from 'react'; // Importar react
import { Link, useNavigate } from 'react-router-dom'; // Importar Link de react-router-dom

import clienteAxios from '../../config/axios'; // Imporat clienteAxios de axios para hacer las peticiones al servidor
import Producto from './Producto'; // Importar el componenete de producto para mostrar la informacion de los productos
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext'; // Importar el contexto de CRMContext para acceder al estado de autenticación

const Productos = () => {
    // Hook para obtener la función navigate
    const navigate = useNavigate();

    // Hook de estado para almacenar los productos
    const [productos, guardarProductos] = useState([]);

    // Utilizar valores del contexto de CRMContext para acceder al estado de autenticación
    const [auth, guardarAuth] = useContext(CRMContext);

    // Hook de efecto apra realizar una acción despues de que el componente se cargue
    useEffect(() => {
        if (auth.token !== '') {

            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    guardarProductos(productosConsulta.data);
                } catch (error) {
                    // Si hay un error, mostrarlo en consola
                    console.log(error);
                    // Si hay un error con el token, redirige al usuario a iniciar sesión
                    if (error.response.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }

            consultarAPI();
        } else {
            // Si no hay un token, redirige al usuario a iniciar sesión
            navigate('/iniciar-sesion');
        }
    }, [productos, auth.token, navigate]);

    useEffect(() => {
        if (!auth.auth) {
            navigate('/iniciar-sesion');
        }
    }, [auth.auth, navigate]);

    // Si no hay productos en el estado, muestra el componente Spinner (indicador de carga)
    if (!productos.length) return <Spinner />

    return (
        <>
            <h2>Productos</h2>

            <Link to="/productos/nuevo-producto" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className='listado-productos'>
                {productos.map(producto => (
                    <Producto key={producto._id} producto={producto} />
                ))}
            </ul>

        </>
    );
}

export default Productos;