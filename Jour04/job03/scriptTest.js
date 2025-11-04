document.getElementById("filter").addEventListener("click", () => {

    const idValue = document.getElementById("id").value.toLowerCase();
    const nameValue = document.getElementById("name").value.toLowerCase();
    const typeValue = document.getElementById("type").value.toLowerCase();

     // On récupère les données JSON du fichier
    fetch("pokemon.json")
        .then(response => response.json())
        .then(data => {

            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; // reset affichage

            // Filtrage des pokémon
            const filtered = data.filter(pokemon => {
                const name = String(pokemon.name ?? "").toLowerCase();
                const type = String(pokemon.type ?? "").toLowerCase();
                const id = String(pokemon.id ?? "");

                const idMatch = idValue === "" || id === idValue;
                const nameMatch = nameValue === "" || name.includes(nameValue);
                const typeMatch = typeValue === "" || type.includes(typeValue);

                return idMatch && nameMatch && typeMatch;
            });

            // Affichage des résultats
            filtered.forEach(poke => {
                const card = document.createElement("div");
                card.className = "pokemon-card";
                card.innerHTML = `
                    <strong>${poke.id} - ${poke.name}</strong><br>
                    Type : ${poke.type}
                `;
                resultsDiv.appendChild(card);
            });

            // Si aucun résultat
            if (filtered.length === 0) {
                resultsDiv.innerHTML = "<p>Aucun Pokémon trouvé </p>";
            }
        })
        .catch(err => console.error("Erreur Fetch :", err));
});
