import React, { useState } from 'react';
import './Product.css';

export function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleConsult = () => {
    let message = `Olá! Gostaria de consultar sobre o produto *${product.name}*`;
    if (selectedSize) {
      message += ` no tamanho *${selectedSize}*`;
    }
    message += `.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/555193732396?text=${encodedMessage}`, '_blank');
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    onAdd({ ...product, selectedSize });
    setTimeout(() => {
      setIsAdding(false);
      setSelectedSize(null);
    }, 600);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
        {product.description && (
          <div className="product-overlay">
            <p>{product.description}</p>
          </div>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        <div className="size-selector">
          {product.sizes.map(size => (
            <button
              key={size}
              className={`size-chip ${selectedSize === size ? 'active' : ''}`}
              onClick={() => setSelectedSize(size)}
              aria-label={`Tamanho ${size}`}
            >
              {size}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <button
            className={`add-to-cart-btn`}
            onClick={handleConsult}
          >
            Consulte Valores
          </button>
          <button
            className={`add-to-cart-btn btn-outline ${isAdding ? 'adding' : ''} ${!selectedSize ? 'disabled' : ''}`}
            onClick={handleAdd}
            disabled={!selectedSize}
          >
            {isAdding ? '✓ Na Mala!' : selectedSize ? `Adicionar à Mala` : 'Selecione o tamanho'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, onAdd }) {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter);

  return (
    <section className="catalog" id="catalog">
      <div className="container">
        <div className="section-header slide-up">
          <span className="section-label">Catálogo & Lançamento</span>
          <h2>Coleção Inverno & Bonecas</h2>
          <p>Peças selecionadas com carinho. As nossas bonecas exclusivas vestem os mesmos looks da Coleção de Inverno!</p>
        </div>

        <div className="filter-bar slide-up" style={{ animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((product, i) => (
            <div key={product.id} className="slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={product} onAdd={onAdd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
