// Événement clic sur le bouton "Filtrer"
document.getElementById("filter").addEventListener("click", () => {

    // Récupération des valeurs du formulaire
   
    const idValue = document.getElementById("id").value.trim();
    const nameValue = document.getElementById("name").value.trim().toLowerCase();
    const typeValue = document.getElementById("type").value.trim().toLowerCase();

    // Fetch pour récupérer le JSON
    fetch("pokemon.json")
        .then(response => response.json())
        .then(data => {

            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; // réinitialise l'affichage

            // Filtrage des Pokémon
            const filtered = data.filter(pokemon => {
                // Nom français ou anglais
                const nameFR = String(pokemon.name.french ?? "").toLowerCase();
                const nameEN = String(pokemon.name.english ?? "").toLowerCase();

                // Type (tableau -> on transforme en chaîne pour includes)
                const types = (pokemon.type ?? []).map(t => t.toLowerCase()).join("/");
                // console.log(types);

                // ID comme string pour comparer
                const id = String(pokemon.id ?? "");

                // Comparaisons
                const idMatch = idValue === "" || id === idValue;
                const nameMatch = nameValue === "" || nameFR.includes(nameValue) || nameEN.includes(nameValue);
                const typeMatch = typeValue === "" || types.includes(typeValue);

                return idMatch && nameMatch && typeMatch;
            });

            // Affichage des résultats
            if (filtered.length === 0) {
                resultsDiv.innerHTML = "<p style='color:red;'><strong>Pokémon non trouvé !</strong></p>";
                return;
            }

            filtered.forEach(poke => {
                const card = document.createElement("div");
                card.className = "pokemon-card";

                // Transformation du tableau de types en texte
                const typeText = poke.type.join(" / ");

                // Stats simplifiées
                const stats = `
                    HP: ${poke.base.HP} | 
                    Attack: ${poke.base.Attack} | 
                    Defense: ${poke.base.Defense ?? "-"} |
                    Sp. Attack: ${poke.base["Sp. Attack"] ?? "-"} |
                    Sp. Defense: ${poke.base["Sp. Defense"] ?? "-"} |
                    Speed: ${poke.base.Speed ?? "-"}
                `;

                card.innerHTML = `
                    <h3>${poke.id} - ${poke.name.french} (${poke.name.english})</h3>
                    <p>Type: ${typeText}</p>
                    <p>${stats}</p>
                `;

                resultsDiv.appendChild(card);
            });
        })
        .catch(err => console.error("Erreur Fetch :", err));
});
