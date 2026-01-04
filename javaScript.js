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
   8. Lightbox för att visa bilder i full storlek
   9. Tooltip med datum vid hover
   
   UPPDATERING 2026-01-03:
   - Ersatt Unsplash-bilder med riktiga Twitter-bilder
   - Lagt till input-ruta för nya bilder
   - Lagt till localStorage för att spara bilder
   - Lagt till visning av bildstack
   
   UPPDATERING 2026-01-04 (Issue #2):
   - Utökat från 10 till 16 bilder
   - Lagt till metadata (datum, tweet-URL) för 7 bilder
   - Tooltip vid hover visar bildens datum
   - refs https://github.com/lundgren9/Twitter/issues/2
   
   ============================================ */

// === 1. GLOBALA VARIABLER ===

// UPPDATERING 2026-01-04: Utökad bildbank med 16 bilder från Twitter/X
// Dessa bilder kommer från @kentlundgren på X med hashtag #Bjerredssaltsjobad
// Issue #2: https://github.com/lundgren9/Twitter/issues/2
const defaultImages = [
    // Ursprungliga bilder
    'https://pbs.twimg.com/media/G6SRdvUW0AEJc6G?format=jpg&name=large',
    'https://pbs.twimg.com/media/G6SRdxlWsAAPoIi?format=jpg&name=large',
    'https://pbs.twimg.com/media/G6SeZh_X0AAVPdc?format=jpg&name=large',
    'https://pbs.twimg.com/media/G9gcau5WAAAs3nw?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gx1z6tOWEAEVhU2?format=jpg&name=large',
    'https://pbs.twimg.com/media/GziGQg-WUAAq9GH?format=jpg&name=large',
    'https://pbs.twimg.com/media/G0GQS82W0AA_uyb?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gmvpf-GW4AApxnI?format=jpg&name=large',
    'https://pbs.twimg.com/media/Gqc3dWeXAAAwFqD?format=jpg&name=large',
    'https://pbs.twimg.com/media/GXISy3rWEAEc1-y?format=jpg&name=large',
    // UPPDATERING 2026-01-04: Nya bilder tillagda enligt Issue #2
    'https://pbs.twimg.com/media/G6SRdvLXgAIP5cm?format=jpg&name=large',
    'https://pbs.twimg.com/media/G90MSGoXUAAZ82E?format=jpg&name=large',
    'https://pbs.twimg.com/media/G7abtnfW8AAYksn?format=jpg&name=large',
    'https://pbs.twimg.com/media/G7abtlqWwAE8LeS?format=jpg&name=large',
    'https://pbs.twimg.com/media/GgJNp2wXMAAUUml?format=jpg&name=large',
    'https://pbs.twimg.com/media/GJSzLV4W4AADykr?format=jpg&name=large'
];

// UPPDATERING 2026-01-04: Metadata för bilder med tweet-URL och datum
// Nyckel = bild-ID (från URL), Värde = { tweetUrl, date, text }
// Datum visas vid hover över bilden
const imageMetadata = {
    // Befintlig bild med uppdaterad metadata
    'GziGQg-WUAAq9GH': {
        tweetUrl: 'https://x.com/kentlundgren/status/1961465270280577380',
        date: '2025-08-29',
        text: null
    },
    // NYA bilder tillagda 2026-01-04 (Issue #2)
    'G6SRdvLXgAIP5cm': {
        tweetUrl: 'https://x.com/kentlundgren/status/1991876902991343647/photo/2',
        date: '2025-11-21',
        text: null
    },
    'G90MSGoXUAAZ82E': {
        tweetUrl: 'https://x.com/kentlundgren/status/2007774516928500166/photo/1',
        date: 'år 2025 sista dag: 2025-12-31',
        text: null
    },
    'G7abtnfW8AAYksn': {
        tweetUrl: 'https://x.com/kentlundgren/status/1996954701070307374/photo/2',
        date: 'Blått 25-12-05',
        text: null
    },
    'G7abtlqWwAE8LeS': {
        tweetUrl: 'https://x.com/kentlundgren/status/1996954701070307374/photo/1',
        date: 'Stol 25-12-05',
        text: null
    },
    'GgJNp2wXMAAUUml': {
        tweetUrl: 'https://x.com/kentlundgren/status/1874145779319013598/photo/1',
        date: 'Håkan och Lotta 24-12-31',
        text: null
    },
    'GJSzLV4W4AADykr': {
        tweetUrl: 'https://x.com/kentlundgren/status/1771237567175790644/photo/1',
        date: '24-03-22',
        text: null
    }
};

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
    
    // UPPDATERING 2026-01-03: Sätt upp lightbox för bildvisning
    setupLightbox();
    
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
        
        // UPPDATERING 2026-01-04: Sätt tooltip med datum vid hover
        setImageTooltip(imgElement, imageUrl);
        
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
 * UPPDATERING 2026-01-04: Sätter tooltip (title) för en bild baserat på metadata
 * @param {HTMLElement} imgElement - Bildelementet
 * @param {string} imageUrl - Bildens URL
 */
function setImageTooltip(imgElement, imageUrl) {
    const imageId = extractImageId(imageUrl);
    const metadata = imageMetadata[imageId];
    
    if (metadata && metadata.date) {
        // Visa datum vid hover
        imgElement.title = metadata.date;
        imgElement.parentElement.title = metadata.date; // Sätt även på container
    } else {
        imgElement.title = 'Klicka för att se i full storlek';
        imgElement.parentElement.title = 'Klicka för att se i full storlek';
    }
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
        
        // UPPDATERING 2026-01-04: Uppdatera tooltip med datum
        setImageTooltip(imgElement, newImageUrl);
        
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

// === 8. LIGHTBOX FÖR BILDVISNING ===
// UPPDATERING 2026-01-03: Ny funktionalitet för att visa bilder i fullstorlek

/**
 * Sätter upp lightbox-funktionalitet för bilderna
 * Gör så att man kan klicka på en bild för att se den i full storlek
 */
function setupLightbox() {
    console.log('Sätter upp lightbox...');
    
    // Hämta alla bildslots
    const imageSlots = document.querySelectorAll('.image-slot');
    
    // Lägg till klick-händelse på varje bildslot
    imageSlots.forEach((slot) => {
        slot.style.cursor = 'pointer'; // Visa att bilden är klickbar
        slot.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                openLightbox(img.src);
            }
        });
    });
    
    // Sätt upp stängning av lightbox
    const lightbox = document.getElementById('imageLightbox');
    const closeBtn = document.getElementById('closeLightbox');
    
    if (lightbox && closeBtn) {
        // Stäng vid klick på X
        closeBtn.addEventListener('click', closeLightbox);
        
        // Stäng vid klick utanför bilden
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox || event.target.classList.contains('lightbox-overlay')) {
                closeLightbox();
            }
        });
        
        // Stäng med Escape-tangenten
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
    
    console.log('Lightbox setup klar!');
}

