# Bjerreds Saltsjöbad - Bildcollage

Ett interaktivt bildcollage som visar bilder från Twitter/X med hashtag **#Bjerredssaltsjobad**.

![Bjerreds Saltsjöbad](https://pbs.twimg.com/media/G6SRdvUW0AEJc6G?format=jpg&name=small)

## 📋 Innehållsförteckning

- [Om projektet](#om-projektet)
- [Funktioner](#funktioner)
- [Tekniska val](#tekniska-val)
- [Installation](#installation)
- [Användning](#användning)
- [Lokal lagring utan backend](#lokal-lagring-utan-backend)
- [Framtida utveckling - X API](#framtida-utveckling---x-api)
- [Filstruktur](#filstruktur)
- [Teknisk dokumentation](#teknisk-dokumentation)
- [Licens](#licens)
- [Kontakt](#kontakt)

---

## Om projektet

**Bjerreds Saltsjöbad Bildcollage** är en webbapplikation som visar ett dynamiskt 3×3 bildrutnät med bilder relaterade till Bjerreds Saltsjöbad i Skåne. Bilderna roterar automatiskt var 4:e sekund med mjuka fade-övergångar.

Projektet demonstrerar hur man kan skapa en modern, responsiv webbapplikation med ren HTML, CSS och JavaScript - utan ramverk eller backend-server.

### Bakgrund

Projektet skapades för att visa bilder från Twitter/X som taggats med **#Bjerredssaltsjobad**. Eftersom Twitter/X API:s gratisversion inte tillåter sökning efter hashtags, använder applikationen för närvarande manuellt hämtade bilder från Twitter.

---

## Funktioner

### ✅ Nuvarande funktioner

| Funktion | Beskrivning |
|----------|-------------|
| 🖼️ **Bildcollage** | 3×3 rutnät med bilder som roterar automatiskt |
| 🔄 **Automatisk rotation** | En slumpmässig bild byts ut var 4:e sekund |
| 🎬 **Inbäddad video** | Twitter-video visas via oEmbed |
| ➕ **Lägg till bilder** | Input-ruta för att lägga till egna bild-URLs |
| 💾 **Lokal lagring** | Användarens bilder sparas i webbläsaren (localStorage) |
| 📊 **Bildstatus** | Visa vilka bilder som visas och vilka som väntar |
| 📱 **Responsiv design** | Fungerar på desktop, tablet och mobil |
| 📖 **Teknisk dokumentation** | Inbyggd modal med detaljerad förklaring |

### 🚀 Planerade funktioner

- Automatisk hämtning av bilder via X API (kräver betalplan)
- Drag-and-drop för bilduppladdning
- Justerbar rotationshastighet
- Fullskärmsläge
- Dela-funktioner

---

## Tekniska val

### Arkitektur: Ren frontend utan backend

Vi valde att bygga applikationen helt utan backend-server. Detta innebär:

- ✅ **Enkel deployment** - bara HTML, CSS och JS-filer att ladda upp
- ✅ **Ingen serverkostnad** - kan hostas gratis på t.ex. GitHub Pages
- ✅ **Snabb laddning** - inga server-anrop vid sidvisning
- ⚠️ **Begränsning** - kan inte göra API-anrop till Twitter direkt från webbläsaren (CORS)

### Bildkällor

**Varför inte live-data från Twitter?**

Twitter/X API har tre nivåer:

| Nivå | Pris | Sökning efter hashtags |
|------|------|------------------------|
| Free | Gratis | ❌ Nej |
| Basic | ~$100/månad | ✅ Ja |
| Pro | ~$5000/månad | ✅ Ja |

Med **Free tier** kan man endast posta tweets, inte söka. Därför använder vi manuellt hämtade bilder från Twitter.

### Video-inbäddning: Twitter oEmbed

För att visa video från Twitter använder vi **Twitter oEmbed**:

```html
<blockquote class="twitter-tweet">
    <a href="https://twitter.com/kentlundgren/status/1991876902991343647"></a>
</blockquote>
<script src="https://platform.twitter.com/widgets.js"></script>
```

**Hur det fungerar:**
1. HTML-koden innehåller en `blockquote` med länk till tweeten
2. Twitter's `widgets.js` laddas asynkront
3. Scriptet ersätter blockquote med en interaktiv video-spelare

**Fördelar:**
- Officiell Twitter-metod
- Automatisk uppdatering av utseende
- Fungerar med videos, bilder och text-tweets

**Nackdelar:**
- Kräver internetanslutning
- Kan blockeras av annonsblockerare
- Beroende av Twitter's servrar

### Input-container för nya bilder

Användare kan lägga till egna bilder genom att klistra in en URL:

```
┌─────────────────────────────────────────────────────┐
│  https://exempel.com/bild.jpg    │  Lägg till  │
└─────────────────────────────────────────────────────┘
```

**Validering:**
- URL måste börja med `http://` eller `https://`
- Dubbletter tillåts inte
- Felmeddelanden visas vid ogiltiga URLs

---

## Installation

### Krav

- En modern webbläsare (Chrome, Firefox, Edge, Safari)
- Ingen server krävs - kan öppnas direkt som fil

### Steg-för-steg

1. **Klona eller ladda ner repositoryt:**
   ```bash
   git clone https://github.com/lundgren9/Twitter.git
   ```

2. **Navigera till mappen:**
   ```bash
   cd Twitter
   ```

3. **Öppna i webbläsare:**
   - Dubbelklicka på `index.html`, eller
   - Använd en lokal server:
     ```bash
     # Med Python 3
     python -m http.server 8000
     
     # Med Node.js
     npx serve
     ```

---

## Användning

### Visa bildcollaget

Öppna `index.html` i en webbläsare. Bilderna börjar rotera automatiskt.

### Lägga till egna bilder

1. Scrolla ner till **"➕ Lägg till egna bilder"**
2. Klistra in en bild-URL (t.ex. `https://pbs.twimg.com/media/xxxxx.jpg`)
3. Klicka **"Lägg till"**
4. Bilden läggs till i rotationen och sparas automatiskt

### Se bildstatus

Under input-rutan finns tre listor:
- **🖼️ Visas nu** - De 9 bilder som för tillfället visas
- **📚 I kö** - Bilder som väntar på att visas
- **👤 Dina bilder** - Bilder du själv lagt till (kan tas bort)

### Teknisk dokumentation

Klicka på **"⚙️ Teknisk Dokumentation"** för att öppna en detaljerad förklaring av hur allt fungerar.

---

## Lokal lagring utan backend

### "Behövs inte en databas för att spara data?"

**Nej!** Webbläsare har inbyggd lagring som kallas **localStorage**. Det är en key-value store som finns i varje webbläsare.

### Vad är localStorage?

| Egenskap | Värde |
|----------|-------|
| **Kapacitet** | ~5-10 MB per domän |
| **Livslängd** | Permanent (tills användaren rensar) |
| **Tillgänglighet** | Endast i samma webbläsare/enhet |
| **Säkerhet** | Isolerad per domän (same-origin policy) |

### Hur vi använder det

```javascript
// SPARA bilder
function saveUserImages(images) {
    localStorage.setItem('bjerred_user_images', JSON.stringify(images));
}

// HÄMTA bilder
function loadSavedImages() {
    const saved = localStorage.getItem('bjerred_user_images');
    return saved ? JSON.parse(saved) : [];
}

// RADERA bilder
function clearUserImages() {
    localStorage.removeItem('bjerred_user_images');
}
```

### Fördelar med localStorage

✅ **Ingen backend krävs** - Allt körs i webbläsaren  
✅ **Gratis** - Ingen server att betala för  
✅ **Snabbt** - Data hämtas direkt, ingen nätverksfördröjning  
✅ **Enkelt** - Bara några rader JavaScript  

### Begränsningar

⚠️ **Endast lokal** - Data finns bara i den webbläsare där det sparades  
⚠️ **Kan rensas** - Om användaren rensar webbläsardata försvinner bilderna  
⚠️ **Ingen synk** - Olika enheter har olika data  
⚠️ **Storleksgräns** - Max ~5-10 MB  

### När behövs en backend?

En backend-server (t.ex. PHP, Node.js, Python) behövs om du vill:
- Spara data som delas mellan användare
- Synkronisera mellan enheter
- Lagra stora mängder data
- Göra säkra API-anrop (dölja API-nycklar)

---

## Framtida utveckling - X API

### Automatisk bildhämtning från Twitter

Om du vill att applikationen ska **automatiskt** hämta bilder med hashtag #Bjerredssaltsjobad krävs:

1. **Uppgradera till X API Basic tier** (~$100/månad)
2. **Skapa en backend-proxy** (för att kringgå CORS och dölja API-nyckel)

### Steg 1: Skaffa API-nyckel

1. Gå till [X Developer Portal](https://developer.x.com/en/portal/products)
2. Uppgradera till **Basic tier**
3. Skapa ett projekt och en app
4. Generera en **Bearer Token**

### Steg 2: Skapa backend-proxy

Twitter/X API tillåter inte anrop direkt från webbläsaren (CORS-blockering). Du behöver en server som mellanhand.

**Exempel med PHP (kentlundgren.se):**

```php
<?php
// twitter-proxy.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$bearer_token = 'DIN_HEMLIGA_TOKEN'; // Spara säkert!
$query = urlencode('#Bjerredssaltsjobad');
$url = "https://api.twitter.com/2/tweets/search/recent?query=$query&max_results=100&expansions=attachments.media_keys&media.fields=url";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $bearer_token"
]);

echo curl_exec($ch);
curl_close($ch);
?>
```

### Steg 3: Anropa från JavaScript

```javascript
async function fetchImagesFromAPI() {
    const response = await fetch('https://www.kentlundgren.se/twitter-proxy.php');
    const data = await response.json();
    
    // Extrahera bilder
    const images = data.includes.media
        .filter(m => m.type === 'photo')
        .map(m => m.url);
    
    return images;
}
```

### Kostnadsöversikt

| Nivå | Månadskostnad | Tweets/månad | Sökning |
|------|---------------|--------------|---------|
| Free | Gratis | 1,500 (skriv) | ❌ |
| Basic | ~$100 | 10,000 | ✅ |
| Pro | ~$5,000 | 1,000,000 | ✅ |

---

## Filstruktur

```
Twitterbilder/
├── index.html      # Huvudsida med HTML-struktur
├── styles.css      # All CSS-styling
├── javaScript.js   # All JavaScript-logik
└── README.md       # Denna fil
```

### Filbeskrivning

| Fil | Storlek | Beskrivning |
|-----|---------|-------------|
| `index.html` | ~12 KB | HTML-struktur, video-embed, modal |
| `styles.css` | ~18 KB | Responsiv CSS, animationer, grid |
| `javaScript.js` | ~15 KB | Bildrotation, localStorage, DOM-hantering |

---

## Teknisk dokumentation

### Webbläsarstöd

| Webbläsare | Stöd |
|------------|------|
| Chrome 60+ | ✅ |
| Firefox 55+ | ✅ |
| Safari 12+ | ✅ |
| Edge 79+ | ✅ |
| IE 11 | ❌ |

### Använda tekniker

- **HTML5** - Semantisk struktur
- **CSS3** - Grid, Flexbox, animationer, variabler
- **JavaScript ES6+** - Async/await, arrow functions, template literals
- **localStorage API** - Lokal datalagring
- **Twitter oEmbed** - Video-inbäddning

### Debug-funktioner

Öppna webbläsarens konsol (F12) och skriv:

```javascript
debugStatus()      // Visa aktuell status
stopImageRotation() // Stoppa bildväxlingen
clearUserImages()   // Radera alla egna bilder
```

---

## Licens

Detta projekt är öppen källkod. Använd det gärna för egna projekt.

---

## Kontakt

**Kent Lundgren**  
🌐 [kentlundgren.se](https://www.kentlundgren.se)  
🐦 [@kentlundgren](https://x.com/kentlundgren)

---

## Ändringslogg

### 2026-01-03
- ➕ Lagt till 10 Twitter-bilder från #Bjerredssaltsjobad
- ➕ Lagt till inbäddad video via Twitter oEmbed
- ➕ Lagt till input-ruta för att lägga till bilder
- ➕ Lagt till localStorage för att spara användarbilder
- ➕ Lagt till visning av bildstatus (visas/kö/egna)
- 🔧 Fixat felaktiga sökvägar till CSS och JS
- 📝 Uppdaterad teknisk dokumentation

### Ursprunglig version
- Grundläggande bildcollage med Unsplash-bilder
- Modal för teknisk dokumentation
