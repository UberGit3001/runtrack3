// Fonction pour mettre à jour le tableau
async function updateTable() {
    try {
        const response = await fetch("users.php");
        const users = await response.json();

        const tbody = document.querySelector("#tableUsers tbody");
        tbody.innerHTML = ""; // reset affichage

        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nom}</td>
                <td>${user.prenom}</td>
                <td>${user.email}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Event sur le bouton
document.getElementById("updateBtn").addEventListener("click", updateTable);
