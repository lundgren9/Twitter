# 🏠 Bjerreds Saltsjöbad - Wiki

Välkommen till **dokumentationen** för projektet Bjerreds Saltsjöbad Bildcollage!

Denna Wiki innehåller **9 sidor** med detaljerad information om både programmet och de tekniker som används.

---

## 📚 Wiki-sidor (9 stycken)

### 🖼️ Programfunktionalitet

| Sida | Beskrivning |
|------|-------------|
| [[Bildhantering]] | Hur bildcollaget och rotationen fungerar, CSS Grid, bildpoolen |
| [[localStorage och lagring]] | Hur data sparas i webbläsaren utan backend |
| [[X API och Twitter]] | Hämta bilder från Twitter/X, API-nivåer, CORS, backend-proxy |
| [[Lightbox funktionalitet]] | Fullskärmsvisning av bilder, JavaScript-implementation |

### 🔧 Git och GitHub

| Sida | Beskrivning |
|------|-------------|
| [[Git Grunderna]] | Introduktion till versionshantering, kommandon, arbetsflöde |
| [[Arbetsflöde med branches]] | Feature Branch Workflow, PR, merge-strategi |
| [[Tags och Releases]] | Versionsmarkörer, git tag, GitHub Releases |
| [[GitHub Pages]] | Publicera webbsidor gratis, URL-struktur, begränsningar |

---

## 🔗 Snabblänkar

| Resurs | Beskrivning |
|--------|-------------|
| [🌐 Live Demo](https://lundgren9.github.io/Twitter/) | Kör programmet i webbläsaren |
| [📦 GitHub Repository](https://github.com/lundgren9/Twitter) | Källkod och releases |
| [📋 Releases](https://github.com/lundgren9/Twitter/releases) | Alla versioner |
| [📚 Versionshistorik](https://lundgren9.github.io/Twitter/versioner.html) | Git-guide och äldre versioner |

---

## 🛠️ Tekniken bakom denna Wiki

### Vad är GitHub Wiki?

GitHub Wiki är en **separat dokumentationstjänst** som tillhör varje GitHub-repository. Den är perfekt för:

- 📖 Användardokumentation
- 🔧 Tekniska guider
- 📝 Tutorials och how-tos
- 🗂️ Projektdokumentation

### Varför ligger Wiki i ett eget Git-repository?

GitHub har designat Wiki som ett **separat Git-repository** av flera anledningar:

```
HUVUDREPOSITORY                    WIKI-REPOSITORY
github.com/lundgren9/Twitter       github.com/lundgren9/Twitter.wiki
├── index.html                     ├── Home.md
├── styles.css                     ├── Bildhantering.md
├── javaScript.js                  ├── Git-Grunderna.md
├── wiki/ (lokala kopior)          └── ... (fler .md-filer)
└── v2.5/ (backup)
```

| Anledning | Förklaring |
|-----------|------------|
| **Separation of concerns** | Kod och dokumentation är olika saker med olika livscykler |
| **Enklare redigering** | Wiki kan redigeras direkt på GitHub utan att röra koden |
| **Tillgänglig för alla** | Även icke-programmerare kan bidra till dokumentationen |
| **Egen historik** | Wiki:ns ändringshistorik blandas inte med kodens |
| **Lättare backup** | Dokumentation kan klonas separat |

### Hur man arbetar med Wiki via Git

```bash
# Klona Wiki-repositoryt
git clone https://github.com/lundgren9/Twitter.wiki.git

# Redigera filer lokalt
# ... gör ändringar ...

# Commita och pusha
git add .
git commit -m "Uppdaterar dokumentation"
git push origin master
```

---

## 📁 Jämförelse: Wiki vs Backup-mappar

I detta projekt använder vi **två olika system** för att bevara information:

### 1. Backup-mappar (v1.0/, v2.0/, v2.5/, etc.)

```
/v2.5/
├── index.html      ← Körbar version
├── styles.css      ← Samma som vid release
└── javaScript.js   ← Historisk snapshot
```

**Syfte:** Körbara historiska versioner av programmet

| Egenskap | Backup-mappar |
|----------|---------------|
| **Innehåll** | HTML, CSS, JavaScript (körbar kod) |
| **Plats** | I huvudrepositoryt |
| **Publiceras** | Via GitHub Pages som webbsidor |
| **URL-format** | `lundgren9.github.io/Twitter/v2.5/` |
| **Skapas** | Manuellt vid varje release |
| **Syfte** | Visa/köra äldre versioner |

### 2. GitHub Wiki

```
Twitter.wiki/
├── Home.md             ← Startsida
├── Bildhantering.md    ← Dokumentation
├── Git-Grunderna.md    ← Guide
└── ...                 ← Fler sidor
```

**Syfte:** Dokumentation och guider

| Egenskap | GitHub Wiki |
|----------|-------------|
| **Innehåll** | Markdown (text, bilder, tabeller) |
| **Plats** | Separat repository (.wiki.git) |
| **Publiceras** | Via GitHub Wiki-systemet |
| **URL-format** | `github.com/.../wiki/Sidnamn` |
| **Skapas** | Kontinuerligt uppdaterad |
| **Syfte** | Förklara hur saker fungerar |

### Sammanfattning

| Aspekt | Backup-mappar | Wiki |
|--------|---------------|------|
| **Frågan de svarar på** | "Hur såg programmet ut i v2.0?" | "Hur fungerar bildrotationen?" |
| **Typ av innehåll** | Körbar kod | Dokumentation |
| **Versioneras** | En mapp per version | Kontinuerlig |
| **Git-repository** | Samma som koden | Separat |

---

## 🔄 Versioner

| Version | Datum | Nyheter |
|---------|-------|---------|
| [v2.5](https://github.com/lundgren9/Twitter/releases/tag/v2.5) | 2026-01-04 | GitHub Wiki, Feature Branch Workflow |
| [v2.4](https://github.com/lundgren9/Twitter/releases/tag/v2.4) | 2026-01-04 | versioner.html, Git-guide |
| [v2.2](https://github.com/lundgren9/Twitter/releases/tag/v2.2) | 2026-01-04 | Versionsbadge, GitHub API |
| [v2.0](https://github.com/lundgren9/Twitter/releases/tag/v2.0) | 2026-01-04 | Lightbox, 16 bilder |
| [v1.0](https://github.com/lundgren9/Twitter/releases/tag/Release) | 2026-01-03 | Första release |

---

## 📚 Externa resurser

### Git och GitHub
- [Pro Git Book](https://git-scm.com/book/en/v2) - Officiell Git-dokumentation
- [GitHub Docs](https://docs.github.com) - GitHub's dokumentation
- [GitHub Wiki Documentation](https://docs.github.com/en/communities/documenting-your-project-with-wikis) - Om Wiki

### Videoresurser
- [How Git Works: Explained in 4 Minutes](https://www.youtube.com/watch?v=e9lnsKot_SQ) - ByteByteGo
- [Git and GitHub Tutorial for Beginners](https://youtu.be/tRZGeaHPoaw) - Kevin Stratvert

---

## 👤 Kontakt

**Kent Lundgren**  
🌐 [kentlundgren.se](https://www.kentlundgren.se)  
🐦 [@kentlundgren](https://x.com/kentlundgren)
