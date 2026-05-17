import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AboutUs from './components/AboutUs';
import FeaturedCollection from './components/FeaturedCollection';
import { ProductGrid } from './components/Product';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import products from './data/products';
import './index.css';

const WHATSAPP_NUMBER = '555193732396';
const GOOGLE_SHEET_URL = '';

// ── Separar coleção principal do catálogo geral ───────────────────────────────
const featuredProducts = products.filter(p => p.collection === 'menina-boneca');
const catalogProducts  = products.filter(p => p.collection !== 'menina-boneca');

function App() {
  const [cart, setCart]           = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast]         = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
    showToast(product.name + ' (' + product.selectedSize + ') adicionado!');
  }, [showToast]);

  const handleRemoveFromCart = useCallback((indexToRemove) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  const saveToSheet = async (formData, items, total) => {
    if (!GOOGLE_SHEET_URL) return;
    try {
      const payload = {
        timestamp:    new Date().toLocaleString('pt-BR'),
        nome:         formData.name,
        nome_crianca: formData.childName,
        endereco:     formData.apt,
        pecas:        items.map(i => i.name + ' (Tam. ' + i.selectedSize + ')').join(', '),
        quantidade:   items.length,
        total:        'R$ ' + total.toFixed(2),
        status:       'Novo',
      };
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Falha ao salvar na planilha:', err);
    }
  };

  const handleCheckout = useCallback((formData) => {
    let message = 'Ola La Villa Bambini!\n\n';
    message += 'Gostaria de solicitar uma *Mala de Estilo*.\n\n';
    message += '*Meus Dados:*\n';
    message += 'Nome: ' + formData.name + '\n';
    if (formData.childName) message += 'Crianca: ' + formData.childName + '\n';
    message += 'Endereco (Vila/Casa): ' + formData.apt + '\n\n';
    message += '*Pecas Selecionadas:*\n';
    cart.forEach((item, index) => {
      message += (index + 1) + '. ' + item.name + ' - Tam. ' + item.selectedSize + '\n';
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += '\n*Qtd. de pecas:* ' + cart.length;
    message += '\n\nAguardo confirmacao para entrega!';
    saveToSheet(formData, cart, total);
    const encodedMessage = encodeURIComponent(message);
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage, '_blank');
    setCart([]);
    showToast('Mala solicitada com sucesso!');
  }, [cart, showToast]);

  return (
    <>
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero />
        <HowItWorks />

        {/* 1. COLEÇÃO PRINCIPAL — Menina Boneca (destaque editorial) */}
        <FeaturedCollection
          products={featuredProducts}
          onAdd={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 2. CATÁLOGO GERAL — Menino, Menina, Baby (sem Bonecas exclusivas) */}
        <ProductGrid
          products={catalogProducts}
          onAdd={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <AboutUs />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* WhatsApp FAB */}
      <a
        href={'https://wa.me/' + WHATSAPP_NUMBER}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.82.736 5.573 2.137 7.998L.072 32l8.203-2.148A15.932 15.932 0 0016.004 32C24.838 32 32 24.837 32 16.001 32 7.163 24.838 0 16.004 0zm0 29.327a13.28 13.28 0 01-7.176-2.092l-.514-.305-5.328 1.397 1.422-5.196-.335-.531a13.227 13.227 0 01-2.032-7.098c0-7.355 5.988-13.342 13.344-13.342 7.357 0 13.345 5.987 13.345 13.342 0 7.357-5.988 13.345-13.345 13.345l.619-.52zm7.321-9.993c-.399-.2-2.365-1.168-2.732-1.301-.367-.134-.634-.2-.901.2-.267.399-1.034 1.301-1.268 1.568-.234.267-.467.3-.866.1-.4-.2-1.687-.622-3.214-1.984-1.188-1.06-1.99-2.37-2.223-2.77-.234-.399-.025-.614.175-.813.18-.18.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.901-2.172-1.234-2.973-.325-.781-.655-.675-.901-.688l-.767-.012c-.267 0-.7.1-1.067.5-.367.4-1.401 1.369-1.401 3.339s1.434 3.871 1.634 4.138c.2.267 2.822 4.31 6.838 6.043.955.412 1.7.658 2.281.843.958.305 1.831.262 2.521.159.769-.115 2.365-.967 2.699-1.901.333-.934.333-1.734.233-1.901-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </a>

      {/* Toast notification */}
      <div className={'toast' + (toast.show ? ' show' : '')}>
        <span>{toast.message}</span>
      </div>
    </>
  );
}

export default App;
