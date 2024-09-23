import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = () => {

    // Obtener la función navigate
    const navigate = useNavigate();

    const { id } = useParams();

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    // Función para actualizar el total del pedido
    const actualizarTotal = useCallback(() => {
        // Si no hay productos en la lista, establecer el total a 0 y salir de la función
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }
        // Inicializar una variable para almacenar el nuevo total
        let nuevoTotal = 0;
        // Recorrer la lista de productos y calcular el total sumando (cantidad * precio) de cada producto
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        // Actualizar el estado con el nuevo total calculado
        guardarTotal(nuevoTotal);
    }, [productos]); // Dependencia: productos

    useEffect(() => {
        // Función asíncrona para consultar la API y obtener los datos del cliente
        const consultarApi = async () => {
            // Realiza una solicitud GET a la API para obtener los datos del cliente usando el ID
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            // Guarda los datos del cliente en el estado
            guardarCliente(resultado.data);
        }
        // Llama a la función para consultar la API
        consultarApi();
        // Llama a la función para actualizar el total del pedido
        actualizarTotal();
    }, [id, actualizarTotal]); // Incluye 'id' y 'actualizarTotal' en las dependencias

    // Función asíncrona para buscar un producto
    const buscarProducto = async e => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();
        // Realiza una solicitud POST a la API para buscar un producto usando el término de búsqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        // Si se encuentra al menos un producto en los resultados de la búsqueda
        if (resultadoBusqueda.data[0]) {
            // Obtiene el primer producto de los resultados de la búsqueda
            let productoResultado = resultadoBusqueda.data[0];
            // Asigna el ID del producto al campo 'producto'
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            // Inicializa la cantidad del producto a 0
            productoResultado.cantidad = 0;
            // Actualiza el estado de productos añadiendo el nuevo producto encontrado
            guardarProductos([...productos, productoResultado]);
        } else {
            // Muestra una alerta si no se encontraron resultados para la búsqueda
            Swal.fire({
                icon: 'error',
                title: 'Sin resultados',
                text: 'No se encontraron resultados para esta búsqueda.'
            });
        }
    }

    // Función para manejar el cambio en el campo de búsqueda
    const leerDatosBusqueda = e => {
        // Actualiza el estado de 'busqueda' con el valor actual del campo de entrada
        guardarBusqueda(e.target.value);
    }

    // Función para restar la cantidad de un producto en la lista
    const restarProductos = i => {
        // Crear una copia del array de productos para no mutar el estado directamente
        const todosProductos = [...productos];
        // Si la cantidad del producto ya es 0, no hacer nada y salir de la función
        if (todosProductos[i].cantidad === 0) return;
        // Decrementar la cantidad del producto en la posición 'i'
        todosProductos[i].cantidad--;
        // Actualizar el estado con la nueva lista de productos
        guardarProductos(todosProductos);
    }

    // Función para aumentar la cantidad de un producto en la lista
    const aumentarProductos = i => {
        // Crear una copia del array de productos para no mutar el estado directamente
        const todosProductos = [...productos];
        // Incrementar la cantidad del producto en la posición 'i'
        todosProductos[i].cantidad++;
        // Actualizar el estado con la nueva lista de productos
        guardarProductos(todosProductos);
    }

    // Función para eliminar un producto del pedido
    const eliminarProductoPedido = id => {
        // Filtra la lista de productos para excluir el producto con el ID especificado
        const todosProductos = productos.filter(producto => producto.producto !== id);
        // Actualiza el estado con la nueva lista de productos
        guardarProductos(todosProductos);
    }

    // Función asíncrona para realizar un pedido
    const realizarPedido = async e => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();
        // Crea un objeto 'pedido' con los datos del cliente, productos y total
        const pedido = {
            "cliente": cliente._id,
            "pedido": productos,
            "total": total
        }
        // Realiza una solicitud POST a la API para crear un nuevo pedido
        const resultado = await clienteAxios.post('/pedidos', pedido);
        // Si la solicitud se realizó con éxito (código de estado 200)
        if (resultado.status === 200) {
            // Muestra una alerta de éxito con el mensaje de la respuesta
            Swal.fire({
                icon: 'success',
                title: 'Operación exitosa',
                text: resultado.data.mensaje
            });
        } else {
            // Si hubo un error, muestra una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al procesar el pedido',
                text: 'Por favor, inténtelo de nuevo más tarde.'
            });
        }
        // Navega a la página de pedidos
        navigate('/pedidos');
    }

    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto key={producto.producto} producto={producto} restarProductos={restarProductos} aumentarProductos={aumentarProductos} eliminarProductoPedido={eliminarProductoPedido} index={index} />
                ))}
            </ul>

            <p className='total'>Total a Pagar: <span>$ {total}</span></p>

            {total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type='submit' className='btn btn-verde btn-block' value='Realizar Pedido'></input>
                </form>
            ) : null}

        </>
    );
}

export default NuevoPedido;