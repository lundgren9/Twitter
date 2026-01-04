# 🐦 X API och Twitter

Denna sida förklarar hur man kan hämta bilder automatiskt från Twitter/X, och varför det kräver en backend-lösning.

---

## Nuvarande implementation

I nuvarande version används **hårdkodade bild-URLs** från Twitter:

```javascript
const defaultImages = [
    'https://pbs.twimg.com/media/G6SRdvUW0AEJc6G?format=jpg&name=large',
    // ... fler URLs
];
```

**Fördelar:**
- ✅ Gratis
- ✅ Ingen API-nyckel krävs
- ✅ Fungerar alltid

**Nackdelar:**
- ❌ Manuell uppdatering krävs
- ❌ Inga nya bilder automatiskt

---

## Twitter/X API - Översikt

### API-nivåer (2024)

| Nivå | Kostnad | Tweets/månad | Sökning |
|------|---------|--------------|---------|
| **Free** | Gratis | 1,500 (endast skriva) | ❌ |
| **Basic** | ~$100/mån | 10,000 | ✅ |
| **Pro** | ~$5,000/mån | 1,000,000 | ✅ |

> ⚠️ **Observera:** Free-nivån tillåter **inte** sökning efter tweets. Du måste ha minst Basic-nivån.

---

## Varför behövs en backend?

### Problem 1: CORS (Cross-Origin Resource Sharing)

Webbläsare blockerar direkta anrop till Twitter API:

```
┌─────────────────┐          ┌─────────────────┐
│   Webbläsare    │   ──X──► │   Twitter API   │
│  (JavaScript)   │  BLOCKED │                 │
└─────────────────┘          └─────────────────┘
```

**Lösning:** Använd en backend som mellanhand:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Webbläsare    │ ──► │   Din server    │ ──► │   Twitter API   │
│  (JavaScript)   │     │   (Backend)     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Problem 2: API-nyckel exponeras

Om du anropar Twitter API direkt från JavaScript syns din API-nyckel i webbläsarens utvecklarverktyg. **Vem som helst kan stjäla den!**

---

## Implementation med backend

### Steg 1: Skaffa API-nyckel

1. Gå till [X Developer Portal](https://developer.twitter.com)
2. Skapa ett konto och projekt
3. Uppgradera till **Basic tier** (~$100/mån)
4. Generera en **Bearer Token**

### Steg 2: Skapa backend-proxy (PHP)

```php
<?php
// twitter-proxy.php
// Denna fil läggs på din server (t.ex. kentlundgren.se)

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Tillåt anrop från vilken domän som helst

// VIKTIGT: Spara token säkert (miljövariabel eller config-fil utanför webroot)
$bearer_token = getenv('TWITTER_BEARER_TOKEN');

// Sökfråga
$query = urlencode('#Bjerredssaltsjobad');

// Twitter API v2 endpoint
$url = "https://api.twitter.com/2/tweets/search/recent"
     . "?query=$query"
     . "&max_results=100"
     . "&expansions=attachments.media_keys"
     . "&media.fields=url,preview_image_url";

// Gör anrop
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $bearer_token"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Returnera svar
http_response_code($httpCode);
echo $response;
?>
```

### Steg 3: Anropa från JavaScript

```javascript
async function fetchImagesFromTwitter() {
    try {
        // Anropa din backend-proxy
        const response = await fetch('https://www.kentlundgren.se/twitter-proxy.php');
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extrahera bild-URLs
        const images = data.includes?.media
            ?.filter(media => media.type === 'photo')
            ?.map(media => media.url) || [];
        
        console.log(`Hämtade ${images.length} bilder från Twitter`);
        return images;
        
    } catch (error) {
        console.error('Kunde inte hämta bilder:', error);
        return [];
    }
}
```

---

## Twitter oEmbed (Video)

För att bädda in en tweet eller video kan du använda **oEmbed** (gratis):

```html
<!-- I HTML -->
<blockquote class="twitter-tweet">
    <a href="https://twitter.com/kentlundgren/status/1991876902991343647"></a>
</blockquote>

<!-- Ladda Twitter's widget-script -->
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

### Ladda dynamiskt med JavaScript

```javascript
function loadTwitterWidget() {
    return new Promise((resolve) => {
        if (window.twttr) {
            window.twttr.widgets.load();
            resolve();
        } else {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.onload = resolve;
            document.head.appendChild(script);
        }
    });
}
```

---

## Alternativ: Manuell bildkurering

Om du inte vill betala för API:

1. **Sök manuellt** på Twitter efter #Bjerredssaltsjobad
2. **Högerklicka** på bilden → "Kopiera bildadress"
3. **Klistra in** i applikationens input-fält
4. **Spara** i [[localStorage och lagring|localStorage]]

---

## Relaterade sidor

- [[localStorage och lagring]] - Lokal lagring av bilder
- [[Bildhantering]] - Hur bilder visas
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api) - Officiell dokumentation
- [Twitter Developer Portal](https://developer.twitter.com) - Skapa API-konto
- [Twitter oEmbed](https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api) - Bädda in tweets
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Förstå CORS
- [PHP cURL Documentation](https://www.php.net/manual/en/book.curl.php) - Backend-anrop

