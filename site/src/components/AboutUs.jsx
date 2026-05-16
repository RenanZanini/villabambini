import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-col slide-up">
            <div className="about-image-wrapper">
              <img src="/assets/logo.jpeg" alt="La Villa Bambini" className="about-img" />
            </div>
          </div>

          <div className="about-content slide-up" style={{ animationDelay: '0.15s' }}>
            <span className="section-label">A Marca</span>
            <h2>Boutique Villa Bambini</h2>

            <p className="about-text">
              Acreditamos que a moda infantil vai além do vestir. A Villa Bambini traz 
              a suavidade das estampas, a modernidade de recortes e a doçura de detalhes encantadores 
              que parecem abraçar a pele da criança. Qualidade que se sente no olhar e se confirma pelo toque.
            </p>

            <p className="about-text">
              Nosso conceito é criar memórias mágicas através de peças coordenadas e selecionadas 
              para momentos especiais em família, fortalecendo laços e encantando por onde passam.
            </p>

            <p className="about-signature">Descubra a Coleção de Inverno!</p>

            <div className="about-highlights">
              <div className="highlight-item">
                <strong>Bonecas Exclusivas</strong>
                <span>Colecionáveis</span>
              </div>
              <div className="highlight-item">
                <strong>Coleção Inverno</strong>
                <span>Peças Selecionadas</span>
              </div>
              <div className="highlight-item">
                <strong>Terraville</strong>
                <span>Belem Novo, Porto Alegre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
