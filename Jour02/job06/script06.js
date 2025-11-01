    // Détection Konami (↑ ↑ ↓ ↓ ← → ← → b a)
    (function(){
      const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
      let position = 0;

      const body = document.body;
      const badge = document.getElementById('badge');
      const resetBtn = document.getElementById('resetBtn');

      // appliquer l'état si présent en localStorage
      if (localStorage.getItem('konamiActivated') === '1') {
        activateKonami(false);
      }

      // écoute des touches
      window.addEventListener('keydown', (e) => {
        const key = e.key;

        // normaliser pour les lettres minuscules
        const keyNormalized = (key.length === 1) ? key.toLowerCase() : key;

        if (keyNormalized === konami[position]) {
          position++;
          if (position === konami.length) {
            // séquence complète
            activateKonami(true);
            position = 0;
          }
        } else {
          // mauvais input : reset (mais si tu commences bien avec ArrowUp tu conserves)
          position = (keyNormalized === konami[0]) ? 1 : 0;
        }
      });

      // fonction d'activation
      function activateKonami(save = true){
        body.classList.add('konami');
        badge.style.display = 'inline-grid';
        // animation courte
        badge.animate([
          { transform: 'translateY(-12px)', opacity: 0.2 },
          { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 420, easing: 'cubic-bezier(.2,.9,.4,1)' });

        if (save) localStorage.setItem('konamiActivated','1');
      }

      // reset manuel
      resetBtn.addEventListener('click', () => {
        body.classList.remove('konami');
        badge.style.display = 'none';
        localStorage.removeItem('konamiActivated');
      });
    })();
  