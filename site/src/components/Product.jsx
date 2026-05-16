import React, { useState, useEffect } from 'react';
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
          className="product-image primary"
          loading="lazy"
        />
        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            alt={`${product.name} detalhe`} 
            className="product-image secondary"
            loading="lazy"
          />
        )}
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
          {product.sizes && product.sizes.length > 0 ? (
            product.sizes.map(size => (
              <button
                key={size}
                className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
                aria-label={`Tamanho ${size}`}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="consult-sizes-msg">Consulte tamanhos disponíveis</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <button
            className={`add-to-cart-btn`}
            onClick={handleConsult}
          >
            Consulte Valores
          </button>
          <button
            className={`add-to-cart-btn btn-outline ${isAdding ? 'adding' : ''} ${(!selectedSize && product.sizes.length > 0) ? 'disabled' : ''}`}
            onClick={handleAdd}
            disabled={!selectedSize && product.sizes.length > 0}
          >
            {isAdding ? '✓ Na Mala!' : (selectedSize || product.sizes.length === 0) ? `Adicionar à Mala` : 'Selecione o tamanho'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, onAdd, onOpenCart }) {
  const [filter, setFilter] = useState('Destaques');

  useEffect(() => {
    const handler = (e) => setFilter(e.detail);
    window.addEventListener('changeCategory', handler);
    return () => window.removeEventListener('changeCategory', handler);
  }, []);
  
  const categories = [
    'Destaques',
    'Menina de 1 até 12',
    'Menino',
    'Baby',
    'Bonecas exclusivas'
  ];
  
  const filtered = filter === 'Destaques' 
    ? products.filter(p => p.highlight) 
    : products.filter(p => p.category === filter);

  return (
    <section className="catalog" id="catalog">
      <div className="container catalog-container">
        
        <aside className="catalog-sidebar slide-up">
          <div className="sidebar-header">
            <h3>Departamentos</h3>
          </div>
          <div className="filter-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-item ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sidebar-action">
            <button className="btn-primary full-width" onClick={onOpenCart}>
              Peça sua malinha
            </button>
          </div>
        </aside>

        <div className="catalog-main">
          <div className="section-header slide-up">
            <span className="section-label">{filter}</span>
            <h2>Descubra diversos modelos além dos lançamentos.</h2>
            <p>Solicite aqui a malinha de estilo para meninos e meninas.</p>
          </div>

          <div className="products-grid">
            {filtered.length > 0 ? (
              filtered.map((product, i) => (
                <div key={product.id} className="slide-up" style={{ animationDelay: `${(i % 10) * 0.08}s` }}>
                  <ProductCard product={product} onAdd={onAdd} />
                </div>
              ))
            ) : (
              <div className="empty-category slide-up">
                <h3>Em breve novidades</h3>
                <p>Estamos preparando uma coleção exclusiva para esta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
