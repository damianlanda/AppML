import React, { useEffect, useState } from 'react';

const Detalle = ({ productId, onAddToCart }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/items/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <div>
        {product.pictures.map((pic) => (
          <img key={pic.id} src={pic.url} alt={product.title} />
        ))}
      </div>
      <p>{product.description || 'No hay descripción disponible.'}</p>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Añadir al carrito</button>
    </div>
  );
};

export default Detalle;
