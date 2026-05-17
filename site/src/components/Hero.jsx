import React from 'react';
import './Hero.css';

const heroImage = "/assets/hero-highlight.jpg";

export default function Hero() {
  const handleVerColecao = (e) => {
    e.preventDefault();
    document.getElementById('featured-collection').scrollIntoView({ behavior: 'smooth' });
  };

  const handleVerBaby = (e) => {
    e.preventDefault();
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('changeCategory', { detail: 'Baby Menina' }));
  };

  return (
    <section className="hero" id="home">
      <div className="hero-decoration hero-deco-1"></div>
      <div className="hero-decoration hero-deco-2"></div>
      <div className="hero-decoration hero-deco-3"></div>

      <div className="container hero-container">
        {/* Lado Esquerdo: Conteúdo Editorial e Título Principal */}
        <div className="hero-content slide-up">
          <span className="hero-badge">✦ Lançamento de Inverno</span>
          <h1 className="hero-title">
            Coleção <br />
            <span className="hero-title-accent">Menina & Boneca</span>
          </h1>
          <p className="hero-description">
            Descubra a magia do nosso lançamento de inverno. Looks idênticos para meninas e suas bonecas, confeccionados com a delicadeza e o carinho da curadoria Marthiê.
          </p>
          <div className="hero-actions">
            <a href="#featured-collection" onClick={handleVerColecao} className="btn-primary hero-btn">
              Ver Looks da Coleção
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#catalog" onClick={handleVerBaby} className="btn-outline hero-btn-secondary">
              Conhecer Linha Baby
            </a>
          </div>
        </div>

        {/* Lado Direito: Imagem Destaque Site sem Bordas */}
        <div className="hero-visual slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-wrapper">
            <img 
              src={heroImage} 
              alt="Villa Bambini - Destaque Coleção Menina & Boneca" 
              className="hero-featured-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
