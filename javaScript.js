/* ============================================
   BJERREDS SALTSJÖBAD - BILDCOLLAGE JAVASCRIPT
   ============================================
   
   Detta JavaScript-program hanterar:
   1. Bilder från Twitter/X med hashtag #Bjerredssaltsjobad
   2. Automatisk bildväxling var 4:e sekund
   3. Fade-in/fade-out animationer
   4. Modal-fönster för teknisk dokumentation
   5. Input-ruta för att lägga till egna bilder
   6. localStorage för att spara användarens bilder
   7. Visning av aktuella bilder och "stack" (väntande bilder)
   
   UPPDATERING 2026-01-03:
   - Ersatt Unsplash-bilder med riktiga Twitter-bilder
   - Lagt till input-ruta för nya bilder
   - Lagt till localStorage för att spara bilder
   - Lagt till visning av bildstack
   
   ============================================ */

// === 1. GLOBALA VARIABLER ===

// UPPDATERING 2026-01-03: Riktiga bilder från Twitter/X med hashtag #Bjerredssaltsjobad
// Dessa bilder kommer från @kentlundgren på X
const defaultImages = [
    'https://pbs.twimg.com/media/G6SRdvUW0AEJc6G?format=jpg&name=large',
    'https://pbs.twimg.com/media/G6SRdxlWsAAPoIi?format=jpg&name=large',
    'https://pbs.twimg.com/media/G6SeZh_X0AAVPdc?format=jpg&name=large',
    'https://pbs.twimg.com/media/G9gcau5WAAAs3nw?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gx1z6tOWEAEVhU2?format=jpg&name=large',
    'https://pbs.twimg.com/media/GziGQg-WUAAq9GH?format=jpg&name=large',
    'https://pbs.twimg.com/media/G0GQS82W0AA_uyb?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gmvpf-GW4AApxnI?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gqc3dWeXAAAwFqD?format=jpg&name=large',
    'https://pbs.twimg.com/media/GXISy3rWEAEc1-y?format=jpg&name=large'
];

// Bildpool som innehåller alla bilder (standard + användarens egna)
let imagePool = [];

// Array som håller aktuella bilder som visas (9 stycken för 3x3 grid)
let currentImages = [];

// Index för vilken bild i imagePool som ska hämtas härnäst
let imageIndex = 0;

// Intervall-ID för bildväxlingen (används för att kunna stoppa interval)
let imageRotationInterval;

// === 2. LOCALSTORAGE HANTERING ===
// UPPDATERING 2026-01-03: Ny funktionalitet för att spara bilder lokalt

/**
 * Laddar sparade bilder från localStorage
 * @returns {Array} Array med sparade bild-URLs
 */
function loadSavedImages() {
    try {
        const saved = localStorage.getItem('bjerred_user_images');
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log(`Laddade ${parsed.length} sparade bilder från localStorage`);
            return parsed;
        }
    } catch (error) {
        console.error('Fel vid laddning från localStorage:', error);
    }
    return [];
}

/**
 * Sparar användarens bilder till localStorage
 * @param {Array} images - Array med bild-URLs att spara
 */
function saveUserImages(images) {
    try {
        localStorage.setItem('bjerred_user_images', JSON.stringify(images));
        console.log(`Sparade ${images.length} bilder till localStorage`);
    } catch (error) {
        console.error('Fel vid sparning till localStorage:', error);
    }
}

/**
 * Hämtar endast användarens tillagda bilder (inte standardbilderna)
 * @returns {Array} Array med användarens bild-URLs
 */
function getUserImages() {
    return imagePool.filter(img => !defaultImages.includes(img));
}

// === 3. INITIALISERING VID SIDLADDNING ===

// Väntar tills hela DOM:en är laddad innan JavaScript körs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bjerreds Saltsjöbad Collage initialiseras...');
    
    // UPPDATERING 2026-01-03: Ladda sparade bilder och kombinera med standardbilder
    initializeImagePool();
    
    // Ladda de första 9 bilderna
    loadInitialImages();
    
    // Starta automatisk bildväxling var 4:e sekund (4000 millisekunder)
    startImageRotation();
    
    // Sätt upp event listeners för modal-fönstret
    setupModal();
    
    // UPPDATERING 2026-01-03: Sätt upp input-ruta för nya bilder
    setupImageInput();
    
    // UPPDATERING 2026-01-03: Uppdatera bildlistorna
    updateImageLists();
    
    // Ladda Twitter widget för video embed
    loadTwitterWidget();
    
    console.log('Initialisering klar!');
});

/**
 * UPPDATERING 2026-01-03: Initialiserar bildpoolen med standard + sparade bilder
 */
