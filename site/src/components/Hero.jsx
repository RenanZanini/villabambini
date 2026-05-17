import React, { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero({ products, onAdd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addingId, setAddingId] = useState(null);

  // Filtrar apenas fotos de meninas com bonecas (looks combinando)
  const slides = products.filter(p => p.collection === 'menina-boneca' && p.category !== 'Boneca');

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const selectedSize = selectedSizes[currentIndex] || null;
  const isAdding = addingId === currentSlide.id;

  const handleSelectSize = (size) => {
    setSelectedSizes(prev => ({ ...prev, [currentIndex]: size }));
  };

  const handleConsult = () => {
    let message = `Olá! Gostaria de consultar sobre o look *${currentSlide.name}*`;
    if (selectedSize) {
      message += ` no tamanho *${selectedSize}*`;
    }
    message += `.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/555193732396?text=${encodedMessage}`, '_blank');
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    setAddingId(currentSlide.id);
    onAdd({ ...currentSlide, selectedSize });
    setTimeout(() => {
      setAddingId(null);
    }, 600);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-decoration hero-deco-1"></div>
      <div className="hero-decoration hero-deco-2"></div>

      <div className="container hero-container">
        {/* Lado Esquerdo: Foto Grande da Menina com a Boneca (Slide Ativo) */}
        <div className="hero-large-visual">
          <div className="hero-large-image-wrapper">
            {slides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.name}
                className={`hero-large-img ${index === currentIndex ? 'active' : ''}`}
                loading="lazy"
              />
            ))}
            <div className="hero-slide-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot-btn ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito: Box Editorial de Produto com Detalhes e Compra */}
        <div className="hero-product-box slide-up">
          <span className="hero-box-badge">✦ Coleção Menina & Boneca</span>
          
          <h1 className="hero-box-title">{currentSlide.name}</h1>
          <p className="hero-box-description">
            Looks idênticos para meninas e suas bonecas. Confeccionados com a delicadeza e o carinho da curadoria Marthiê.
          </p>

          <div className="hero-product-preview-container">
            {/* Foto Pequena com Detalhes da Peça */}
            {currentSlide.hoverImage && (
              <div className="hero-small-preview">
                <img
                  src={currentSlide.hoverImage}
                  alt={`${currentSlide.name} detalhes`}
                  className="hero-small-img"
                />
                <span className="hero-preview-label">Ver Detalhes</span>
              </div>
            )}

            {/* Seletor de Tamanhos (2 a 12 anos) */}
            <div className="hero-size-selection">
              <span className="hero-size-label">Selecione o Tamanho:</span>
              <div className="hero-size-chips">
                {currentSlide.sizes.map(size => (
                  <button
                    key={size}
                    className={`hero-size-chip ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => handleSelectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="hero-box-actions">
            <button className="hero-consult-btn" onClick={handleConsult}>
              Consulte Valores
            </button>
            <button
              className={`hero-add-btn ${isAdding ? 'adding' : ''} ${!selectedSize ? 'disabled' : ''}`}
              onClick={handleAdd}
              disabled={!selectedSize}
            >
              {isAdding ? '✓ Na Mala!' : selectedSize ? 'Adicionar à Mala' : 'Selecione o tamanho'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
