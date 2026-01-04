# 🏷️ Tags och Releases

Denna sida förklarar hur man använder **Git tags** och **GitHub Releases** för versionshantering.

---

## Vad är en tag?

En **tag** är en permanent referens till en specifik commit. Till skillnad från branches (som flyttas vid varje commit) pekar en tag **alltid på samma commit**.

```
       v1.0          v2.0           v2.4
         │             │              │
         ▼             ▼              ▼
main ────●─────●───────●──────●───────●─────►
```

---

## Lightweight vs Annotated tags

| Typ | Kommando | Innehåll |
|-----|----------|----------|
| **Lightweight** | `git tag v1.0` | Bara en pekare till commit |
| **Annotated** ✅ | `git tag -a v1.0 -m "..."` | Författare, datum, meddelande, GPG-signatur |

### Rekommendation: Använd alltid annoterade tags

```bash
git tag -a v2.5 -m "Version 2.5: Ny feature X och buggfix Y"
```

---

## Skapa och hantera tags

### Skapa tag lokalt

```bash
# Skapa annoterad tag
git tag -a v2.5 -m "Version 2.5: Beskrivning av versionen"

# Verifiera att taggen skapades
git tag
# Output: v1.0, v2.0, v2.2, v2.4, v2.5
```

### Pusha tag till GitHub

```bash
# Pusha specifik tag
git push origin v2.5

# Pusha ALLA tags
git push origin --tags
```

### Visa tag-information

```bash
# Lista alla tags
git tag

# Visa info om specifik tag
git show v2.5
```

### Ta bort tag

```bash
# Ta bort lokalt
git tag -d v2.5-beta

# Ta bort från GitHub
git push origin --delete v2.5-beta
```

---

## Skapa tag på GitHub först

Du kan också skapa en tag direkt på GitHub:

1. Gå till **Releases → Create a new release**
2. Skriv in nytt tag-namn (t.ex. `v2.5`)
3. GitHub skapar automatiskt taggen när du publicerar

**Synka lokalt:**
```bash
git fetch --tags
```

---

## git show - Visa historisk version

`git show` visar innehållet i Git-objekt:

```bash
# Visa hur en fil såg ut i v2.0
git show v2.0:index.html

# Spara filen lokalt (PowerShell, med UTF-8!)
git show v2.0:index.html | Out-File -Encoding utf8 -FilePath v2.0/index.html

# Visa senaste commit
git show HEAD

# Visa en specifik commit
git show abc1234
```

---

## GitHub Releases

En **Release** är en GitHub-feature som bygger på tags och lägger till:

- 📝 Formaterade release notes
- 📦 Nedladdningsbara filer (Source code zip/tar)
- 🔗 Delbar URL

### Skapa Release

1. Gå till `github.com/lundgren9/Twitter/releases/new`
2. **Choose a tag:** Välj din tag (eller skapa ny)
3. **Release title:** t.ex. "Version 2.5 - Ny Wiki"
4. **Describe:** Skriv release notes
5. **Publish release**

### Exempel på Release Notes

```markdown
# Version 2.5 - Wiki och dokumentation

## 🆕 Nyheter

### 📚 GitHub Wiki
- Komplett dokumentation för projektet
- 8 sidor med tutorials och guider
- Länkar till externa resurser

### 🔧 Förbättringar
- Uppdaterad versioner.html
- Bättre förklaringar av Git-kommandon

## 📖 Wiki-sidor
- [Home](wiki/Home)
- [Bildhantering](wiki/Bildhantering)
- [localStorage](wiki/localStorage-och-lagring)
- [Git Grunderna](wiki/Git-Grunderna)
- ... och fler!

## 📁 Ändrade filer
- `wiki/` (ny mapp med 8 .md-filer)
- `versioner.html`
```

---

## Tag vs Branch

| Egenskap | Tag | Branch |
|----------|-----|--------|
| **Flyttbar?** | ❌ Nej, pekar alltid på samma commit | ✅ Ja, flyttas vid varje commit |
| **Syfte** | Markera specifika punkter (releases) | Aktiv utveckling |
| **Skapas** | `git tag -a v1.0 -m "..."` | `git branch feature-x` |
| **Pushas** | `git push origin v1.0` | `git push origin feature-x` |

---

## Tags för annat än versioner

Tags kan användas för:

| Användning | Exempel |
|------------|---------|
| **Releaseversioner** | `v1.0`, `v2.0`, `v3.0-beta` |
| **Milstolpar** | `sprint-1-done`, `feature-complete` |
| **Deployment** | `deployed-2026-01-04`, `prod-20260104` |
| **Backup** | `before-refactor`, `pre-migration` |
| **Review** | `code-review-1`, `audit-2026` |

---

## Semantisk versionering (SemVer)

Rekommenderad namnkonvention:

```
v[MAJOR].[MINOR].[PATCH]

Exempel: v2.5.1
         │ │ └── PATCH: Buggfixar
         │ └──── MINOR: Ny funktionalitet (bakåtkompatibel)
         └────── MAJOR: Brytande ändringar
```

| Ändring | Exempel |
|---------|---------|
| v1.0.0 → v1.0.1 | Buggfix |
| v1.0.1 → v1.1.0 | Ny feature |
| v1.1.0 → v2.0.0 | API-ändring |

Se: [semver.org](https://semver.org/)

---

## Relaterade sidor

- [[Git Grunderna]] - Introduktion till Git
- [[Arbetsflöde med branches]] - Feature Branch Workflow
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging) - Pro Git Book
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github) - Officiell dokumentation
- [Semantic Versioning](https://semver.org/) - SemVer-specifikation

