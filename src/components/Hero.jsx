import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-decoration hero-deco-1"></div>
      <div className="hero-decoration hero-deco-2"></div>
      <div className="hero-decoration hero-deco-3"></div>

      <div className="container hero-container">
        <div className="hero-content slide-up">
          <span className="hero-badge">Lançamento Exclusivo</span>
          <h1 className="hero-title">
            Tal Menina <br />
            <span className="hero-title-accent">Tal Boneca</span>
          </h1>
          <p className="hero-description">
            Descubra a nova Coleção de Inverno. Escolha as peças favoritas e monte sua malinha. 
            Nossas bonecas exclusivas vestem o mesmo look que as meninas!
          </p>
          <div className="hero-actions">
            <a href="#catalog" className="btn-primary hero-btn">
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
            <img src="/assets/golf_theme.png" alt="La Villa Bambini - Kids Golf Theme" className="hero-featured-img" />
          </div>
          <div className="hero-stat hero-stat-1">
            <span className="stat-text">RN a 14 anos</span>
          </div>
          <div className="hero-stat hero-stat-2">
            <span className="stat-text">Entrega no condomínio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
