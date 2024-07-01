import React, { useState, useEffect } from 'react';
import { obtenerProductosLocalStorage, guardarProductoLocalStorage } from './localStorageUtils';

const Cart = ({ cart, onUpdateQuantity, onRemove }) => {
<<<<<<< Updated upstream
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>${item.price} x {item.quantity}</p>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => onRemove(item.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => alert('Compra finalizada')}>Finalizar Compra</button>
    </div>
  );
=======
    const [cartItems, setCartItems] = useState([]);

    // Cargar los productos del localStorage al montar el componente
    useEffect(() => {
        const productosGuardados = obtenerProductosLocalStorage();
        setCartItems(productosGuardados);
    }, []);

    // Función para actualizar la cantidad de un producto en el carrito
    const handleUpdateQuantity = (id, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        guardarProductoLocalStorage(updatedCartItems);
    };

    // Función para eliminar un producto del carrito
    const handleRemove = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        guardarProductoLocalStorage(updatedCartItems);
    };

    // Función para finalizar la compra
    const handleFinishPurchase = () => {
        if (cartItems.length === 0) {
            alert('No hay productos en el carrito. Agrega productos antes de finalizar la compra.');
            return;
        }

        // Limpiar el carrito al finalizar la compra
        localStorage.removeItem('productos');
        alert('Compra finalizada. Redireccionando al inicio.');
        // Redirigir al inicio
        window.location.href = '/';
    };

    // Calcular el total del carrito
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <img src={item.thumbnail} alt={item.title} style={{ width: '50px', height: '50px' }} />
                            <h3>{item.title}</h3>
                            <p>${item.price} x {item.quantity}</p>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                        </div>
                    ))}
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={handleFinishPurchase}>Finalizar Compra</button>
                </>
            )}
        </div>
    );
>>>>>>> Stashed changes
};

export default Cart;
