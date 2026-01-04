# 🖼️ Bildhantering

Denna sida förklarar hur bildcollaget och bildrotationen fungerar i applikationen.

---

## Översikt

Bildcollaget visar **9 bilder** samtidigt i ett 3x3 grid. Var 5:e sekund byts en slumpmässig bild ut mot en ny från bildpoolen.

```
┌─────────┬─────────┬─────────┐
│  Bild 1 │  Bild 2 │  Bild 3 │
├─────────┼─────────┼─────────┤
│  Bild 4 │  Bild 5 │  Bild 6 │
├─────────┼─────────┼─────────┤
│  Bild 7 │  Bild 8 │  Bild 9 │
└─────────┴─────────┴─────────┘
         ↓ var 5:e sekund
    En slumpmässig bild byts ut
```

---

## Bildpoolen

### Standardbilder
Applikationen kommer med **16 fördefinierade bilder** från Twitter/X:

```javascript
const defaultImages = [
    'https://pbs.twimg.com/media/G6SRdvUW0AEJc6G?format=jpg&name=large',
    'https://pbs.twimg.com/media/G6SRdxlWsAAPoIi?format=jpg&name=large',
    // ... fler bilder
];
```

### Användarbilder
Användare kan lägga till egna bilder via input-fältet. Dessa sparas i [[localStorage och lagring|localStorage]].

---

## Rotationslogik

### Hur det fungerar

1. Vid sidladdning visas 9 slumpmässiga bilder
2. Resterande bilder läggs i en "kö"
3. Var 5:e sekund:
   - En slumpmässig position (1-9) väljs
   - En bild från kön plockas
   - Bilden på vald position byts ut
   - Den gamla bilden läggs tillbaka i kön

### Kod

```javascript
function rotateRandomImage() {
    // Välj slumpmässig position (0-8)
    const randomIndex = Math.floor(Math.random() * imageElements.length);
    const imgElement = imageElements[randomIndex];
    
    // Välj nästa bild från kön
    if (imageStack.length > 0) {
        const newImage = imageStack.pop();
        const oldImage = imgElement.src;
        
        // Animera byte
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = newImage;
            imgElement.style.opacity = '1';
        }, 500);
        
        // Lägg tillbaka gamla bilden i kön
        imageStack.unshift(oldImage);
    }
}

// Starta rotation
setInterval(rotateRandomImage, 5000);
```

---

## Bildmetadata

För vissa bilder finns metadata (tweet-URL, datum, text):

```javascript
const imageMetadata = {
    'GziGQg-WUAAq9GH': {
        url: 'https://x.com/kentlundgren/status/1961465270280577380',
        date: '2025-04-17',
        text: 'Bjerreds Saltsjöbad en vacker dag'
    },
    // ... fler bilder
};
```

### Hur metadata används

1. **Tooltip vid hover** - Visar datum om det finns
2. **Lightbox** - Visar "Öppna på X"-knapp som länkar till original-tweet

---

## Bildlistor (UI)

Applikationen visar tre listor för användaren:

| Lista | Färg | Innehåll |
|-------|------|----------|
| 🖼️ Visas nu | Grön | De 9 bilder som visas just nu |
| 📚 I kö | Blå | Bilder som väntar på att visas |
| 👤 Dina bilder | Lila | Bilder användaren lagt till |

---

## CSS Grid-layout

Collaget använder CSS Grid:

```css
.image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    max-width: 900px;
    margin: 0 auto;
}

.image-grid img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 8px;
    transition: opacity 0.5s ease;
}
```

---

## Relaterade sidor

- [[Lightbox funktionalitet]] - Fullskärmsvisning
- [[localStorage och lagring]] - Hur användarbilder sparas
- [[Home]] - Tillbaka till startsidan

---

## Externa resurser

- [MDN: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) - Grid-referens
- [MDN: setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) - Timer-funktionen
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) - Grid-guide

