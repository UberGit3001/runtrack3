    // Fonction de keylogging
    function keyLogger(event) {
      const textarea = document.getElementById("keylogger");

      // Récupèrer la touche tapée en minuscule
      let key = event.key.toLowerCase();

      // vérifier que c’est bien une lettre de a à z
      if (key >= "a" && key <= "z") {

        // Ajouter une lettre ou deux selon focus ou non sur le textarea
        if (document.activeElement === textarea) {
          textarea.value += key + key; // dupliquer deux fois la lettre dans le textarea
        } else {
          textarea.value += key; // afficher une seule fois la lettre dans le textarea
        }
      }
    }

    // On écoute tous les évènements clavier sur la page
    document.addEventListener("keydown", keyLogger);