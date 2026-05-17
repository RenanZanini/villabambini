# Histórico de Alterações - Villa Bambini (16/05/2026)

Este documento resume as mudanças realizadas hoje no projeto **Villa Bambini Boutique Infantil** e detalha a estrutura técnica para orientar futuras implementações.

---

## 📂 Estrutura do Projeto

O projeto é um e-commerce boutique construído com **React (Vite)** e sincronizado via **Vercel/GitHub**.

### Diretórios Principais:
- `/material`: Pasta raiz de ativos originais enviados pela cliente (fotos de meninos, meninas, bonecas, logos).
- `/site`: Pasta principal do código-fonte (React).
- `/site/public/assets/marthie/`: Pasta onde os ativos processados e renomeados residem para uso em produção.
- `/site/src/components/`: Componentes UI (Header, Hero, ProductCard, Footer, etc).
- `/site/src/data/products.js`: Arquivo de dados (JSON-like) que alimenta o catálogo.

---

## ✅ Alterações Realizadas (16/05/2026)

### 1. UX/UI & Design Premium
- **Hero Section:** Substituição do slideshow por uma **imagem de destaque fixa** (`hero-highlight.jpg`), removendo bordas e molduras para um visual mais limpo e imersivo.
- **Footer:** Remoção temporária do carrossel de logos de parceiros (estavam com baixa qualidade). O rodapé agora está minimalista.
- **Header:** Ajuste na transparência e efeitos de desfoque para evitar bugs visuais durante gravações de tela.

### 2. Catálogo e Categorização
- **Filtros de Departamento:** Atualizados para incluir: *Destaques, Menina de 1 até 12, Menino, Baby* e *Bonecas Exclusivas*.
- **Lógica de Adição à Mala:** Itens da categoria **Menino** agora podem ser adicionados à mala sem seleção prévia de tamanho (aparecem como "A definir" no carrinho), facilitando a consultoria via WhatsApp.
- **Fotos com Bonecas:** Implementação de uma lógica de **Destaque** para priorizar fotos de meninas segurando bonecas (Curadoria Marthiê) no topo do grid.

### 3. Deploy e Infraestrutura (Vercel)
- **Correção de Case Sensitivity:** Renomeação em massa de arquivos no Git (de `menino...` para `Menino...`) para garantir compatibilidade com o servidor Linux do Vercel.
- **GitIgnore Fix:** Removidas regras que ignoravam erroneamente a pasta de fotos de produtos no deploy.

---

## ⚙️ Estratégia de Sincronização do Catálogo

Atualmente, o arquivo `products.js` é gerado automaticamente pelo script Python:
`c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini\site\rebuild_catalog.py`

### Lógica do Script:
1.  **Fonte de Dados:** Lê as pastas `material/meninas`, `material/meninos` e `material/bonecas`.
2.  **Categorização:** Define a categoria baseando-se na **pasta de origem** (evitando erros de identificação por nome de arquivo).
3.  **Highlights:** Se o nome do arquivo contém palavras-chave como *"Capa"* ou *"Conjunto"*, ele é marcado como `highlight: true`.
4.  **Ordenação:** O catálogo é ordenado de forma que todos os `highlights` (fotos principais com bonecas) apareçam **primeiro** no grid, seguidos pelo restante da coleção.
5.  **Geração de Assets:** O script copia as imagens das pastas de `material` para a pasta de produção `site/public/assets/marthie/`, padronizando o case dos nomes.

---

## 🎯 Objetivo para o Próximo Passo
Refinar a estratégia de organização de fotos para garantir que o catálogo seja 100% fiel à curadoria da cliente. Precisamos avaliar se a função de categorização atual é robusta o suficiente ou se deve ser alterada para permitir um controle manual mais fino sobre quais fotos representam cada categoria e por quê.

---
*Gerado em 16 de maio de 2026.*
