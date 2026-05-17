import React, { useState } from 'react';
import './FeaturedCollection.css';

export default function FeaturedCollection({ products, onAdd, onOpenCart }) {
  const [addingId, setAddingId] = useState(null);

  // Separar looks combinando (divulgação) de bonecas exclusivas
  const looks = products.filter(p => p.collection === 'menina-boneca' && p.category !== 'Boneca');
  const bonecas = products.filter(p => p.collection === 'menina-boneca' && p.category === 'Boneca');

  const handleAdd = (product) => {
    setAddingId(product.id);
    onAdd({ ...product, selectedSize: 'Consultar' });
    setTimeout(() => {
      setAddingId(null);
    }, 600);
  };

  if (products.length === 0) return null;

  return (
    <section className="featured-section" id="featured-collection">
      <div className="container">
        {/* Cabeçalho Editorial */}
        <div className="featured-header">
          <span className="featured-badge">✦ Lançamento de Inverno</span>
          <h2 className="featured-title">Coleção Menina & Boneca</h2>
          <p className="featured-subtitle">
            Meninas e bonecas em looks iguais — momentos únicos para guardar para sempre.
          </p>
        </div>

        {/* Grid de Looks Combinando */}
        {looks.length > 0 && (
          <div className="looks-grid">
            {looks.map((product, index) => {
              const isHero = index === 0;
              const isAdding = addingId === product.id;

              return (
                <div
                  key={product.id}
                  className={`look-card ${isHero ? 'look-card-hero' : ''}`}
                >
                  <div className="look-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="look-image"
                      loading="lazy"
                    />
                    {product.description && (
                      <div className="look-overlay">
                        <p>{product.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="look-info">
                    <div className="look-meta">
                      <span className="look-category">Look Combinando</span>
                    </div>
                    <h3 className="look-name">{product.name}</h3>
                    <p className="look-consult">Consulte tamanhos e valores</p>

                    <button
                      className={`look-add-btn ${isAdding ? 'adding' : ''}`}
                      onClick={() => handleAdd(product)}
                      disabled={isAdding}
                    >
                      {isAdding ? '✓ Adicionado à Mala' : 'Adicionar à Mala'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Separador de Bonecas Exclusivas */}
        {bonecas.length > 0 && (
          <>
            <div className="divider-section">
              <span className="divider-icon">🪆</span>
              <h3 className="divider-title">Conheça as Bonecas Exclusivas</h3>
              <div className="divider-line"></div>
            </div>

            {/* Grid de Bonecas */}
            <div className="bonecas-grid">
              {bonecas.map((product) => {
                const isAdding = addingId === product.id;

                return (
                  <div key={product.id} className="boneca-card">
                    <div className="boneca-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="boneca-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="boneca-info">
                      <h4 className="boneca-name">{product.name}</h4>
                      <p className="boneca-size">Tamanho Único</p>
                      <button
                        className={`boneca-add-btn ${isAdding ? 'adding' : ''}`}
                        onClick={() => handleAdd(product)}
                        disabled={isAdding}
                      >
                        {isAdding ? '✓ Na Mala!' : 'Adicionar à Mala'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* CTA Final */}
        <div className="featured-cta">
          <button className="cta-button" onClick={onOpenCart}>
            Ver Minha Mala de Estilo →
          </button>
        </div>
      </div>
    </section>
  );
}