/**
 * Öppnar lightbox med angiven bild
 * @param {string} imageUrl - URL till bilden som ska visas
 */
function openLightbox(imageUrl) {
    console.log('Öppnar lightbox för:', imageUrl);
    
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const openOnXBtn = document.getElementById('openOnXBtn');
    const imageInfo = document.getElementById('lightboxImageInfo');
    
    if (!lightbox || !lightboxImg) {
        console.error('Lightbox-element hittades inte');
        return;
    }
    
    // Sätt bilden
    lightboxImg.src = imageUrl;
    
    // Hämta metadata för bilden om den finns
    const imageId = extractImageId(imageUrl);
    const metadata = imageMetadata[imageId];
    
    // Uppdatera "Öppna på X"-knappen
    if (openOnXBtn) {
        if (metadata && metadata.tweetUrl) {
            // Vi har en känd tweet-URL
            openOnXBtn.href = metadata.tweetUrl;
            openOnXBtn.title = 'Öppna originaltweeten på X';
        } else {
            // Ingen känd tweet-URL - länka till sökning på @kentlundgren
            openOnXBtn.href = 'https://x.com/kentlundgren';
            openOnXBtn.title = 'Besök @kentlundgren på X (tweet-URL okänd)';
        }
    }
    
    // Visa bildinfo om det finns
    if (imageInfo) {
        if (metadata) {
            let infoHtml = '<p><strong>Bildinfo:</strong></p>';
            if (metadata.date) {
                infoHtml += `<p>📅 Datum: ${metadata.date}</p>`;
            }
            if (metadata.text) {
                infoHtml += `<p>💬 "${metadata.text}"</p>`;
            }
            if (!metadata.date && !metadata.text) {
                infoHtml += '<p class="info-note">ℹ️ Datum och text är okänt för denna bild.<br>Klicka "Öppna på X" för att se originaltweeten.</p>';
            }
            imageInfo.innerHTML = infoHtml;
            imageInfo.style.display = 'block';
        } else {
            imageInfo.innerHTML = '<p class="info-note">ℹ️ Ingen metadata tillgänglig för denna bild.<br>Besök @kentlundgren på X för att hitta originaltweeten.</p>';
            imageInfo.style.display = 'block';
        }
    }
    
    // Visa lightbox
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Stänger lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Extraherar bild-ID från en Twitter bild-URL
 * @param {string} url - Bild-URL
 * @returns {string|null} Bild-ID eller null
 */
function extractImageId(url) {
    if (url && url.includes('pbs.twimg.com')) {
        const match = url.match(/media\/([A-Za-z0-9_-]+)/);
        if (match) {
            return match[1];
        }
    }
    return null;
}

// Gör lightbox-funktioner tillgängliga globalt
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// === 9. TWITTER WIDGET FÖR VIDEO ===
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

// === 10. DEBUG & HJÄLPFUNKTIONER ===

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
