import React from 'react';
import './Hero.css';

const heroImage = "/assets/hero-highlight.jpg";

export default function Hero() {
  const handleVerColecao = (e) => {
    e.preventDefault();
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('changeCategory', { detail: 'Menina de 1 até 12' }));
  };

  return (
    <section className="hero" id="home">
      <div className="hero-decoration hero-deco-1"></div>
      <div className="hero-decoration hero-deco-2"></div>
      <div className="hero-decoration hero-deco-3"></div>

      <div className="container hero-container">
        <div className="hero-content slide-up">
          <span className="hero-badge">Boutique Infantil</span>
          <h1 className="hero-title">
            A Malinha de <br />
            <span className="hero-title-accent">Estilo Perfeita</span>
          </h1>
          <p className="hero-description">
            Explore nossos departamentos de Meninas, Meninos e linha Baby, com peças selecionadas a dedo. <br/>
            <strong>Lançamento em Destaque:</strong> Os mundos mágicos da Marthiê (Coleção de Inverno).
          </p>
          <div className="hero-actions">
            <a href="#catalog" onClick={handleVerColecao} className="btn-primary hero-btn">
              Ver Coleção
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#how-it-works" className="btn-outline hero-btn-secondary">
              Como Funciona?
            </a>
          </div>
        </div>

        <div className="hero-visual slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-wrapper">
            <img 
              src={heroImage} 
              alt="Villa Bambini - Coleção Inverno" 
              className="hero-featured-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
