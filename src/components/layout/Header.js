import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CRMContext } from '../../context/CRMContext';

const Header = () => {
    const navigate = useNavigate();

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        // Eliminar el token del localStorage
        localStorage.setItem('token', '');
        // Eliminar el token del state
        guardarAuth({
            token: '',
            auth: false
        });
        // Redirigir al usuario a iniciar sesión con useNavigate
        navigate('/iniciar-sesion');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className='contenido-barra'>
                    <h1>CRM - Administrador de Clientes</h1>
                    {auth.auth ? (
                        <button className='btn btn-rojo' onClick={cerrarSesion}>
                            <i className='far fa-times-circle'></i>
                            Cerrar Sesión
                        </button>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

export default Header;