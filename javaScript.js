/* ============================================
   BJERREDS SALTSJÖBAD - BILDCOLLAGE JAVASCRIPT
   ============================================
   
   Detta JavaScript-program hanterar:
   1. Hårdkodade demonstrationsbilder
   2. Automatisk bildväxling var 4:e sekund
   3. Fade-in/fade-out animationer
   4. Modal-fönster för teknisk dokumentation
   
   I framtiden (med X API Basic tier) skulle detta
   kunna kopplas till live-data från Twitter/X.
   
   ============================================ */

// === 1. GLOBALA VARIABLER ===

// Hårdkodad bildbank för demonstration
// I en riktig implementation skulle dessa hämtas från X API
// med sökning på hashtag #Bjerredssaltsjobad
const imagePool = [
    // Placeholder-bilder från Unsplash (relaterade till hav, bad, natur)
    // Dessa representerar bilder som skulle komma från X API
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=800&fit=crop', // Strand
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop', // Strand
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop', // Sjö
    'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=800&fit=crop', // Brygga
    'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=800&fit=crop', // Natur
    'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=800&fit=crop', // Strand
    'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&h=800&fit=crop', // Vatten
    'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=800&fit=crop', // Sjö
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=800&fit=crop', // Strand
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=800&fit=crop', // Vatten
    'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=800&fit=crop', // Brygga
    'https://images.unsplash.com/photo-1520443240718-fce21f665530?w=800&h=800&fit=crop', // Hav
    'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&h=800&fit=crop'  // Strand
];

// Array som håller aktuella bilder som visas (9 stycken för 3x3 grid)
let currentImages = [];

// Index för vilken bild i imagePool som ska hämtas härnäst
let imageIndex = 0;

// Intervall-ID för bildväxlingen (används för att kunna stoppa interval)
let imageRotationInterval;

// === 2. INITIALISERING VID SIDLADDNING ===

// Väntar tills hela DOM:en är laddad innan JavaScript körs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bjerreds Saltsjöbad Collage initialiseras...');
    
    // Ladda de första 9 bilderna
    loadInitialImages();
    
    // Starta automatisk bildväxling var 4:e sekund (4000 millisekunder)
    startImageRotation();
    
    // Sätt upp event listeners för modal-fönstret
    setupModal();
    
    console.log('Initialisering klar!');
});

// === 3. BILDHANTERING ===

/**
 * Laddar de första 9 bilderna vid sidstart
 * Hämtar bilder från imagePool och visar dem i grid:en
 */
function loadInitialImages() {
    console.log('Laddar initiala bilder...');
    
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
        
    }, 800); // 800ms matchar transition-tiden i CSS
}

// === 4. MODAL-HANTERING ===

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

// === 5. FRAMTIDA X API INTEGRATION (KOMMENTERAD KOD) ===

/*
 * Följande kod visar HUR X/Twitter API skulle integreras
 * när du uppgraderat till Basic tier ($100/månad).
 * 
 * Denna kod fungerar INTE med Free tier!
 */

/**
 * EXEMPEL: Hämta tweets med bilder från X API
 * Kräver Basic tier och backend-server på kentlundgren.se
 * 
 * @returns {Promise<Array>} Array med bild-URLs från tweets
 */
/*
async function fetchImagesFromXAPI() {
    console.log('Försöker hämta bilder från X API...');
    
    try {
        // Anropa din backend-proxy (måste skapas på kentlundgren.se)
        // Proxyn gör det riktiga API-anropet till X med din Bearer Token
        const response = await fetch('https://www.kentlundgren.se/twitter-proxy.php');
        
        // Om anropet misslyckades, kasta fel
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parsa JSON-svaret från API
        const data = await response.json();
        
        console.log('API-svar mottaget:', data);
        
        // Extrahera bilder från API-svaret
        // X API returnerar media i "includes.media" arrayen
        const images = [];
        
        // Kontrollera om data innehåller media
        if (data.includes && data.includes.media) {
            // Loopa genom alla media-objekt
            data.includes.media.forEach(media => {
                // Vi vill bara ha foton (inte videos)
                if (media.type === 'photo') {
                    // Lägg till bildens URL i vår array
                    images.push(media.url);
                }
            });
        }
        
        console.log(`${images.length} bilder hämtade från X API`);
        return images;
        
    } catch (error) {
        console.error('Fel vid hämtning från X API:', error);
        
        // Om API-anropet misslyckas, använd hårdkodade bilder som backup
        console.log('Använder hårdkodade backup-bilder istället');
        return imagePool;
    }
}
*/

/**
 * EXEMPEL: Initiera med live-data från X API
 * Denna funktion skulle ersätta loadInitialImages() när API är aktivt
 */
/*
async function loadImagesFromAPI() {
    console.log('Laddar bilder från X API...');
    
    // Visa laddningsindikator
    showLoadingIndicator();
    
    try {
        // Hämta bilder från API
        const apiImages = await fetchImagesFromXAPI();
        
        // Om vi fick bilder från API, använd dem
        if (apiImages && apiImages.length > 0) {
            // Ersätt imagePool med API-bilder
            imagePool.length = 0; // Töm befintlig pool
            imagePool.push(...apiImages); // Lägg till API-bilder
            
            // Ladda de första 9 bilderna
            loadInitialImages();
        } else {
            // Ingen data från API - använd hårdkodade bilder
            console.warn('Inga bilder från API - använder hårdkodade bilder');
            loadInitialImages();
        }
        
    } catch (error) {
        console.error('Fel vid API-laddning:', error);
        // Vid fel, använd hårdkodade bilder
        loadInitialImages();
    } finally {
        // Dölj laddningsindikator oavsett om det lyckades eller inte
        hideLoadingIndicator();
    }
}

function showLoadingIndicator() {
    // Implementera en spinner eller "Laddar..."-text
    console.log('Visar laddningsindikator...');
}

function hideLoadingIndicator() {
    // Dölj spinner/laddningstext
    console.log('Döljer laddningsindikator...');
}
*/

// === 6. DEBUG & HJÄLPFUNKTIONER ===

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
    console.log('Aktuellt bildindex:', imageIndex);
    console.log('Visade bilder:', currentImages);
    console.log('Rotation aktiv:', imageRotationInterval !== undefined);
    console.log('===================');
}

// Gör debug-funktioner tillgängliga globalt för användning i konsolen
window.stopImageRotation = stopImageRotation;
window.debugStatus = debugStatus;

console.log('💡 Tip: Skriv debugStatus() i konsolen för att se aktuell status');
console.log('💡 Tip: Skriv stopImageRotation() i konsolen för att stoppa bildväxlingen');