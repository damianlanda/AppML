import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchBar from './components/Buscador';
import ProductList from './components/Productos';
import ProductDetails from './components/Detalle';
import Cart from './components/Carrito';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSearch = (query) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.results));
      setProducts(data.results);
      setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleHomeClick = () => {
    setSelectedProduct(null); // Ensure the selected product is cleared
  };

  return (
    <Router>
      <header class = "header">
        <div>
          <nav class = "nav">
            <Link to="/" onClick={handleHomeClick}>
              <img class = "logo" src = "/images/logo.webp" alt="Logo" />
            </Link>
            <SearchBar onSearch={handleSearch} />
            <Link to="/cart">Carrito</Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {selectedProduct ? (
                    <ProductDetails
                      productId={selectedProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ) : (
                    <ProductList products={products} onSelect={setSelectedProduct} />
                  )}
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              }
            />
          </Routes>
        </div>
      </header>
    </Router>
  );
};

export default App;
