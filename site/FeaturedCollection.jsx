import React, { useState } from 'react';
import './FeaturedCollection.css';

/**
 * FeaturedCollection
 * Exibe a coleção "Menina Boneca" em formato editorial/premium.
 * Recebe os produtos já filtrados (collection === 'menina-boneca').
 *
 * Props:
 *   products     — array de produtos da coleção
 *   onAdd        — fn(product) chamada ao montar a mala
 *   onOpenCart   — fn() abre o carrinho
 */
export default function FeaturedCollection({ products, onAdd, onOpenCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});   // id → tamanho escolhido
  const [adding, setAdding]               = useState(null);  // id sendo animado

  if (!products || products.length === 0) return null;

  const handleSelectSize = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product) => {
    const size = selectedSizes[product.id];
    if (!size && product.sizes.length > 0) return;
    setAdding(product.id);
    setTimeout(() => setAdding(null), 900);
    onAdd({ ...product, selectedSize: size || 'Único' });
  };

  return (
    <section className="featured-collection" id="colecao-menina-boneca">
      {/* ── Cabeçalho editorial ── */}
      <div className="container">
        <div className="fc-header">
          <span className="fc-badge">✦ Lançamento de Inverno</span>
          <h2 className="fc-title">
            Coleção <em>Menina Boneca</em>
          </h2>
          <p className="fc-subtitle">
            Meninas e bonecas em looks iguais — momentos únicos para guardar para sempre.
          </p>
        </div>

        {/* ── Grid editorial ── */}
        <div className="fc-grid">
          {products.map((product, index) => {
            const selectedSize = selectedSizes[product.id];
            const isBoneca     = product.category === 'Bonecas exclusivas';
            const isAdding     = adding === product.id;
            const canAdd       = product.sizes.length === 0 || !!selectedSize;

            return (
              <div
                key={product.id}
                className={`fc-card ${isBoneca ? 'fc-card--boneca' : ''} ${index === 0 ? 'fc-card--hero' : ''}`}
              >
                {/* Imagem */}
                <div className="fc-card-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                  {isBoneca && (
                    <span className="fc-tag-boneca">🎀 Boneca</span>
                  )}
                  {product.highlight && !isBoneca && (
                    <span className="fc-tag-destaque">✦ Destaque</span>
                  )}
                </div>

                {/* Info */}
                <div className="fc-card-info">
                  <p className="fc-card-category">
                    {isBoneca ? 'Boneca Exclusiva' : 'Menina · Inverno 2026'}
                  </p>
                  <h3 className="fc-card-name">{product.name}</h3>

                  {/* Tamanhos */}
                  {product.sizes.length > 0 && (
                    <div className="fc-sizes">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          className={`fc-size-chip ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => handleSelectSize(product.id, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Botão */}
                  <button
                    className={`fc-add-btn ${!canAdd ? 'disabled' : ''} ${isAdding ? 'adding' : ''}`}
                    onClick={() => handleAdd(product)}
                    disabled={!canAdd}
                  >
                    {isAdding
                      ? '✓ Adicionado!'
                      : !canAdd
                        ? 'Escolha um tamanho'
                        : '+ Adicionar à Mala'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="fc-cta">
          <button className="btn-outline fc-cta-btn" onClick={onOpenCart}>
            Ver Mala de Estilo →
          </button>
        </div>
      </div>
    </section>
  );
}
