# 🌿 Arbetsflöde med branches

Denna sida beskriver **Feature Branch Workflow** - det rekommenderade sättet att arbeta med Git.

---

## Varför använda branches?

En **branch** är en isolerad "kopia" av koden där du kan göra ändringar utan att påverka huvudkoden (`main`).

```
main     ─────●─────●─────●─────●─────●─────►
              │           ▲
              │           │ merge
              ▼           │
feature       └─────●─────●
```

### Fördelar

| Fördel | Förklaring |
|--------|------------|
| 🛡️ Säkerhet | Produktionskoden i `main` förblir stabil |
| 🧪 Testning | Testa ändringar innan de går live |
| 👥 Granskning | Pull Requests möjliggör code review |
| 📝 Dokumentation | PR-beskrivningar dokumenterar ändringar |
| ↩️ Enkel ångra | Bara ta bort branchen om det inte fungerar |

---

## Feature Branch Workflow

### Det kompletta arbetsflödet

```bash
# ════════════════════════════════════════════════════
# STEG 1: ALLTID börja med att skapa utvecklingsbranch
# ════════════════════════════════════════════════════
git switch -c utveckling

# ════════════════════════════════════════════════════
# STEG 2: Gör ändringar och testa lokalt
# ════════════════════════════════════════════════════
# ... redigera filer ...
git add .
git commit -m "Beskrivning av ändring"

# ════════════════════════════════════════════════════
# STEG 3: Pusha utvecklingsbranchen till GitHub
# ════════════════════════════════════════════════════
git push origin utveckling

# ════════════════════════════════════════════════════
# STEG 4: Skapa Pull Request på GitHub
# ════════════════════════════════════════════════════
# → Gå till github.com/lundgren9/Twitter/pulls
# → Klicka "New pull request"
# → Välj "compare: utveckling" → "base: main"
# → Skriv beskrivning

# ════════════════════════════════════════════════════
# STEG 5: Efter godkännande - merga till main
# ════════════════════════════════════════════════════
git switch main
git pull origin main    # Hämta ev. ändringar
git merge utveckling
git push origin main

# ════════════════════════════════════════════════════
# STEG 6: Skapa version/tag
# ════════════════════════════════════════════════════
git tag -a v2.5 -m "Version 2.5: Beskrivning"
git push origin v2.5

# ════════════════════════════════════════════════════
# STEG 7: Städa upp (ta bort utvecklingsbranch)
# ════════════════════════════════════════════════════
git branch -d utveckling              # Lokalt
git push origin --delete utveckling   # Remote
```

---

## git switch vs git checkout

### Rekommendation: Använd `git switch`

| Åtgärd | Gammalt | Nytt (rekommenderat) |
|--------|---------|---------------------|
| Byta branch | `git checkout main` | `git switch main` |
| Skapa + byta | `git checkout -b ny` | `git switch -c ny` |
| Återställa fil | `git checkout -- fil` | `git restore fil` |

### Varför?
`git checkout` gör **för många olika saker** (byta branch, återställa filer, checka ut tags). Det är lätt att göra fel.

`git switch` gör **en sak** - byter branch. Säkrare och tydligare!

Se mer: [[Tags och Releases#git-checkout-vs-git-switch]]

---

## Visualisering

### Typiskt arbetsflöde

```
main         ─────●─────────────────●─────●─────►
                  │                 ▲
              switch -c         merge│
                  ▼                 │
utveckling        └─────●─────●─────┘
                       add   commit
                             push
```

### Flera features parallellt

```
main         ─────●───────────────●─────●───────●─────►
                  │               ▲     │       ▲
                  │               │     │       │
feature-1         └─────●─────●───┘     │       │
                                        │       │
feature-2         ─────────────────●────┴───────┘
```

---

## Branch-namnkonventioner

| Prefix | Användning | Exempel |
|--------|------------|---------|
| `feature/` | Nya funktioner | `feature/lightbox` |
| `fix/` | Buggfixar | `fix/image-rotation` |
| `docs/` | Dokumentation | `docs/readme-update` |
| `refactor/` | Kodförbättring | `refactor/cleanup` |
| `utveckling` | Generell utveckling | `utveckling` |

---

## Vanliga kommandon

```bash
# Visa alla branches
git branch -a

# Skapa ny branch
git switch -c ny-branch

# Byta till befintlig branch
git switch main

# Se vilken branch du är på
git branch

# Ta bort lokal branch
git branch -d branch-namn

# Ta bort remote branch
git push origin --delete branch-namn
```

---

## Skydda main-branchen (GitHub)

För att förhindra att någon pushar direkt till `main`:

1. Gå till **Settings → Branches**
2. Klicka **Add rule**
3. Skriv `main` som branch name pattern
4. Aktivera:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (om flera utvecklare)

---

## Relaterade sidor

- [[Git Grunderna]] - Introduktion till Git
- [[Tags och Releases]] - Versionshantering
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) - GitHub's officiella guide
- [Atlassian: Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) - Detaljerad förklaring
- [GitFlow vs GitHub Flow](https://www.gitkraken.com/learn/git/git-flow) - Jämförelse av arbetsflöden

