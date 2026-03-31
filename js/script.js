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
        localStorage.getItem('theme', theme);
        
        updateButtonText(theme);
    });

    // Hilfsfunktion für den Button-Text
    function updateButtonText(theme) {
        themeBtn.textContent = theme === 'dark' ? 'Lightmode' : 'Darkmode';
    }
});