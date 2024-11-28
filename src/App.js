import React, { Fragment, useContext } from 'react'; // Importar react 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar BrowserRouter as Router, Route, Routes de react-router-dom para las rutas de la aplicación


// Layaouts
import Header from './components/layout/Header'; // Importar el componente Header
import Navegacion from './components/layout/Navegacion'; // Importar el componente Navegacion

// Componentes
import Clientes from './components/clientes/Clientes'; // Importar el componente Clientes 
import NuevoCliente from './components/clientes/NuevoCliente'; // Importar el componente NuevoCliente
import EditarCliente from './components/clientes/EditarCliente'; // Importar el componente EditarCliente

import Productos from './components/productos/Productos'; // Importar el componente Productos
import NuevoProducto from './components/productos/NuevoProducto'; // Importar el componente NuevoProducto
import EditarProducto from './components/productos/EditarProducto'; // Importar el componente EditarProducto

import Pedidos from './components/pedidos/Pedidos'; // Importar el componente Pedidos
import NuevoPedido from './components/pedidos/NuevoPedido'; // Importar el componente de NuevoPedido

import Login from './components/auth/Login'; // Importar el componente Login

import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {
    // Utilizar el contexto en el componente principal
    const [auth, guardarAuth] = useContext(CRMContext);

    return (
        <Router>
            <Fragment>
                <CRMProvider value={[auth, guardarAuth]}>
                    <Header />

                    <div className="grid contenedor contenido-principal">
                        <Navegacion />

                        <main className="caja-contenido col-9">
                            <Routes>
                                <Route path="/" element={<Clientes />} /> {/* Ruta por defecto que lista los clientes */}
                                <Route path='/clientes/nuevo-cliente' element={<NuevoCliente />} /> {/* Ruta para el formulario de nuevo cliente */}
                                <Route path='/clientes/editar-cliente/:id' element={<EditarCliente />} /> {/* Ruta para el formulario de editar cliente */}

                                <Route path="/productos" element={<Productos />} /> {/* Ruta para listar los productos */}
                                <Route path="/productos/nuevo-producto" element={<NuevoProducto />} />  {/* Ruta para el formulario de nuevo producto */}
                                <Route path='/productos/editar-producto/:id' element={<EditarProducto />} /> {/* Ruta para el formulario de editar producto */}

                                <Route path="/pedidos" element={<Pedidos />} /> {/* Ruta para listar los pedidos */}
                                <Route path='/pedidos/nuevo-pedido/:id' element={<NuevoPedido />} /> {/* Ruta para el formulario de nuevo pedido */}

                                <Route path='/iniciar-sesion' element={<Login />} /> {/* Ruta para el formulario de iniciar sesión */}
                            </Routes>
                        </main>
                    </div>
                </CRMProvider>
            </Fragment>
        </Router>
    );
}


export default App;
