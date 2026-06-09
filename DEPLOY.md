# Vesta Living merkvoorstel — deploy & custom domain

Statische site (geen build). Wordt gehost op **GitHub Pages** met custom domein
**vestaliving.mooibekeken.nl**.

## 0. Logo toevoegen (eenmalig)
Zet het Mooi Bekeken-logo als PNG in:

```
assets/logo-mooi-bekeken.png
```

(transparante PNG, breedte ~600–800px). Het verschijnt in de zijbalk onder “Voorstel door”.

## 1. GitHub-repo aanmaken en pushen
De repo is lokaal al aangemaakt en gecommit op branch `main`.

1. Maak op github.com een **lege** repo aan met de naam `vesta-living` (Private aanbevolen).
2. Koppel en push (vervang `JOUW-USERNAME`):

```bash
cd "Vesta Living/vesta-voorstel"
git remote add origin https://github.com/JOUW-USERNAME/vesta-living.git
git push -u origin main
```

> Heb je de GitHub CLI? Dan in één keer:
> `gh repo create vesta-living --private --source=. --push`

## 2. GitHub Pages aanzetten
Repo → **Settings → Pages**:
- **Source:** Deploy from a branch
- **Branch:** `main` / `/ (root)` → Save

Het `CNAME`-bestand zet het custom domein automatisch goed.

## 3. DNS instellen (bij de DNS-provider van mooibekeken.nl)
Voeg één record toe:

| Type  | Naam (host)   | Waarde / doel              | TTL   |
|-------|---------------|----------------------------|-------|
| CNAME | `vestaliving` | `JOUW-USERNAME.github.io.` | 3600  |

(Alleen de subdomein-host `vestaliving` invullen, niet de hele domeinnaam.)

## 4. Afronden
- Settings → Pages → **Custom domain** = `vestaliving.mooibekeken.nl` (staat er al via CNAME-bestand).
- Wacht tot DNS gepropageerd is (minuten–uur) en vink **Enforce HTTPS** aan.

## Indexering
`robots.txt` weigert alle zoekmachines én AI-crawlers, en elke pagina heeft
`<meta name="robots" content="noindex, …">`. De site is dus bereikbaar via de URL,
maar wordt niet geïndexeerd.
