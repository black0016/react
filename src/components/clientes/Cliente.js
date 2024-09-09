import React from 'react'; // Importar react
import { Link } from 'react-router-dom'; // Importar Link para poder navegar entre páginas
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas en la aplicación

import clienteAxios from '../../config/axios'; // Importar clienteAxios de axios para las peticiones al servidor

const Cliente = ({ cliente }) => {

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    // Eliminar un cliente de la base de datos
    const eliminarCliente = idCliente => {
        Swal.fire({
            title: "Eliminar Cliente",
            text: "¿Estás seguro(a) de que deseas eliminar este cliente?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Llama a la función de clienteAxios para eliminar el cliente con el ID especificado
                clienteAxios.delete(`/clientes/${idCliente}`)
                    .then(res => {
                        Swal.fire({
                            title: "Eliminado",
                            text: res.data.mensaje,
                            icon: "success"
                        });
                    });
            }
        });

    }

    return (
        <li className='cliente'>
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar-cliente/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarCliente(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
}

export default Cliente;