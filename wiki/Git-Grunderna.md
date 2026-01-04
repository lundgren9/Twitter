# 🔧 Git Grunderna

Denna sida ger en introduktion till **Git** - ett versionshanteringssystem som spårar ändringar i kod och möjliggör samarbete.

---

## Vad är Git?

**Git** är ett distribuerat versionshanteringssystem (VCS) skapat av Linus Torvalds 2005. Det låter dig:

- 📜 **Spåra ändringar** - Se vem som ändrade vad och när
- ↩️ **Ångra misstag** - Återgå till tidigare versioner
- 🌿 **Arbeta parallellt** - Utveckla features i separata branches
- 👥 **Samarbeta** - Flera personer kan arbeta på samma projekt

---

## Git's fyra områden

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌───────────┐│
│  │  Working    │───►│   Staging   │───►│    Local    │───►│  Remote   ││
│  │  Directory  │    │    Area     │    │ Repository  │    │ (GitHub)  ││
│  └─────────────┘    └─────────────┘    └─────────────┘    └───────────┘│
│        │                  │                  │                  │      │
│    Dina filer         git add           git commit          git push   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

| Område | Beskrivning |
|--------|-------------|
| **Working Directory** | Dina lokala filer (det du ser i mappen) |
| **Staging Area** | Filer som ska ingå i nästa commit |
| **Local Repository** | Din lokala Git-historik (.git-mappen) |
| **Remote Repository** | GitHub, GitLab, Bitbucket etc. |

---

## Grundläggande kommandon

### Första gången

```bash
# Konfigurera Git med ditt namn och e-post
git config --global user.name "Ditt Namn"
git config --global user.email "din@email.se"
```

### Dagligt arbetsflöde

```bash
# 1. Kolla status - vilka filer har ändrats?
git status

# 2. Lägg till filer till staging
git add .                    # Alla filer
git add filnamn.js           # En specifik fil

# 3. Commita (spara) ändringarna
git commit -m "Beskrivning av ändringen"

# 4. Skicka till GitHub
git push origin main
```

### Hämta ändringar

```bash
# Hämta och applicera ändringar från GitHub
git pull origin main

# Eller i två steg:
git fetch origin        # Hämta info om ändringar
git merge origin/main   # Applicera dem
```

---

## git clone vs git pull

### git clone
Skapar en **ny kopia** av ett helt repository:

```bash
# Första gången - ladda ner projektet
git clone https://github.com/lundgren9/Twitter.git
```

- ✅ Används första gången
- ✅ Skapar ny mapp med alla filer
- ✅ Sätter upp remote-koppling automatiskt

### git pull
Uppdaterar ett **befintligt** lokalt repository:

```bash
# Uppdatera befintligt projekt
git pull origin main
```

- ✅ Används när du redan har projektet
- ✅ Hämtar endast nya ändringar
- ⚠️ Kräver att du redan klonat

---

## Visa information

```bash
# Se commit-historik
git log --oneline

# Se ändringar som inte är stagade
git diff

# Se vilka branches som finns
git branch -a

# Se vilken branch du är på
git branch
```

---

## Ångra ändringar

```bash
# Ångra ändringar i en fil (ej stagad)
git restore filnamn.js

# Ta bort fil från staging
git restore --staged filnamn.js

# Ångra senaste commit (behåll ändringar)
git reset --soft HEAD~1

# Ångra senaste commit (radera ändringar)
git reset --hard HEAD~1
```

---

## .gitignore

Filen `.gitignore` talar om för Git vilka filer som **inte** ska spåras:

```gitignore
# Beroenden
node_modules/
vendor/

# Byggda filer
dist/
build/

# Miljövariabler (hemligheter!)
.env
.env.local

# OS-filer
.DS_Store
Thumbs.db

# IDE-inställningar
.vscode/
.idea/
```

---

## Relaterade sidor

- [[Arbetsflöde med branches]] - Feature Branch Workflow
- [[Tags och Releases]] - Versionsmarkörer
- [[GitHub Pages]] - Publicera webbsidor
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

### Officiell dokumentation
- [Pro Git Book](https://git-scm.com/book/en/v2) - Gratis bok av Scott Chacon och Ben Straub
- [Git Reference](https://git-scm.com/docs) - Kommandoreferens

### Tutorials
- [GitHub Skills](https://skills.github.com/) - Interaktiva kurser
- [Learn Git Branching](https://learngitbranching.js.org/) - Visuell interaktiv tutorial
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials) - Omfattande guider

### Videos
- [How Git Works: Explained in 4 Minutes](https://www.youtube.com/watch?v=e9lnsKot_SQ) - ByteByteGo
- [Git and GitHub Tutorial for Beginners](https://youtu.be/tRZGeaHPoaw) - Kevin Stratvert
- [Git Tutorial For Dummies](https://www.youtube.com/watch?v=mJ-qvsxPHpY) - Nick White

