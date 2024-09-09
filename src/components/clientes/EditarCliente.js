import React, { useState, useEffect } from 'react'; // Importar react, useState, useEffect de react
import { useNavigate, useParams } from 'react-router-dom'; // Importar useNavigate, useParams de react-router-dom para la navegación y los parámetros de la URL
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas en la aplicación 

import clienteAxios from '../../config/axios'; // Importar clienteAxios de axios para las peticiones al servidor 

const EditarCliente = () => {

    // Obtener la función navigate
    const navigate = useNavigate();

    // Obtener el ID del cliente desde los parámetros de la URL
    const { id } = useParams();

    // State para el cliente
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Leer los datos del formulario
    const actualizarState = e => {
        // Llama a la función datosCliente para actualizar el estado del cliente
        datosCliente({
            // Copia todas las propiedades actuales del objeto cliente
            ...cliente,
            // Actualiza la propiedad del objeto cliente que corresponde al nombre del campo que se ha cambiado
            [e.target.name]: e.target.value
        });
    };

    // Hook useEffect para ejecutar la consulta a la API cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para consultar la API y obtener los datos del cliente
        const consultarAPI = async () => {
            // Realiza una solicitud GET a la API para obtener los datos del cliente con el ID especificado
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
            // Actualiza el estado del componente con los datos del cliente obtenidos de la API
            datosCliente(clienteConsulta.data);
        };

        // Llama a la función consultarAPI para obtener los datos del cliente
        consultarAPI();
    }, [id]); // Se pasa el ID como dependencia para que se ejecute cada vez que cambie

    // Valida que el cliente tenga contenido en todos los campos del formulario
    const validarCliente = () => {
        // Destructuring para extraer los valores del cliente
        const { nombre, apellido, empresa, email, telefono } = cliente;
        // Revisar que las propiedades del objeto cliente tengan contenido
        return !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
    };

    // Actualizar el cliente en la base de datos
    const actualizarCliente = e => {
        e.preventDefault();

        // Enviar petición a la API para actualizar el cliente en la base de datos
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                // Validar si hay errores de la API en la respuesta
                if (res.data.code === 11000) {
                    Swal.fire({
                        title: "Error",
                        text: "Este cliente ya está registrado",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Correcto",
                        text: "Los datos del cliente se actualizaron correctamente",
                        icon: "success"
                    });
                }
                // Redireccionar al usuario a la lista de clientes
                navigate('/');
            });
    };

    return (
        <>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" value={cliente.nombre} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" value={cliente.apellido} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" value={cliente.empresa} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" value={cliente.email} onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" value={cliente.telefono} onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()} />
                </div>
            </form>
        </>
    );
}

export default EditarCliente;