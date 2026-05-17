// ═══════════════════════════════════════════════════════════════
// PATCH PARA Product.jsx — aplicar manualmente
// Renan: localize cada bloco "ANTES" e substitua pelo "DEPOIS"
// ═══════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────
// PATCH 1 — Ocultar "Bonecas exclusivas" das tabs do catálogo geral
// (porque bonecas agora vivem na FeaturedCollection)
//
// ANTES (dentro de ProductGrid, onde as categorias são montadas):
//
//   const categories = ['Todos', ...new Set(products.map(p => p.category))];
//
// DEPOIS:
//
const categories = [
  'Todos',
  ...new Set(
    products
      .map(p => p.category)
      .filter(cat => cat !== 'Bonecas exclusivas') // removido da tab
  ),
];

// ──────────────────────────────────────────────────────────────
// PATCH 2 — Menino: trocar size chips por aviso "Consultar"
//
// ANTES (dentro do ProductCard, onde os tamanhos são renderizados):
//
//   <div className="size-selector">
//     {product.sizes.map(size => (
//       <button key={size} ... >{size}</button>
//     ))}
//   </div>
//
// DEPOIS (substitua TODA a div size-selector por isso):
//
const SizeSection = ({ product, selectedSize, onSelect }) => {
  if (product.sizes.length === 0) {
    // Menino — sem chips, só aviso consultivo
    return (
      <p className="consult-sizes-msg">
        Consulte tamanhos e valores pelo WhatsApp
      </p>
    );
  }
  return (
    <div className="size-selector">
      {product.sizes.map(size => (
        <button
          key={size}
          className={`size-chip ${selectedSize === size ? 'active' : ''}`}
          onClick={() => onSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// PATCH 3 — Menino: permitir adicionar sem escolher tamanho
//
// ANTES (lógica do botão "Adicionar"):
//
//   const canAdd = !!selectedSize;
//
// DEPOIS:
//
const canAdd = product.sizes.length === 0 || !!selectedSize;

// ANTES (no handleAdd ou similar):
//
//   onAdd({ ...product, selectedSize });
//
// DEPOIS:
//
const finalSize = product.sizes.length === 0 ? 'Consultar' : selectedSize;
onAdd({ ...product, selectedSize: finalSize });
