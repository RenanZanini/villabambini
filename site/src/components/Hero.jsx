import React, { useState, useEffect } from 'react';
import './Hero.css';

const heroImages = [
  '/assets/marthie/Capa.jpg',
  '/assets/marthie/MA0477 01.jpg',
  '/assets/marthie/MA0481 01.jpg',
  '/assets/marthie/MA0485 01.jpg',
  '/assets/marthie/MA0491 01.jpg'
];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleVerColecao = (e) => {
    e.preventDefault();
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('changeCategory', { detail: 'Menina de 1 até 14' }));
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
              key={currentImg}
              src={heroImages[currentImg]} 
              alt="La Villa Bambini - Coleção Inverno" 
              className="hero-featured-img fade-transition" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
