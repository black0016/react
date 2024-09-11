import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

const Producto = ({ producto }) => {

    const { _id, nombre, precio, imagen } = producto;

    const eliminarProducto = idProducto => {
        Swal.fire({
            title: "Eliminar Producto",
            text: "¿Estás seguro(a) de que deseas eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Llama a la función de clienteAxios para eliminar el producto con el ID especificado
                clienteAxios.delete(`/productos/${idProducto}`)
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
        <li className="producto">
            <div className="info-producto">
                <p className="nombre"> {nombre} </p>
                <p className="precio">$ {precio} </p>
                {imagen ? (<img src={`http://localhost:5004/${imagen}`} alt='' />) : null}
            </div>
            <div className="acciones">
                <Link to={`/productos/editar-producto/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}

export default Producto;