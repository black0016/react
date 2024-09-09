import React from 'react';

// Importamos Link para poder navegar entre páginas de 
// la aplicación con enlaces de navegación en lugar de 
// recargar la página completa cada vez que se hace clic 
// en un enlace de navegación en la aplicación de React Router DOM 
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to="/" className="clientes">Clientes</Link>
                <Link to="/productos" className="productos">Productos</Link>
                <Link to="/pedidos" className="pedidos">Pedidos</Link>
            </nav>
        </aside>
    );
}

export default Navegacion;