function initializeImagePool() {
    // Börja med standardbilderna
    imagePool = [...defaultImages];
    
    // Lägg till sparade användarbilder
    const savedImages = loadSavedImages();
    if (savedImages.length > 0) {
        imagePool = [...imagePool, ...savedImages];
        console.log(`Bildpool initialiserad med ${defaultImages.length} standardbilder + ${savedImages.length} sparade bilder`);
    } else {
        console.log(`Bildpool initialiserad med ${defaultImages.length} standardbilder`);
    }
}

// === 4. BILDHANTERING ===

/**
 * Laddar de första 9 bilderna vid sidstart
 * Hämtar bilder från imagePool och visar dem i grid:en
 */
function loadInitialImages() {
    console.log('Laddar initiala bilder...');
    
    // Töm currentImages
    currentImages = [];
    
    // Loopa genom alla 9 bildplatser (img1 till img9)
    for (let i = 1; i <= 9; i++) {
        // Hämta nästa bild från imagePool
        const imageUrl = getNextImage();
        
        // Spara bilden i currentImages array
        currentImages.push(imageUrl);
        
        // Hämta HTML img-elementet
        const imgElement = document.getElementById(`img${i}`);
        
        // Sätt bildkällan
        imgElement.src = imageUrl;
        
        // Lägg till event listener som lägger till 'loaded' class när bilden laddats
        // Detta triggar fade-in animation via CSS
        imgElement.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Om bilden misslyckas ladda, visa felmeddelande i konsolen
        imgElement.addEventListener('error', function() {
            console.error(`Fel vid laddning av bild ${i}: ${imageUrl}`);
        });
    }
    
    console.log('Initiala bilder laddade:', currentImages);
    
    // UPPDATERING 2026-01-03: Uppdatera bildlistorna
    updateImageLists();
}

/**
 * Hämtar nästa bild från bildpoolen
 * Loopar runt till början när alla bilder använts
 * @returns {string} URL till nästa bild
 */
function getNextImage() {
    // Hämta bild från imagePool på aktuellt index
    const image = imagePool[imageIndex];
    
    // Öka index för nästa gång
    imageIndex++;
    
    // Om vi nått slutet av imagePool, börja om från början
    if (imageIndex >= imagePool.length) {
        imageIndex = 0;
        console.log('Bildpool slut - börjar om från början');
    }
    
    return image;
}

/**
 * Startar automatisk bildväxling med setInterval
 * Byter ut en slumpmässig bild var 4:e sekund
 */
function startImageRotation() {
    console.log('Startar bildväxling (var 4:e sekund)...');
    
    // setInterval kör funktionen varje 4000ms (4 sekunder)
    imageRotationInterval = setInterval(function() {
        rotateRandomImage();
    }, 4000); // 4000 millisekunder = 4 sekunder
}

/**
 * Byter ut en slumpmässigt vald bild mot en ny från imagePool
 * Använder fade-out/fade-in effekt för mjuk övergång
 */
function rotateRandomImage() {
    // Välj en slumpmässig bildposition (1-9)
    const randomPosition = Math.floor(Math.random() * 9) + 1;
    
    console.log(`Byter bild på position ${randomPosition}`);
    
    // Hämta HTML img-elementet för den valda positionen
    const imgElement = document.getElementById(`img${randomPosition}`);
    
    // Ta bort 'loaded' class för att trigga fade-out via CSS
    imgElement.classList.remove('loaded');
    
    // Vänta 800ms (fade-out tiden) innan vi byter bild
    setTimeout(function() {
        // Hämta en ny bild från poolen
        const newImageUrl = getNextImage();
        
        // Uppdatera currentImages array
        currentImages[randomPosition - 1] = newImageUrl;
        
        // Sätt ny bildkälla
        imgElement.src = newImageUrl;
        
        // När bilden laddats, lägg tillbaka 'loaded' class för fade-in
        imgElement.addEventListener('load', function onLoad() {
            imgElement.classList.add('loaded');
            // Ta bort event listener efter användning för att undvika duplicering
            imgElement.removeEventListener('load', onLoad);
        });
        
        // UPPDATERING 2026-01-03: Uppdatera bildlistorna efter byte
        updateImageLists();
        
    }, 800); // 800ms matchar transition-tiden i CSS
}

// === 5. INPUT-RUTA FÖR NYA BILDER ===
// UPPDATERING 2026-01-03: Ny funktionalitet

/**
 * Sätter upp event listeners för input-rutan där användare kan lägga till bilder
 */
