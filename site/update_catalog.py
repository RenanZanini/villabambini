import os
import json

base_path = r"c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini\site"
assets_path = os.path.join(base_path, "public", "assets", "marthie")
products_file = os.path.join(base_path, "src", "data", "products.js")

# Carregar produtos atuais
with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()
    # Limpar a exportação para carregar como JSON
    json_str = content.replace("export default ", "").strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1]
    products = json.loads(json_str)

# Atualizar categorias e tamanhos existentes
for p in products:
    if p["category"] == "Menina de 1 até 14":
        p["category"] = "Menina de 1 até 12"
        if "14" in p["sizes"]:
            p["sizes"].remove("14")

# Identificar imagens já cadastradas
existing_images = set()
for p in products:
    existing_images.add(p["image"])
    if p.get("hoverImage"):
        existing_images.add(p["hoverImage"])

# Listar arquivos na pasta de assets
files = os.listdir(assets_path)
files.sort()

next_id = max(p["id"] for p in products) + 1

new_products = []

# Processar novos arquivos
for f in files:
    img_path = f"/assets/marthie/{f}"
    if img_path in existing_images:
        continue
    
    # Ignorar arquivos que não são imagens
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue

    # Determinar categoria
    category = "Menina de 1 até 12"
    sizes = ["2", "4", "6", "8", "10", "12"]
    name_prefix = "Conjunto Marthiê"
    
    if "menino" in f.lower() or "meino" in f.lower() or "tonho" in f.lower() or "casacomenino" in f.lower() or "beb" in f.lower():
        category = "Menino"
        sizes = [] # Será exibido como "Consulte valores e tamanhos"
        name_prefix = "Moda Masculina"
    elif "menina" in f.lower():
        category = "Menina de 1 até 12"
        name_prefix = "Conjunto Marthiê"

    # Criar novo produto
    new_products.append({
        "id": next_id,
        "name": f"{name_prefix} {f.split('.')[0]}",
        "category": category,
        "image": img_path,
        "hoverImage": None,
        "price": 0,
        "description": "Peça exclusiva da Villa Bambini.",
        "sizes": sizes,
        "highlight": False
    })
    next_id += 1

products.extend(new_products)

# Salvar de volta
with open(products_file, 'w', encoding='utf-8') as f:
    f.write("export default " + json.dumps(products, indent=2, ensure_ascii=False) + ";")

print(f"Catálogo atualizado. {len(new_products)} novos produtos adicionados.")
