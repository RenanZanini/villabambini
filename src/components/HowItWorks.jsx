import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Escolha no Catálogo',
    description: 'Navegue pelas peças e monte sua mala com as que mais gostar.',
  },
  {
    number: '02',
    title: 'Montamos sua Mala',
    description: 'Preparamos uma seleção exclusiva com tudo que você escolheu.',
  },
  {
    number: '03',
    title: 'Entrega no Condomínio',
    description: 'Levamos a mala até a sua porta. Experimente nos pequenos com calma.',
  },
  {
    number: '04',
    title: 'Confirme pelo WhatsApp',
    description: 'Fique com o que amou e devolvemos o restante. Simples assim.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header slide-up">
          <span className="section-label">Simples e Prático</span>
          <h2>Como Funciona</h2>
          <p>Sua mala de estilo em 4 passos</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="step-number-circle">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
