import React, { useState, useEffect } from 'react'; // Importar react, useState, useEffect de react
import { useNavigate, useParams } from 'react-router-dom'; // Importar useNavigate, useParams de react-router-dom para la navegación y los parámetros de la URL
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas en la aplicación 

import clienteAxios from '../../config/axios'; // Importar clienteAxios de axios para las peticiones al servidor 
import Spinner from '../layout/Spinner'; // Importar el Spinner de carga de la pagina

const EditarProducto = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }
        consultarAPI();
    }, [id]);

    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    }

    const { nombre, precio, imagen } = producto;
    if (!nombre) return <Spinner />

    const editarProducto = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200) {
                Swal.fire({
                    title: "Producto Actualizado",
                    text: res.data.mensaje,
                    icon: "success"
                });
            }

            navigate('/productos');
        } catch (error) {
            console.log('error', error);
            Swal.fire({
                icon: 'error',
                title: "Ocurrió un error",
                text: "Por favor, inténtelo de nuevo.",
            });
        }

    }

    return (
        <>
            <h2>Editar Producto</h2>

            <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" defaultValue={nombre} onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" defaultValue={precio} onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (<img src={`http://localhost:5004/${imagen}`} alt='' width={300} />) : null}

                    <input type="file" name="imagen" onChange={leerArchivo} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar Producto" />
                </div>
            </form>

        </>
    );
}

export default EditarProducto;