// Wartet, bis das gesamte HTML geladen ist
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('toggle_darkmode');
    const currentTheme = localStorage.getItem('theme');

    // 1. Prüfen, ob der Nutzer schon mal da war und eine Präferenz gespeichert hat
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateButtonText(currentTheme);
    }

    // 2. Klick-Event für den Button
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }

        // Theme auf das <html> Element setzen
        document.documentElement.setAttribute('data-theme', theme);
        
        // Auswahl dauerhaft im Browser speichern
        localStorage.setItem('theme', theme);
        
        updateButtonText(theme);
    });

    // Hilfsfunktion für den Button-Text
    function updateButtonText(theme) {
        themeBtn.textContent = theme === 'dark' ? 'Lightmode' : 'Darkmode';
    }
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        
        const data = new FormData(event.target);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Erfolg
                formStatus.textContent = "Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.";
                formStatus.style.display = "block";
                formStatus.style.backgroundColor = "#dcfce7"; // Hellgrün
                formStatus.style.color = "#166534";
                contactForm.reset(); // Leert das Formular
            } else {
                // Fehler vom Server
                throw new Error();
            }
        } catch (error) {
            // Netzwerkfehler
            formStatus.textContent = "Hoppla! Da gab es ein Problem. Bitte versuchen Sie es später erneut.";
            formStatus.style.display = "block";
            formStatus.style.backgroundColor = "#fee2e2"; // Hellrot
            formStatus.style.color = "#991b1b";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Nachricht senden';
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((section) => {
    observer.observe(section);
});