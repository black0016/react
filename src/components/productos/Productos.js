import React, { useState, useEffect } from 'react'; // Importar react
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom

import clienteAxios from '../../config/axios'; // Imporat clienteAxios de axios para hacer las peticiones al servidor
import Producto from './Producto'; // Importar el componenete de producto para mostrar la informacion de los productos
import Spinner from '../layout/Spinner';

const Productos = () => {

    // Hook de estado para almacenar los productos
    const [productos, guardarProductos] = useState([]);

    // Hook de efecto apra realizar una acción despues de que el componente se cargue
    useEffect(() => {
        // Función asíncrona para consultar la API
        const consultarAPI = async () => {
            // Solicitud GET a la api para obtener todos los productos que estan en la BD
            const productosConsulta = await clienteAxios.get('/productos');
            // Guardar los datos obtenidos en el estado 'productos'
            guardarProductos(productosConsulta.data);
        }

        // Llamado a la función para consultar a la API
        consultarAPI();
    }, [productos]) // El hook se ejecuta cada vez que 'productos' cambia

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