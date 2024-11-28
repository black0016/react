import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

const Login = () => {

    const [auth, guardarAuth] = useContext(CRMContext);

    // Obtener la función navigate
    const navigate = useNavigate();

    const [credenciales, guardarCredenciales] = useState({});

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    }

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // Guardar el token en el state de CRMContext
            guardarAuth({ token, auth: true });

            Swal.fire({
                icon: 'success',
                title: 'Login Correcto',
                text: 'Has iniciado sesión correctamente'
            });

            navigate('/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                // text: error.message
                text: error.response.data.mensaje
            });
        }
    }

    return (
        <>
            <div className='login'>
                <h2>Iniciar Sesión</h2>

                <div className='contenedor-formulario'>
                    <form onSubmit={iniciarSesion}>
                        <div className='campo'>
                            <label>Email</label>
                            <input type='email' name='email' placeholder='Email para iniciar sesión' required onChange={leerDatos} />
                        </div>

                        <div className='campo'>
                            <label>Password</label>
                            <input type='password' name='password' placeholder='Password para iniciar sesión' required onChange={leerDatos} />
                        </div>

                        <input type='submit' value='Iniciar Sesión' className='btn btn-verde btn-block' />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;