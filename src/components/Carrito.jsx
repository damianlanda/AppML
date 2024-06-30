import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemove }) => {
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
};

export default Cart;
