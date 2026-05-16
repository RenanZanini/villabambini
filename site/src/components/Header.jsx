import React from 'react';
import './Header.css';

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="header glass-panel" id="header">
      <div className="container header-container">
        <a href="#home" className="logo">
          <img src="/assets/logo.jpeg" alt="Villa Bambini" className="logo-img" />
          <span className="logo-text">Villa Bambini</span>
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#home">Início</a>
          <a href="#how-it-works">Como Funciona</a>
          <a href="#catalog">Coleção</a>
        </nav>

        <button
          className="cart-btn"
          onClick={onOpenCart}
          aria-label={`Abrir provador com ${cartCount} peças`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && (
            <span className="cart-badge" key={cartCount}>{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
