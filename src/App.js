import React, { Fragment } from 'react'; // Importar react 
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


function App() {
    return (
        <Router>
            <Fragment>
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
                        </Routes>
                    </main>
                </div>
            </Fragment>
        </Router>
    );
}


export default App;
