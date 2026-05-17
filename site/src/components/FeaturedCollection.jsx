import React, { useState, useEffect } from 'react';
import './FeaturedCollection.css';

export default function FeaturedCollection({ products, onAdd, onOpenCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addingId, setAddingId] = useState(null);

  // Filtrar apenas looks combinando (divulgação)
  const looks = products.filter(p => p.collection === 'menina-boneca' && p.category !== 'Boneca');

  useEffect(() => {
    if (looks.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % looks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [looks.length]);

  if (looks.length === 0) return null;

  const currentSlide = looks[currentIndex];
  const selectedSize = selectedSizes[currentIndex] || null;
  const isAdding = addingId === (currentSlide ? currentSlide.id : null);

  const handleSelectSize = (size) => {
    setSelectedSizes(prev => ({ ...prev, [currentIndex]: size }));
  };

  const handleConsult = (product, size) => {
    let message = `Olá! Gostaria de consultar sobre o look *${product.name}*`;
    if (size) {
      message += ` no tamanho *${size}*`;
    }
    message += `.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/555193732396?text=${encodedMessage}`, '_blank');
  };

  const handleAddSlide = () => {
    if (!currentSlide || !selectedSize) return;
    setAddingId(currentSlide.id);
    onAdd({ ...currentSlide, selectedSize });
    setTimeout(() => {
      setAddingId(null);
    }, 600);
  };

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

        {/* Slideshow Editorial de Looks Combinando */}
        {looks.length > 0 && currentSlide && (
          <div className="featured-slideshow-container slide-up">
            
            {/* Lado Esquerdo: Foto Grande do Modelo Real */}
            <div className="featured-large-visual">
              <div className="featured-large-image-wrapper">
                {looks.map((slide, index) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.name}
                    className={`featured-large-img ${index === currentIndex ? 'active' : ''}`}
                    loading="lazy"
                  />
                ))}
                
                {/* Dots de navegação */}
                <div className="featured-slide-dots">
                  {looks.map((_, index) => (
                    <button
                      key={index}
                      className={`featured-dot-btn ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Lado Direito: Card Editorial do Look Selecionado */}
            <div className="featured-product-box">
              <span className="featured-box-badge">✦ Look Combinando</span>
              <h3 className="featured-box-title">{currentSlide.name}</h3>
              <p className="featured-box-description">
                Uma combinação perfeita para criar memórias afetivas únicas. Looks idênticos para a menina e sua boneca Villa Bambini.
              </p>

              <div className="featured-product-preview-container">
                {/* Foto Menor de Detalhes da Peça */}
                {currentSlide.hoverImage && (
                  <div className="featured-small-preview">
                    <img
                      src={currentSlide.hoverImage}
                      alt={`${currentSlide.name} detalhes`}
                      className="featured-small-img"
                    />
                    <span className="featured-preview-label">Ver Detalhes</span>
                  </div>
                )}

                {/* Seletor de Tamanhos (2 a 12 anos) */}
                <div className="featured-size-selection">
                  <span className="featured-size-label">Escolha o Tamanho:</span>
                  <div className="featured-size-chips">
                    {currentSlide.sizes.map(size => (
                      <button
                        key={size}
                        className={`featured-size-chip ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => handleSelectSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs de Ação */}
              <div className="featured-box-actions">
                <button
                  className="featured-consult-btn"
                  onClick={() => handleConsult(currentSlide, selectedSize)}
                >
                  Consulte Valores
                </button>
                <button
                  className={`featured-add-btn ${isAdding ? 'adding' : ''} ${!selectedSize ? 'disabled' : ''}`}
                  onClick={handleAddSlide}
                  disabled={!selectedSize}
                >
                  {isAdding ? '✓ Na Mala!' : selectedSize ? 'Adicionar à Mala' : 'Selecione o tamanho'}
                </button>
              </div>
            </div>

          </div>
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
