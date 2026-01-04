# 🏠 Bjerreds Saltsjöbad - Bildcollage

Välkommen till dokumentationen för **Bjerreds Saltsjöbad Bildcollage** - en webbaserad applikation som visar ett roterande collage av bilder från Twitter/X med hashtag [#Bjerredssaltsjobad](https://x.com/search?q=%23Bjerredssaltsjobad).

## 🔗 Snabblänkar

| Resurs | Beskrivning |
|--------|-------------|
| [🌐 Live Demo](https://lundgren9.github.io/Twitter/) | Kör programmet i webbläsaren |
| [📦 GitHub Repository](https://github.com/lundgren9/Twitter) | Källkod och releases |
| [📋 Releases](https://github.com/lundgren9/Twitter/releases) | Alla versioner |
| [📚 Versionshistorik](https://lundgren9.github.io/Twitter/versioner.html) | Git-guide och äldre versioner |

---

## 📖 Wiki-sidor

### Programfunktionalitet
- [[Bildhantering]] - Hur bildcollaget och rotationen fungerar
- [[localStorage och lagring]] - Hur data sparas utan backend
- [[X API och Twitter]] - Hämta bilder från Twitter/X
- [[Lightbox funktionalitet]] - Fullskärmsvisning av bilder

### Git och GitHub
- [[Git Grunderna]] - Introduktion till versionshantering
- [[Arbetsflöde med branches]] - Feature Branch Workflow
- [[Tags och Releases]] - Versionshantering med Git tags
- [[GitHub Pages]] - Publicera webbsidor gratis

---

## 🛠️ Teknisk översikt

```
┌─────────────────────────────────────────────────────────────┐
│                     ANVÄNDARE (Webbläsare)                  │
├─────────────────────────────────────────────────────────────┤
│  index.html  │  styles.css  │  javaScript.js                │
├──────────────┼──────────────┼────────────────────────────────┤
│   HTML5      │   CSS3       │   JavaScript ES6+              │
│   Semantik   │   Grid       │   localStorage                 │
│   Video      │   Flexbox    │   DOM manipulation             │
│   Lightbox   │   Animation  │   Async/Await                  │
├─────────────────────────────────────────────────────────────┤
│                     GitHub Pages (hosting)                   │
├─────────────────────────────────────────────────────────────┤
│                     GitHub API (version info)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Funktioner

| Funktion | Beskrivning |
|----------|-------------|
| 🖼️ Bildcollage | 9 bilder som roterar var 5:e sekund |
| 🔍 Lightbox | Klicka på bild för fullskärmsvisning |
| ➕ Lägg till bilder | Input-fält för egna bild-URLs |
| 💾 localStorage | Sparar dina bilder lokalt |
| 🎬 Twitter-video | Inbäddad video via oEmbed |
| 🏷️ Versionsbadge | Visar version från GitHub API |

---

## 📚 Externa resurser

### Relaterade Wikis och guider

| Resurs | Beskrivning |
|--------|-------------|
| [Git Book (Pro Git)](https://git-scm.com/book/en/v2) | Officiell Git-dokumentation |
| [GitHub Docs](https://docs.github.com) | GitHub's officiella dokumentation |
| [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | localStorage API-referens |
| [Twitter API Documentation](https://developer.twitter.com/en/docs) | X/Twitter API-dokumentation |
| [GitHub Pages Docs](https://docs.github.com/en/pages) | Hur GitHub Pages fungerar |

### Videoresurser

- [How Git Works: Explained in 4 Minutes](https://www.youtube.com/watch?v=e9lnsKot_SQ) - ByteByteGo
- [Git and GitHub Tutorial for Beginners](https://youtu.be/tRZGeaHPoaw) - Kevin Stratvert
- [Git Tutorial For Dummies](https://www.youtube.com/watch?v=mJ-qvsxPHpY) - Nick White

---

## 🔄 Versioner

| Version | Datum | Nyheter |
|---------|-------|---------|
| [v2.4](https://github.com/lundgren9/Twitter/releases/tag/v2.4) | 2026-01-04 | Versionshistorik, Git-guide, Wiki |
| [v2.2](https://github.com/lundgren9/Twitter/releases/tag/v2.2) | 2026-01-04 | Versionsbadge, GitHub API |
| [v2.0](https://github.com/lundgren9/Twitter/releases/tag/v2.0) | 2026-01-04 | Lightbox, 16 bilder |
| [v1.0](https://github.com/lundgren9/Twitter/releases/tag/Release) | 2026-01-03 | Första release |

---

## 👤 Kontakt

**Kent Lundgren**  
🌐 [kentlundgren.se](https://www.kentlundgren.se)  
🐦 [@kentlundgren](https://x.com/kentlundgren)

