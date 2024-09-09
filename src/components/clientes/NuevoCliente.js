import React, { useState } from 'react'; // Importar react y useState para el estado del componente NuevoCliente 
import clienteAxios from '../../config/axios'; // Importar clienteAxios de axios para las peticiones al servidor
import { useNavigate } from 'react-router-dom'; // Importar useNavigate de react-router-dom para navegar entre páginas
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas en la aplicación

const NuevoCliente = () => {

    // Obtener la función navigate
    const navigate = useNavigate();

    // State para el cliente
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Leer los datos del formulario
    const actualizarState = e => {
        // Llama a la función guardarCliente para actualizar el estado del cliente
        guardarCliente({
            // Copia todas las propiedades actuales del objeto cliente
            ...cliente,
            // Actualiza la propiedad del objeto cliente que corresponde al nombre del campo que se ha cambiado
            [e.target.name]: e.target.value
        });
    };

    // Valida que el cliente tenga contenido en todos los campos del formulario
    const validarCliente = () => {
        // Destructuring para extraer los valores del cliente
        const { nombre, apellido, empresa, email, telefono } = cliente;

        // Revisar que las propiedades del objeto cliente tengan contenido
        return !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
    };

    // Agregar el nuevo cliente a la base de datos
    const guardarClienteBD = e => {
        e.preventDefault();

        // Enviar petición a la API para agregar el cliente a la base de datos 
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // Validar si hay errores de la API en la respuesta
                if (res.data.code === 11000) {
                    console.log('Error de duplicado de Mongo');
                    Swal.fire({
                        title: "Error",
                        text: "Este cliente ya está registrado",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Nuevo cliente",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                }
                // Redireccionar al usuario a la lista de clientes
                navigate('/');
            })
    }


    return (
        <> {/* Fragment simplificado sin necesidad de importar Fragment*/}
            <h2>Nuevo Cliente</h2>

            <form onSubmit={guardarClienteBD}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()} />
                </div>
            </form>
        </>
    );
}

export default NuevoCliente;