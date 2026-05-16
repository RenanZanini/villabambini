import os
import json

base_path = r"c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini\site"
assets_path = os.path.join(base_path, "public", "assets", "marthie")
products_file = os.path.join(base_path, "src", "data", "products.js")

# Carregar produtos atuais
with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()
    json_str = content.replace("export default ", "").strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1]
    current_products = json.loads(json_str)

# Destaques específicos (Fotos de meninas com bonecas)
highlight_files = [
    "Capa",
    "Menina conjunto 1",
    "Menina conjunto 3",
    "Menina conjunto 6",
    "Menina vestido 2",
    "Menina vestido rosa"
]

files = os.listdir(assets_path)
files.sort()

new_products = []
next_id = 1

sizes_menina = ["2", "4", "6", "8", "10", "12"]
sizes_baby = ["0-3m", "3-6m", "6-9m", "9-12m"]

for f in files:
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    
    img_path = f"/assets/marthie/{f}"
    name = f.split('.')[0]
    
    category = "Menina de 1 até 12"
    sizes = sizes_menina
    
    f_lower = f.lower()
    if "menino" in f_lower:
        category = "Menino"
        sizes = []
    elif "baby" in f_lower or "beb" in f_lower:
        category = "Baby"
        sizes = sizes_baby
    elif "lm" in f_lower:
        category = "Bonecas exclusivas"
        sizes = ["Único"]

    # Definir se é destaque
    is_highlight = name in highlight_files
    
    new_products.append({
        "id": next_id,
        "name": name,
        "category": category,
        "image": img_path,
        "hoverImage": None,
        "price": 0,
        "description": "Peça exclusiva Villa Bambini.",
        "sizes": sizes,
        "highlight": is_highlight
    })
    next_id += 1

with open(products_file, 'w', encoding='utf-8') as f:
    f.write("export default " + json.dumps(new_products, indent=2, ensure_ascii=False) + ";")

print(f"Catálogo reconstruído com {len(new_products)} itens. {sum(1 for p in new_products if p['highlight'])} destaques definidos.")
