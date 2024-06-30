import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemove }) => {
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handleFinishPurchase = () => {
if (cart.length === 0) {
alert('No hay productos en el carrito. Agrega productos antes de finalizar la compra.');
return;
}

// Limpiar el carrito al finalizar la compra
localStorage.removeItem('cart');
alert('Compra finalizada. Redireccionando al inicio.');
// Redirigir al inicio
window.location.href = '/';
};

return (
<div>
<h2>Carrito de Compras</h2>
{cart.length === 0 ? (
<p>No hay productos en el carrito.</p>
) : (
<>
{cart.map((item) => (
<div key={item.id}>
<img src={item.thumbnail} alt={item.title} style={{ width: '50px', height: '50px' }} />
<h3>{item.title}</h3>
<p>${item.price} x {item.quantity}</p>
<button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
<button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
<button onClick={() => onRemove(item.id)}>Eliminar</button>
</div>
))}
<h3>Total: ${total.toFixed(2)}</h3>
<button onClick={handleFinishPurchase}>Finalizar Compra</button>
</>
)}
</div>
);
};

export default Cart;

