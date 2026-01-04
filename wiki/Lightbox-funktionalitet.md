# 🔍 Lightbox funktionalitet

Denna sida förklarar hur **Lightbox** (fullskärmsvisning av bilder) fungerar i applikationen.

---

## Vad är en Lightbox?

En **Lightbox** är ett användargränssnittsmönster som visar en bild i fullskärm med en mörk bakgrund ("overlay"). Användaren kan sedan stänga visningen genom att klicka på X eller bakgrunden.

```
┌────────────────────────────────────────────┐
│                                            │
│   ┌────────────────────────────────────┐   │
│   │                                    │   │
│   │                                    │   │
│   │          BILD I FULLSKÄRM          │   │
│   │                                    │   │
│   │                                    │   │
│   └────────────────────────────────────┘   │
│                                            │
│        [Öppna på X]    [✕ Stäng]           │
│                                            │
└────────────────────────────────────────────┘
      ↑ Mörk semitransparent bakgrund
```

---

## HTML-struktur

```html
<!-- Lightbox container (dold som standard) -->
<div id="imageLightbox" class="lightbox">
    <div class="lightbox-content">
        <!-- Stäng-knapp -->
        <button class="lightbox-close" aria-label="Stäng">✕</button>
        
        <!-- Bilden -->
        <img id="lightboxImage" src="" alt="Förstorad bild">
        
        <!-- Knappar -->
        <div class="lightbox-buttons">
            <a id="openOnTwitter" href="#" target="_blank">
                🐦 Öppna på X
            </a>
        </div>
    </div>
</div>
```

---

## CSS-styling

```css
/* Overlay - täcker hela skärmen */
.lightbox {
    display: none;                    /* Dold som standard */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);   /* Mörk bakgrund */
    z-index: 2000;                    /* Ovanpå allt annat */
    justify-content: center;
    align-items: center;
}

/* Visa lightbox */
.lightbox.active {
    display: flex;
}

/* Bilden */
.lightbox-content img {
    max-width: 90vw;      /* Max 90% av skärmbredd */
    max-height: 80vh;     /* Max 80% av skärmhöjd */
    object-fit: contain;  /* Behåll proportioner */
    border-radius: 8px;
}

/* Stäng-knapp */
.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
}

/* Animation vid öppning */
.lightbox-content {
    animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
```

---

## JavaScript-logik

### Setup

```javascript
function setupLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.querySelector('.lightbox-close');
    const openOnTwitter = document.getElementById('openOnTwitter');
    
    // Klick på bild → öppna lightbox
    document.querySelectorAll('.image-grid img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
        img.style.cursor = 'pointer';
    });
    
    // Stäng-knapp
    closeButton.addEventListener('click', closeLightbox);
    
    // Klick på bakgrund → stäng
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // ESC-tangent → stäng
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}
```

### Öppna lightbox

```javascript
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const openOnTwitter = document.getElementById('openOnTwitter');
    
    // Sätt bilden
    lightboxImage.src = imageSrc;
    
    // Hämta metadata (tweet-URL)
    const imageId = extractImageId(imageSrc);
    const metadata = imageMetadata[imageId];
    
    if (metadata && metadata.url) {
        openOnTwitter.href = metadata.url;
        openOnTwitter.style.display = 'inline-flex';
    } else {
        // Fallback till användarens profil
        openOnTwitter.href = 'https://x.com/kentlundgren';
    }
    
    // Visa lightbox
    lightbox.classList.add('active');
    
    // Förhindra scrollning på body
    document.body.style.overflow = 'hidden';
}
```

### Stäng lightbox

```javascript
function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    
    lightbox.classList.remove('active');
    
    // Återställ scrollning
    document.body.style.overflow = '';
}
```

---

## Bildmetadata

För att "Öppna på X"-knappen ska länka till rätt tweet lagras metadata:

```javascript
const imageMetadata = {
    // Nyckel = del av bild-URL
    'GziGQg-WUAAq9GH': {
        url: 'https://x.com/kentlundgren/status/1961465270280577380',
        date: '2025-04-17',
        text: 'Bjerreds Saltsjöbad en vacker dag'
    },
    'G9gcau5WAAAs3nw': {
        url: 'https://x.com/kentlundgren/status/...',
        date: '2025-05-20',
        text: 'Sommar vid havet'
    }
    // ... fler bilder
};

// Extrahera ID från URL
function extractImageId(url) {
    const match = url.match(/media\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
}
```

---

## Accessibility

### Keyboard navigation
- **ESC** - Stäng lightbox
- **Tab** - Navigera mellan knappar

### ARIA-attribut
```html
<button class="lightbox-close" aria-label="Stäng bildvisning">✕</button>
<div role="dialog" aria-modal="true" aria-label="Bildvisning">
```

### Focus trap
När lightbox är öppen bör fokus stanna inom den:
```javascript
// Förhindra tab utanför lightbox
lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Håll fokus inom lightbox
    }
});
```

---

## Relaterade sidor

- [[Bildhantering]] - Bildrotation och collage
- [[localStorage och lagring]] - Spara användarbilder
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [MDN: Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - Native dialog-element
- [WAI-ARIA: Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) - Accessibility-guide
- [CSS-Tricks: Lightbox](https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/) - Tutorial

