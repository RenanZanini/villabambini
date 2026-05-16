import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo.jpg" alt="Villa Bambini" className="footer-logo" />
            <p className="footer-tagline">
              Villa Bambini Boutique Infantil
            </p>
            <p className="footer-description">
              Uma curadoria de estilo pensada com carinho para os moradores do Terraville, 
              mas sempre de portas abertas para levar nossa magia a todos os cantos através de encomendas.
            </p>
            <p className="footer-legal">CNPJ: 00.000.000/0001-00</p>
          </div>

          <div className="footer-links">
            <h4>Navegação</h4>
            <a href="#home">Início</a>
            <a href="#how-it-works">Como Funciona</a>
            <a href="#catalog">Coleção</a>
          </div>

          <div className="footer-contact">
            <h4>Redes Sociais</h4>
            <a 
              href="https://www.instagram.com/lavillabambini/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @lavillabambini
            </a>
          </div>

          <div className="footer-info">
            <h4>Localização</h4>
            <p>Condomínio Terraville</p>
            <p>Av. Juca Batista, 8000</p>
            <p>Belém Novo, Porto Alegre - RS</p>
            <a 
              href="https://terraville.com.br/pt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              style={{marginTop: '8px'}}
            >
              terraville.com.br
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Villa Bambini. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
