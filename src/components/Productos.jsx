import React from 'react';

const Productos = ({ products, onSelect }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} onClick={() => onSelect(product.id)}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Productos;