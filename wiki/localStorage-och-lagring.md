# 💾 localStorage och lagring

Denna sida förklarar hur data lagras i webbläsaren **utan behov av en backend-server**.

---

## Vad är localStorage?

**localStorage** är en inbyggd lagringsmekanism i alla moderna webbläsare. Det är en **key-value store** som sparar data permanent (tills användaren rensar webbläsardata).

```
┌─────────────────────────────────────────┐
│           WEBBLÄSARE                    │
│  ┌───────────────────────────────────┐  │
│  │      localStorage                 │  │
│  │  ┌─────────────┬───────────────┐  │  │
│  │  │    KEY      │    VALUE      │  │  │
│  │  ├─────────────┼───────────────┤  │  │
│  │  │ user_images │ ["url1",...]  │  │  │
│  │  │ settings    │ {"theme":...} │  │  │
│  │  └─────────────┴───────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Egenskaper

| Egenskap | Värde |
|----------|-------|
| **Kapacitet** | ~5-10 MB per domän |
| **Livslängd** | Permanent (tills användaren rensar) |
| **Tillgänglighet** | Endast samma webbläsare/enhet |
| **Säkerhet** | Isolerad per domän (same-origin policy) |
| **Datatyp** | Endast strängar (JSON.stringify för objekt) |

---

## Hur vi använder det

### Spara bilder

```javascript
function saveUserImages(images) {
    // Konvertera array till JSON-sträng
    const jsonString = JSON.stringify(images);
    
    // Spara i localStorage
    localStorage.setItem('bjerred_user_images', jsonString);
    
    console.log(`Sparade ${images.length} bilder`);
}
```

### Hämta bilder

```javascript
function loadSavedImages() {
    // Hämta från localStorage
    const saved = localStorage.getItem('bjerred_user_images');
    
    // Om inget finns, returnera tom array
    if (!saved) return [];
    
    // Konvertera JSON-sträng till array
    return JSON.parse(saved);
}
```

### Radera bilder

```javascript
function clearUserImages() {
    localStorage.removeItem('bjerred_user_images');
    console.log('Alla användarbilder raderade');
}
```

---

## Fullständigt exempel

```javascript
// ========================================
// BILDHANTERING MED LOCALSTORAGE
// ========================================

const STORAGE_KEY = 'bjerred_user_images';

// SPARA
function saveUserImages(images) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        return true;
    } catch (e) {
        console.error('Kunde inte spara:', e);
        return false;
    }
}

// HÄMTA
function loadSavedImages() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Kunde inte läsa:', e);
        return [];
    }
}

// LÄGG TILL EN BILD
function addUserImage(imageUrl) {
    const images = loadSavedImages();
    
    // Kontrollera om bilden redan finns
    if (images.includes(imageUrl)) {
        console.warn('Bilden finns redan');
        return false;
    }
    
    images.push(imageUrl);
    return saveUserImages(images);
}

// TA BORT EN BILD
function removeUserImage(imageUrl) {
    const images = loadSavedImages();
    const filtered = images.filter(img => img !== imageUrl);
    return saveUserImages(filtered);
}

// RENSA ALLT
function clearAllImages() {
    localStorage.removeItem(STORAGE_KEY);
}
```

---

## Fördelar och nackdelar

### ✅ Fördelar

| Fördel | Förklaring |
|--------|------------|
| Ingen backend | Allt körs i webbläsaren |
| Gratis | Ingen server att betala för |
| Snabbt | Ingen nätverksfördröjning |
| Enkelt | Bara några rader JavaScript |
| Persistent | Data överlever sidladdningar |

### ⚠️ Nackdelar

| Nackdel | Förklaring |
|---------|------------|
| Endast lokal | Data finns bara i en webbläsare |
| Kan rensas | Försvinner om användaren rensar data |
| Ingen synk | Olika enheter = olika data |
| Storleksgräns | Max ~5-10 MB |
| Endast strängar | Måste konvertera objekt med JSON |

---

## När behövs en backend?

localStorage räcker inte om du behöver:

| Behov | Lösning |
|-------|---------|
| Dela data mellan användare | Backend + databas |
| Synka mellan enheter | Backend + autentisering |
| Stora datamängder | Backend + fillagring |
| Säkra API-anrop | Backend-proxy |
| Avancerad sökning | Backend + sökmotor |

---

## Alternativ till localStorage

| Lagringstyp | Kapacitet | Livslängd | Användning |
|-------------|-----------|-----------|------------|
| **localStorage** | 5-10 MB | Permanent | Användarpreferenser |
| **sessionStorage** | 5-10 MB | Tills flik stängs | Tillfällig data |
| **IndexedDB** | Stort (GB) | Permanent | Stora datamängder |
| **Cookies** | 4 KB | Konfigurerbar | Autentisering |

---

## Debug-kommandon

Öppna webbläsarens konsol (F12) och testa:

```javascript
// Se allt i localStorage
console.log(localStorage);

// Se sparade bilder
console.log(JSON.parse(localStorage.getItem('bjerred_user_images')));

// Rensa allt
localStorage.clear();
```

---

## Relaterade sidor

- [[Bildhantering]] - Hur bilder visas och roteras
- [[X API och Twitter]] - Backend-lösning för API
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Officiell dokumentation
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - Översikt
- [javascript.info: LocalStorage](https://javascript.info/localstorage) - Tutorial
- [Can I use: localStorage](https://caniuse.com/namevalue-storage) - Webbläsarstöd

