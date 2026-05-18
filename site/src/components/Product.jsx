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
    if (!selectedSize && product.sizes && product.sizes.length > 0) return;
    setIsAdding(true);
    onAdd({ ...product, selectedSize: selectedSize || 'Consultar' });
    setTimeout(() => {
      setIsAdding(false);
      setSelectedSize(null);
    }, 600);
  };

  const canAdd = !product.sizes || product.sizes.length === 0 || !!selectedSize;

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
              >
                {size}
              </button>
            ))
          ) : (
            <p className="consult-sizes-msg">Consulte tamanhos e valores</p>
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
            className={`add-to-cart-btn btn-outline ${isAdding ? 'adding' : ''} ${!canAdd ? 'disabled' : ''}`}
            onClick={handleAdd}
            disabled={!canAdd}
          >
            {isAdding ? '✓ Na Mala!' : (selectedSize || product.sizes.length === 0) ? `Adicionar à Mala` : 'Selecione o tamanho'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper para extrair subcategorias dinamicamente a partir do nome das peças
const getSubcategory = (product) => {
  const name = product.name.toLowerCase();
  if (name.includes('casaco') || name.includes('jaqueta') || name.includes('blazer') || name.includes('capa') || name.includes('parka') || name.includes('sobretudo') || name.includes('cardigan')) {
    return 'Casacos';
  }
  if (name.includes('conjunto') || name.includes('abrigo') || name.includes('tênis') || name.includes('kit') || name.includes('coordenado')) {
    return 'Conjuntos';
  }
  if (name.includes('calça') || name.includes('moletom') || name.includes('calca') || name.includes('legging') || name.includes('pant') || name.includes('jogger')) {
    return 'Calças & Moletons';
  }
  if (name.includes('camisa') || name.includes('blusa') || name.includes('camiseta') || name.includes('t-shirt') || name.includes('polo') || name.includes('body') || name.includes('tricot')) {
    return 'Camisas & Blusas';
  }
  if (name.includes('vestido') || name.includes('jardineira') || name.includes('salopete')) {
    return 'Vestidos';
  }
  return 'Outros';
};

export function ProductGrid({ products, onAdd, onOpenCart }) {
  const [filter, setFilter] = useState('Coleção Menina & Boneca');
  const [subFilter, setSubFilter] = useState('Todos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const categoryHandler = (e) => {
      setFilter(e.detail);
      setSubFilter('Todos'); // Reseta o sub-filtro ao mudar de departamento
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const filterOpenHandler = () => {
      setIsSidebarOpen(true);
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('changeCategory', categoryHandler);
    window.addEventListener('openMobileFilter', filterOpenHandler);

    return () => {
      window.removeEventListener('changeCategory', categoryHandler);
      window.removeEventListener('openMobileFilter', filterOpenHandler);
    };
  }, []);

  const handleFilterClick = (cat) => {
    setFilter(cat);
    setSubFilter('Todos'); // Reseta o sub-filtro ao mudar de departamento
    setIsSidebarOpen(false);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const categories = [
    'Coleção Menina & Boneca',
    'Menina',
    'Menino',
    'Baby Menina',
    'Baby Menino'
  ];
  
  // Primeiro, filtra pelo departamento selecionado
  const departmentFiltered = filter === 'Coleção Menina & Boneca' 
    ? products.filter(p => p.collection === 'menina-boneca') 
    : products.filter(p => p.category === filter);

  // Calcula quais subcategorias estão disponíveis dinamicamente para este departamento
  const availableSubcats = ['Todos', ...new Set(departmentFiltered.map(p => getSubcategory(p)))];

  // Aplica o sub-filtro (calça, camisa, etc.) se houver
  const filtered = subFilter === 'Todos'
    ? departmentFiltered
    : departmentFiltered.filter(p => getSubcategory(p) === subFilter);

  return (
    <section className="catalog" id="catalog">
      {/* Overlay do Menu de Departamentos Mobile */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <div className="container catalog-container">
        
        <aside className={`catalog-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Departamentos</h3>
            <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="filter-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-item ${filter === cat ? 'active' : ''}`}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sidebar-action">
            <button className="btn-primary full-width" onClick={() => { setIsSidebarOpen(false); onOpenCart(); }}>
              Peça sua malinha
            </button>
          </div>
        </aside>

        <div className="catalog-main">
          {/* Botão de Filtro Estilo Barra de Pesquisa Chique */}
          <button className="mobile-filter-search-bar" onClick={() => setIsSidebarOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="search-placeholder">Buscar por Departamento: <strong className="active-filter-name">{filter}</strong></span>
          </button>

          <div className="section-header slide-up">
            <span className="section-label">{filter}</span>
            <h2>Descubra diversos modelos além dos lançamentos.</h2>
            <p>Solicite aqui a malinha de estilo para meninos e meninas.</p>
          </div>

          {/* Sub-filtros Dinâmicos Chiques (Aparece apenas quando abre o departamento e há subcategorias para filtrar) */}
          {availableSubcats.length > 2 && (
            <div className="sub-filters-container slide-up">
              {availableSubcats.map(sub => (
                <button
                  key={sub}
                  className={`sub-filter-pill ${subFilter === sub ? 'active' : ''}`}
                  onClick={() => setSubFilter(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

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
