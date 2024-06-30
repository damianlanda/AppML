import React, { useState } from 'react';

const Buscador = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Buscar productos..." 
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Buscador;