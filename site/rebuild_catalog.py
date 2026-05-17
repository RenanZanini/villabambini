"""
rebuild_catalog.py — La Villa Bambini
Reconstrói products.js a partir das 4 pastas de material.

Estrutura esperada em /material:
  meninas/        → categoria "Menina"    (roupas sem boneca)
  meninos/        → categoria "Menino"    (roupas masculinas)
  bonecas/        → categoria "Boneca"    (aparece NO FINAL da coleção hero)
  divulgacao/     → Coleção "Menina Boneca" (fotos das meninas com bonecas iguais)

TODOS os tamanhos são "Consultar" — nenhum chip obrigatório.

Como usar:
  python rebuild_catalog.py              # pede confirmação se já existir
  python rebuild_catalog.py --force      # sobrescreve sem confirmar
  python rebuild_catalog.py --dry-run    # mostra o que faria, sem gravar
"""

import os
import json
import shutil
import argparse
from pathlib import Path

# ── Caminhos — ajuste BASE se necessário ──────────────────────────────────────
BASE       = Path(r"c:\Users\RENAN ZANINI PORTO\Desktop\NEXX_AI\lavillabambini")
MATERIAL   = BASE / "material"
ASSETS_OUT = BASE / "site" / "public" / "assets" / "marthie"
PRODUCTS   = BASE / "site" / "src" / "data" / "products.js"
OVERRIDES  = Path(__file__).parent / "overrides.json"

# ── Mapeamento pasta → metadados ───────────────────────────────────────────────
FOLDER_CONFIG = {
    "divulgacao": {
        "pasta":      MATERIAL / "divulgacao",
        "category":   "Coleção Menina Boneca",
        "collection": "menina-boneca",
        "sortGroup":  1,
        "highlight":  True,
    },
    "bonecas": {
        "pasta":      MATERIAL / "bonecas",
        "category":   "Boneca",
        "collection": "menina-boneca",
        "sortGroup":  2,
        "highlight":  False,
    },
    "meninas": {
        "pasta":      MATERIAL / "meninas",
        "category":   "Menina",
        "collection": None,
        "sortGroup":  0,
        "highlight":  False,
    },
    "meninos": {
        "pasta":      MATERIAL / "meninos",
        "category":   "Menino",
        "collection": None,
        "sortGroup":  0,
        "highlight":  False,
    },
}

# Pasta alternativa para bonecas (nome longo do Google Drive)
BONECAS_ALT = MATERIAL / "BONECAS-20260516T044646Z-3-001" / "BONECAS"
LANCO_ALT   = MATERIAL / "Fotos_lançamento"


def load_overrides() -> dict:
    if not OVERRIDES.exists():
        print(f"[INFO] overrides.json não encontrado.")
        return {}
    with open(OVERRIDES, encoding="utf-8") as f:
        data = json.load(f)
    result = {}
    for entry in data.get("overrides", []):
        if "_comment" in entry or "name" not in entry:
            continue
        result[entry["name"]] = {k: v for k, v in entry.items() if k != "name"}
    print(f"[OK] {len(result)} override(s) carregado(s).")
    return result