function setupImageInput() {
    const addButton = document.getElementById('addImageBtn');
    const imageInput = document.getElementById('imageUrlInput');
    
    if (!addButton || !imageInput) {
        console.warn('Input-element för bilder hittades inte');
        return;
    }
    
    // Lägg till bild när knappen klickas
    addButton.addEventListener('click', function() {
        addNewImage();
    });
    
    // Lägg till bild när Enter trycks i input-fältet
    imageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewImage();
        }
    });
    
    console.log('Input-ruta för bilder uppsatt');
}

/**
 * Lägger till en ny bild från input-fältet till bildpoolen
 */
function addNewImage() {
    const imageInput = document.getElementById('imageUrlInput');
    const url = imageInput.value.trim();
    
    // Validera URL
    if (!url) {
        showMessage('Ange en bild-URL', 'error');
        return;
    }
    
    // Enkel URL-validering
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showMessage('URL måste börja med http:// eller https://', 'error');
        return;
    }
    
    // Kontrollera om bilden redan finns
    if (imagePool.includes(url)) {
        showMessage('Denna bild finns redan i poolen', 'error');
        return;
    }
    
    // Lägg till bilden i poolen
    imagePool.push(url);
    console.log(`Ny bild tillagd: ${url}`);
    
    // Spara användarbilder till localStorage
    saveUserImages(getUserImages());
    
    // Töm input-fältet
    imageInput.value = '';
    
    // Visa bekräftelse
    showMessage('Bild tillagd!', 'success');
    
    // Uppdatera listorna
    updateImageLists();
}

/**
 * Visar ett meddelande för användaren
 * @param {string} message - Meddelandet att visa
 * @param {string} type - 'success' eller 'error'
 */
function showMessage(message, type) {
    const messageEl = document.getElementById('inputMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `input-message ${type}`;
        messageEl.style.display = 'block';
        
        // Dölj meddelandet efter 3 sekunder
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

/**
 * Tar bort en användartillagd bild från poolen
 * @param {string} url - URL:en till bilden som ska tas bort
 */
function removeUserImage(url) {
    // Ta bort från imagePool
    const index = imagePool.indexOf(url);
    if (index > -1) {
        imagePool.splice(index, 1);
        console.log(`Bild borttagen: ${url}`);
        
        // Spara uppdaterad lista
        saveUserImages(getUserImages());
        
        // Uppdatera listorna
        updateImageLists();
        
        showMessage('Bild borttagen', 'success');
    }
}

// Gör removeUserImage tillgänglig globalt för onclick
window.removeUserImage = removeUserImage;

// === 6. BILDLISTOR (VISADE + STACK) ===
// UPPDATERING 2026-01-03: Ny funktionalitet

/**
 * Uppdaterar listorna som visar vilka bilder som visas och vilka som väntar
 */
function updateImageLists() {
    updateCurrentImagesList();
    updateStackList();
    updateUserImagesList();
}

/**
 * Uppdaterar listan över de 9 bilder som visas just nu
 */
function updateCurrentImagesList() {
    const listEl = document.getElementById('currentImagesList');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    currentImages.forEach((url, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="position-badge">${index + 1}</span> ${getImageName(url)}`;
        li.title = url; // Visa full URL vid hover
        listEl.appendChild(li);
    });
}

/**
 * Uppdaterar listan över bilder som väntar i stacken
 */
function updateStackList() {
    const listEl = document.getElementById('stackList');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    // Beräkna vilka bilder som är i stacken (inte visas just nu)
    const stackImages = imagePool.filter(img => !currentImages.includes(img));
    
    if (stackImages.length === 0) {
        listEl.innerHTML = '<li class="empty-message">Alla bilder visas just nu</li>';
        return;
    }
    
    stackImages.forEach((url, index) => {
        const li = document.createElement('li');
        li.innerHTML = getImageName(url);
        li.title = url;
        listEl.appendChild(li);
    });
}

/**
 * Uppdaterar listan över användarens egna tillagda bilder
 */
function updateUserImagesList() {
    const listEl = document.getElementById('userImagesList');
    if (!listEl) return;
    
    const userImages = getUserImages();
    listEl.innerHTML = '';
    
    if (userImages.length === 0) {
        listEl.innerHTML = '<li class="empty-message">Inga egna bilder tillagda</li>';
        return;
    }
    
    userImages.forEach((url) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="user-image-name">${getImageName(url)}</span>
            <button class="remove-btn" onclick="removeUserImage('${url}')" title="Ta bort">×</button>
        `;
        li.title = url;
        listEl.appendChild(li);
    });
}

/**
 * Extraherar ett kortare namn från en bild-URL
 * @param {string} url - Bild-URL
 * @returns {string} Förkortat namn
 */
function getImageName(url) {
    try {
        // För Twitter-bilder, extrahera media-ID
        if (url.includes('pbs.twimg.com')) {
            const match = url.match(/media\/([A-Za-z0-9_-]+)/);
            if (match) {
                return `Twitter: ${match[1].substring(0, 12)}...`;
            }
        }
        
        // För andra bilder, ta sista delen av URL:en
        const parts = url.split('/');
        let name = parts[parts.length - 1];
        
        // Ta bort query parameters
        name = name.split('?')[0];
        
        // Förkorta om för långt
        if (name.length > 25) {
            name = name.substring(0, 22) + '...';
        }
        
        return name;
    } catch (e) {
        return 'Okänd bild';
    }
}

// === 7. MODAL-HANTERING ===

/**
 * Sätter upp event listeners för modal-fönstret
 * Hanterar öppning och stängning av teknisk dokumentation
 */
function setupModal() {
    console.log('Sätter upp modal-fönster...');
    
    // Hämta DOM-element
    const modal = document.getElementById('techModal');
    const openButton = document.getElementById('openModal');
    const closeButton = document.getElementsByClassName('close')[0];
    
    // När användaren klickar på "Teknisk Dokumentation"-knappen
    openButton.addEventListener('click', function() {
        console.log('Öppnar teknisk dokumentation...');
        modal.style.display = 'block'; // Visa modal
        document.body.style.overflow = 'hidden'; // Förhindra scrolling bakom modal
    });
    
    // När användaren klickar på X (stäng-knappen)
    closeButton.addEventListener('click', function() {
        console.log('Stänger teknisk dokumentation...');
        closeModal();
    });
    
    // När användaren klickar utanför modal-innehållet (på bakgrunden)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log('Klick utanför modal - stänger...');
            closeModal();
        }
    });
    
    // Stäng modal med Escape-tangenten
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            console.log('Escape-tangent tryckt - stänger modal...');
            closeModal();
        }
    });
    
    console.log('Modal setup klar!');
}

