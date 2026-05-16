import os
import json

base_path = r"c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini\site"
assets_path = os.path.join(base_path, "public", "assets", "marthie")
products_file = os.path.join(base_path, "src", "data", "products.js")

# Carregar produtos atuais para preservar as Bonecas
with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()
    json_str = content.replace("export default ", "").strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1]
    current_products = json.loads(json_str)

# Manter apenas as bonecas
bonecas = [p for p in current_products if p["category"] == "Bonecas exclusivas"]

# Listar arquivos na pasta de assets
files = os.listdir(assets_path)
files.sort()

new_products = []
next_id = 1

# Tamanhos padrão
sizes_menina = ["2", "4", "6", "8", "10", "12"]
sizes_baby = ["0-3m", "3-6m", "6-9m", "9-12m"]

for f in files:
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    
    # Ignorar as imagens das bonecas que já estão no catálogo (evitar duplicar)
    if any(p["image"].split('/')[-1] == f for p in bonecas):
        continue
    
    img_path = f"/assets/marthie/{f}"
    name = f.split('.')[0]
    
    category = "Menina de 1 até 12"
    sizes = sizes_menina
    
    f_lower = f.lower()
    if "menino" in f_lower or "tonho" in f_lower:
        category = "Menino"
        sizes = [] # Consulte valores
    elif "baby" in f_lower or "beb" in f_lower:
        category = "Baby"
        sizes = sizes_baby
    elif "casaco" in f_lower:
        category = "Menina de 1 até 12"
        sizes = sizes_menina
        
    new_products.append({
        "id": next_id,
        "name": name,
        "category": category,
        "image": img_path,
        "hoverImage": None, # Resetar hovers pois nomes mudaram
        "price": 0,
        "description": "Peça exclusiva Villa Bambini.",
        "sizes": sizes,
        "highlight": False
    })
    next_id += 1

# Adicionar bonecas de volta com novos IDs
for b in bonecas:
    b["id"] = next_id
    next_id += 1
    new_products.append(b)

# Salvar
with open(products_file, 'w', encoding='utf-8') as f:
    f.write("export default " + json.dumps(new_products, indent=2, ensure_ascii=False) + ";")

print(f"Catálogo reconstruído com {len(new_products)} itens.")
