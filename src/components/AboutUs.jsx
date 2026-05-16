import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-col slide-up">
            <div className="about-image-wrapper">
              <img src="/assets/logo.jpg" alt="La Villa Bambini" className="about-img" />
            </div>
          </div>

          <div className="about-content slide-up" style={{ animationDelay: '0.15s' }}>
            <span className="section-label">Quem Somos</span>
            <h2>La Villa Bambini</h2>

            <p className="about-text">
              Trabalhamos exclusivamente com lojistas que possuam CNPJ ativo,
              cuja atividade principal seja no ramo de vestuario. Atendemos apenas
              estabelecimentos com loja fisica (ponto comercial) ou loja online
              estruturada em site proprio. Nao consideramos perfis de Instagram
              ou Facebook como loja virtual.
            </p>

            <p className="about-text">

            </p>

            <p className="about-signature">Desejamos muito sucesso!</p>

            <div className="about-highlights">
              <div className="highlight-item">
                <strong>CNPJ 65.669.336/0001-97</strong>
                <span>Requisito para parceria</span>
              </div>
              <div className="highlight-item">
                <strong>Loja Fisica ou Site</strong>
                <span>Estrutura propria</span>
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
