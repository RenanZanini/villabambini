import React, { useState, useEffect } from 'react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', childName: '', apt: '' });

  // Reset states when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsCheckout(false);
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.apt) {
      onCheckout(formData);
      setIsSuccess(true);
      // Data is cleared in App.jsx but we keep local copy for the success message if needed
    }
  };

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <aside 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Seu Provador"
        role="dialog"
      >
        <div className="cart-header">
          <h2>{isCheckout ? 'Finalizar Reserva' : 'Sua Mala'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="success-view slide-up">
            <div className="success-image-container">
              <img src="/assets/owners_golf.png" alt="Carina e Elis" className="success-image" />
            </div>
            <div className="success-content">
              <h3>Quase tudo pronto!</h3>
              <p>
                A sua seleção exclusiva estará a caminho em breve para você provar as peças com toda a calma e conforto no seu lar.
              </p>
              <div className="success-tip">
                <p>Nós abrimos o WhatsApp para você confirmar o pedido. Se a janela não abriu, clique no botão abaixo:</p>
                <button 
                  className="btn-primary full-width" 
                  onClick={() => onCheckout(formData)}
                >
                  Abrir WhatsApp novamente
                </button>
              </div>
            </div>
          </div>
        ) : !isCheckout ? (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--color-text-light)'}}>
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <h3>Sua mala está vazia</h3>
                  <p>Adicione peças do catálogo para montar sua mala.</p>
                  <button className="btn-outline" onClick={onClose}>Ver Coleção</button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span className="cart-item-size">Tam: {item.selectedSize}</span>
                    </div>
                    <button 
                      className="remove-btn" 
                      onClick={() => onRemove(index)}
                      aria-label={`Remover ${item.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total" style={{ display: 'none' }}>
                  {/* Preços ocultos */}
                </div>
                <button className="btn-primary full-width" onClick={() => setIsCheckout(true)}>
                  Montar Mala ({totalItems} {totalItems === 1 ? 'peça' : 'peças'})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="checkout-form-container">
            <div className="checkout-header-info">
              <p className="checkout-instructions">
                Informe seus dados para enviarmos as pecas ate a sua casa.
              </p>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="checkout-name">Seu Nome</label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  placeholder="Ex: Maria Silva"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-child" style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Nome da Criança</span>
                  <span style={{color: 'var(--color-text-light)', fontSize: '0.75rem', fontWeight: 'normal'}}>(Opcional)</span>
                </label>
                <input
                  id="checkout-child"
                  type="text"
                  placeholder="Ex: Joãozinho"
                  value={formData.childName}
                  onChange={e => setFormData({ ...formData, childName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-apt">Vila e Casa</label>
                <input
                  id="checkout-apt"
                  type="text"
                  required
                  placeholder="Ex: Vila das Flores, Casa 12"
                  value={formData.apt}
                  onChange={e => setFormData({ ...formData, apt: e.target.value })}
                />
              </div>
              <div className="checkout-summary">
                <p>{totalItems} {totalItems === 1 ? 'peça' : 'peças'} na mala</p>
              </div>
              <div className="checkout-actions">
                <button type="button" className="btn-outline" onClick={() => setIsCheckout(false)}>
                  Voltar
                </button>
                <button type="submit" className="btn-primary">
                  Enviar via WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}
