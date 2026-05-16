import os
import json
import shutil

base_path = r"c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini"
material_path = os.path.join(base_path, "material")
assets_path = os.path.join(base_path, "site", "public", "assets", "marthie")
products_file = os.path.join(base_path, "site", "src", "data", "products.js")

# Configurações de Categorias e Pastas
folders = {
    "Menina de 1 até 12": os.path.join(material_path, "meninas"),
    "Menino": os.path.join(material_path, "meninos"),
    "Bonecas exclusivas": os.path.join(material_path, "BONECAS-20260516T044646Z-3-001", "BONECAS")
}

# Destaques específicos (Meninas com Bonecas)
highlight_files = [
    "Capa",
    "Menina conjunto 1",
    "Menina conjunto 3",
    "Menina conjunto 6",
    "Menina vestido 2",
    "Menina vestido rosa"
]

new_products = []
next_id = 1

sizes_menina = ["2", "4", "6", "8", "10", "12"]
sizes_baby = ["0-3m", "3-6m", "6-9m", "9-12m"]

# Garantir que a pasta de assets existe e está limpa (opcional, mas seguro)
if not os.path.exists(assets_path):
    os.makedirs(assets_path)

for category, folder_path in folders.items():
    if not os.path.exists(folder_path):
        print(f"Aviso: Pasta não encontrada: {folder_path}")
        continue
        
    files = os.listdir(folder_path)
    for f in files:
        if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
            
        # Determinar nome e se é Baby
        name = f.split('.')[0]
        f_lower = f.lower()
        
        current_category = category
        current_sizes = sizes_menina
        
        if "baby" in f_lower or "beb" in f_lower:
            current_category = "Baby"
            current_sizes = sizes_baby
        elif category == "Menino":
            current_sizes = []
        elif category == "Bonecas exclusivas":
            current_sizes = ["Único"]

        is_highlight = name in highlight_files
        
        # Copiar para assets com o nome correto (Garantindo Uppercase no início)
        dest_name = name[0].upper() + name[1:] if len(name) > 0 else name
        dest_filename = f"{dest_name}{os.path.splitext(f)[1].lower()}"
        shutil.copy2(os.path.join(folder_path, f), os.path.join(assets_path, dest_filename))

        new_products.append({
            "id": next_id,
            "name": dest_name,
            "category": current_category,
            "image": f"/assets/marthie/{dest_filename}",
            "hoverImage": None,
            "price": 0,
            "description": "Peça exclusiva Villa Bambini.",
            "sizes": current_sizes,
            "highlight": is_highlight
        })
        next_id += 1

# ORDENAÇÃO: Destaques primeiro, depois o resto
new_products.sort(key=lambda p: (not p['highlight'], p['category'], p['name']))

# Corrigir IDs após ordenação
for i, p in enumerate(new_products):
    p['id'] = i + 1

with open(products_file, 'w', encoding='utf-8') as f:
    f.write("export default " + json.dumps(new_products, indent=2, ensure_ascii=False) + ";")

print(f"Catálogo reconstruído com {len(new_products)} itens. {sum(1 for p in new_products if p['highlight'])} destaques movidos para o topo.")