def build_products(overrides: dict, dry_run: bool = False) -> list:
    if not dry_run:
        ASSETS_OUT.mkdir(parents=True, exist_ok=True)

    products = []
    next_id  = 1

    for key, cfg in FOLDER_CONFIG.items():
        pasta = cfg["pasta"]

        if key == "divulgacao" and not pasta.exists() and LANCO_ALT.exists():
            pasta = LANCO_ALT
            print(f"[INFO] Usando pasta alternativa para divulgacao: {pasta}")

        if key == "bonecas" and not pasta.exists() and BONECAS_ALT.exists():
            pasta = BONECAS_ALT
            print(f"[INFO] Usando pasta alternativa para bonecas: {pasta}")

        if not pasta.exists():
            print(f"[AVISO] Pasta não encontrada: {pasta}")
            continue

        imgs = [f for f in sorted(pasta.iterdir()) if f.suffix.lower() in {".jpg",".jpeg",".png"}]
        print(f"[{key.upper()}] {len(imgs)} imagens")

        if key == "divulgacao":
            # Group by base prefix (e.g. MA0471)
            groups = {}
            for f in imgs:
                parts = f.stem.split(' ')
                prefix = parts[0]
                if prefix not in groups:
                    groups[prefix] = []
                groups[prefix].append(f)
            
            print(f"  [PAIRED] Agrupados em {len(groups)} conjuntos de produtos")
            
            for prefix, files in sorted(groups.items()):
                # Sort files to ensure 01 is first, 02 is second
                files = sorted(files, key=lambda x: x.name)
                f_main = files[0]
                f_hover = files[1] if len(files) > 1 else None
                
                stem = prefix
                dest_name = f"Look Combinando {stem}"
                
                # Copy main
                dest_file = stem + " 01" + f_main.suffix.lower()
                if not dry_run:
                    shutil.copy2(f_main, ASSETS_OUT / dest_file)
                
                # Copy hover if exists
                hover_file = None
                if f_hover:
                    hover_file = stem + " 02" + f_hover.suffix.lower()
                    if not dry_run:
                        shutil.copy2(f_hover, ASSETS_OUT / hover_file)
                
                product = {
                    "id":          next_id,
                    "name":        dest_name,
                    "category":    cfg["category"],
                    "collection":  cfg["collection"],
                    "sortGroup":   cfg["sortGroup"],
                    "sortOrder":   next_id,
                    "image":       f"/assets/marthie/{dest_file}",
                    "hoverImage":  f"/assets/marthie/{hover_file}" if hover_file else None,
                    "price":       0,
                    "description": "Look combinando menina & boneca Villa Bambini.",
                    "sizes":       ["2", "4", "6", "8", "10", "12"],
                    "highlight":   cfg["highlight"],
                    "hidden":      False,
                }
                
                ov = overrides.get(dest_name, {})
                product.update(ov)

                if product.get("hidden"):
                    print(f"  [OCULTO] {dest_name}")
                    continue

                products.append(product)
                next_id += 1
        else:
            for f in imgs:
                stem      = f.stem
                dest_name = stem[0].upper() + stem[1:] if stem else stem
                dest_file = dest_name + f.suffix.lower()
                dest_path = ASSETS_OUT / dest_file

                if not dry_run:
                    shutil.copy2(f, dest_path)

                category = cfg["category"]
                if "baby" in dest_name.lower():
                    if category == "Menina":
                        category = "Baby Menina"
                    elif category == "Menino":
                        category = "Baby Menino"

                product = {
                    "id":          next_id,
                    "name":        dest_name,
                    "category":    category,
                    "collection":  cfg["collection"],
                    "sortGroup":   cfg["sortGroup"],
                    "sortOrder":   next_id,
                    "image":       f"/assets/marthie/{dest_file}",
                    "hoverImage":  None,
                    "price":       0,
                    "description": "Peça exclusiva La Villa Bambini.",
                    "sizes":       [],
                    "highlight":   cfg["highlight"],
                    "hidden":      False,
                }

                ov = overrides.get(dest_name, {})
                product.update(ov)

                if product.get("hidden"):
                    print(f"  [OCULTO] {dest_name}")
                    continue

                products.append(product)
                next_id += 1

    return products


def sort_products(products: list) -> list:
    CATALOG_ORDER = {
        "Menina": 0,
        "Menino": 1,
        "Baby Menina": 2,
        "Baby Menino": 3
    }

    def key(p):
        if p.get("collection") == "menina-boneca":
            return (0, p.get("sortGroup", 9), p.get("sortOrder", 999), p["name"])
        else:
            return (1, CATALOG_ORDER.get(p["category"], 9), 0, p["name"])

    products.sort(key=key)
    for i, p in enumerate(products):
        p["id"] = i + 1
    return products


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force",   action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if PRODUCTS.exists() and not args.force and not args.dry_run:
        resp = input("products.js já existe. Sobrescrever? [s/N] ").strip().lower()
        if resp != "s":
            print("Cancelado.")
            return

    overrides = load_overrides()
    products  = build_products(overrides, dry_run=args.dry_run)
    products  = sort_products(products)

    n_hero   = sum(1 for p in products if p.get("collection") == "menina-boneca")
    n_menina = sum(1 for p in products if p.get("category") == "Menina")
    n_menino = sum(1 for p in products if p.get("category") == "Menino")

    print(f"\n{'[DRY-RUN] ' if args.dry_run else ''}Resumo:")
    print(f"  Colecao Menina Boneca: {n_hero} pecas")
    print(f"  Menina:  {n_menina} | Menino: {n_menino}")
    print(f"  Total:   {len(products)} produtos")

    if not args.dry_run:
        with open(PRODUCTS, "w", encoding="utf-8") as f:
            f.write("export default " + json.dumps(products, indent=2, ensure_ascii=False) + ";\n")
        print(f"  Gravado em: {PRODUCTS}")


if __name__ == "__main__":
    main()
