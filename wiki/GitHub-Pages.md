# 🌐 GitHub Pages

Denna sida förklarar hur **GitHub Pages** fungerar och hur du kan använda det för att publicera webbsidor gratis.

---

## Vad är GitHub Pages?

**GitHub Pages** är en gratis hosting-tjänst från GitHub som publicerar statiska webbsidor direkt från ett repository.

### Perfekt för:
- 📄 Dokumentation och README-filer
- 🎨 Portfolios och personliga sidor
- 🚀 Demo-sidor för projekt
- 📝 Bloggar (med Jekyll)

---

## Hur aktivera GitHub Pages?

1. Gå till ditt repository på GitHub
2. Klicka **Settings**
3. Scrolla ner till **Pages** i sidomenyn
4. Under **Source**, välj branch (`main`) och mapp (`/ (root)`)
5. Klicka **Save**

Din sida blir tillgänglig på:
```
https://{användarnamn}.github.io/{repository-namn}/
```

**Exempel för detta projekt:**
```
https://lundgren9.github.io/Twitter/
```

---

## URL-struktur

GitHub Pages serverar alla filer i branchen som webbsidor:

| Fil i repository | URL |
|------------------|-----|
| `index.html` | `lundgren9.github.io/Twitter/` |
| `versioner.html` | `lundgren9.github.io/Twitter/versioner.html` |
| `v2.0/index.html` | `lundgren9.github.io/Twitter/v2.0/` |
| `wiki/Home.md` | `lundgren9.github.io/Twitter/wiki/Home.md` |

### Undermappar för äldre versioner

Du kan skapa separata mappar för varje version:

```
repository/
├── index.html          → /
├── styles.css
├── javaScript.js
├── versioner.html      → /versioner.html
├── v1.0/
│   ├── index.html      → /v1.0/
│   ├── styles.css
│   └── javaScript.js
├── v2.0/
│   └── ...             → /v2.0/
└── v2.2/
    └── ...             → /v2.2/
```

---

## Begränsningar

| Egenskap | Gräns |
|----------|-------|
| **Repository-storlek** | 1 GB rekommenderat |
| **Bandbredd** | 100 GB/månad |
| **Byggtid** | 10 minuter max |
| **Filtyper** | Endast statiska filer |

### Vad stöds INTE?

❌ Server-side kod (PHP, Python, Node.js)
❌ Databaser
❌ Dynamiska API:er
❌ Användarautentisering (inbyggd)

---

## GitHub Pages vs Webbhotell

| Egenskap | GitHub Pages | Webbhotell |
|----------|--------------|------------|
| Kostnad | ✅ Gratis | 💰 ~50-200 kr/mån |
| Statiska filer | ✅ Ja | ✅ Ja |
| Server-side | ❌ Nej | ✅ Ja |
| Databas | ❌ Nej | ✅ Ja |
| HTTPS | ✅ Automatiskt | ⚠️ Ibland extra |
| Custom domän | ✅ Ja | ✅ Ja |
| Versionskontroll | ✅ Inbyggt | ❌ Manuellt |

---

## Custom domän

Du kan använda egen domän istället för `github.io`:

1. Köp domän (t.ex. `minapp.se`)
2. Lägg till en `CNAME`-fil i repositoryt:
   ```
   minapp.se
   ```
3. Konfigurera DNS hos din domänleverantör:
   ```
   CNAME  www   lundgren9.github.io
   A      @     185.199.108.153
   A      @     185.199.109.153
   A      @     185.199.110.153
   A      @     185.199.111.153
   ```

---

## Jekyll (valfritt)

GitHub Pages stöder **Jekyll** för att bygga webbsidor från Markdown:

```yaml
# _config.yml
title: Min Sida
theme: minima
```

```markdown
---
layout: post
title: "Min första post"
---

Här är mitt innehåll...
```

---

## Felsökning

### Sidan uppdateras inte

1. Vänta några minuter (cache)
2. Kolla **Settings → Pages** för bygstatus
3. Töm webbläsarens cache (Ctrl+Shift+R)

### 404-fel

- Kontrollera att filen finns i rätt branch
- Kontrollera filnamnet (skiftlägeskänsligt!)
- `index.html` krävs för `/`-URL

### Sidan är tom

- Kontrollera att `index.html` har innehåll
- Kolla konsolen (F12) för JavaScript-fel

---

## Relaterade sidor

- [[Git Grunderna]] - Introduktion till Git
- [[Tags och Releases]] - Versionshantering
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [GitHub Pages Documentation](https://docs.github.com/en/pages) - Officiell dokumentation
- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart) - Kom igång-guide
- [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) - Egen domän
- [Jekyll Documentation](https://jekyllrb.com/docs/) - Jekyll-guide

