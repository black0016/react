import React, { useState } from 'react'; // Importar react, useState, useEffect de react
import { useNavigate } from 'react-router-dom'; // Importar useNavigate de react-router-dom para navegar entre páginas
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas en la aplicación

import clienteAxios from '../../config/axios'; // Importar clienteAxios de axios para las peticiones al servidor 

const NuevoProducto = () => {

    // Hook de navegación para redirigir a otras rutas
    const navigate = useNavigate();

    // Hook de estado para almacenar los datos del producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    // Hook de estado para almacenar el archivo seleccionado
    const [archivo, guardarArchivo] = useState('');

    // Función para actualizar el estado del producto cuando se cambia un campo del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto, // Mantiene los valores actuales del producto
            [e.target.name]: e.target.value // Actualiza el campo específico que se ha cambiado
        });
    }

    // Función para actualizar el estado del archivo cuando se selecciona un archivo
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]); // Guarda el primer archivo seleccionado
    }

    // Función para validar los datos del producto
    const validarProducto = () => {
        // Desestructuración del objeto 'producto' para obtener 'nombre' y 'precio'
        const { nombre, precio } = producto;
        // Revisar que las propiedades del objeto producto tengan contenido
        return !nombre.length || !precio.length;
    }

    // Función asíncrona para agregar un nuevo producto a la base de datos
    const agregarProductoDB = async e => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Crea un objeto FormData para enviar los datos del producto
        const formData = new FormData();
        formData.append('nombre', producto.nombre); // Añade el nombre del producto
        formData.append('precio', producto.precio); // Añade el precio del producto
        formData.append('imagen', archivo); // Añade la imagen del producto

        try {
            // Realiza una solicitud POST a la API para agregar el producto
            const res = await clienteAxios.post('/productos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // Establece el tipo de contenido
            });

            // Si la respuesta es exitosa (código 200)
            if (res.status === 200) {
                // Muestra una alerta de éxito usando SweetAlert2
                Swal.fire({
                    title: "Nuevo producto",
                    text: res.data.mensaje,
                    icon: "success"
                });
            }

            // Redirige a la página de productos
            navigate('/productos');

        } catch (error) {
            // Si ocurre un error, lo muestra en la consola
            console.log('error', error);
            // Muestra una alerta de error usando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: "Ocurrió un error",
                text: "Por favor, inténtelo de nuevo.",
            });
        }
    }

    return (
        <>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProductoDB}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" onChange={leerArchivo} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" disabled={validarProducto()} />
                </div>
            </form>

        </>
    );
}

export default NuevoProducto;