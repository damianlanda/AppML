// obtenerProductosLocalStorage.js
export const obtenerProductosLocalStorage = () => {
    const productosString = localStorage.getItem('productos');
    return productosString ? JSON.parse(productosString) : [];
};

// guardarProductoLocalStorage.js
export const guardarProductoLocalStorage = (productos) => {
    localStorage.setItem('productos', JSON.stringify(productos));
};