/**
 * Hjälpfunktion för att stänga modal-fönstret
 */
function closeModal() {
    const modal = document.getElementById('techModal');
    modal.style.display = 'none'; // Dölj modal
    document.body.style.overflow = 'auto'; // Återställ scrolling
}

// === 8. TWITTER WIDGET FÖR VIDEO ===
// UPPDATERING 2026-01-03: Ny funktionalitet för inbäddad video

/**
 * Laddar Twitter widget.js för att rendera inbäddade tweets/videos
 */
function loadTwitterWidget() {
    // Kontrollera om scriptet redan är laddat
    if (window.twttr) {
        console.log('Twitter widget redan laddat');
        return;
    }
    
    // Skapa och lägg till Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    
    script.onload = function() {
        console.log('Twitter widget laddat');
        // Rendera alla Twitter embeds
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    };
    
    document.body.appendChild(script);
}

// === 9. DEBUG & HJÄLPFUNKTIONER ===

/**
 * Stoppar bildväxlingen (användbar för debugging)
 */
function stopImageRotation() {
    if (imageRotationInterval) {
        clearInterval(imageRotationInterval);
        console.log('Bildväxling stoppad');
    }
}

/**
 * Loggar aktuell status till konsolen (för debugging)
 */
function debugStatus() {
    console.log('=== DEBUG STATUS ===');
    console.log('Antal bilder i pool:', imagePool.length);
    console.log('Standardbilder:', defaultImages.length);
    console.log('Användarbilder:', getUserImages().length);
    console.log('Aktuellt bildindex:', imageIndex);
    console.log('Visade bilder:', currentImages);
    console.log('I stacken:', imagePool.filter(img => !currentImages.includes(img)).length);
    console.log('Rotation aktiv:', imageRotationInterval !== undefined);
    console.log('===================');
}

/**
 * Rensar alla användarbilder från localStorage
 */
function clearUserImages() {
    localStorage.removeItem('bjerred_user_images');
    imagePool = [...defaultImages];
    imageIndex = 0;
    loadInitialImages();
    updateImageLists();
    showMessage('Alla användarbilder borttagna', 'success');
    console.log('Användarbilder rensade');
}

// Gör debug-funktioner tillgängliga globalt för användning i konsolen
window.stopImageRotation = stopImageRotation;
window.debugStatus = debugStatus;
window.clearUserImages = clearUserImages;

console.log('💡 Tip: Skriv debugStatus() i konsolen för att se aktuell status');
console.log('💡 Tip: Skriv stopImageRotation() i konsolen för att stoppa bildväxlingen');
console.log('💡 Tip: Skriv clearUserImages() i konsolen för att rensa alla egna bilder');
