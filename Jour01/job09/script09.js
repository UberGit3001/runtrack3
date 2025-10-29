function tri(numbers, order) {
    if (order === "asc") {
        numbers.sort((a, b) => a - b); // tri croissant
    } else if (order === "desc") {
        numbers.sort((a, b) => b - a); // tri décroissant
    } else {
        console.log("Erreur : l'ordre doit être 'asc' ou 'desc'");
    }

    return numbers;
}

// Test de la fonction
let tableau = [10, 5, 42, 3, 17, 8];

console.log("Tri ascendant :", tri([...tableau], "asc"));
console.log("Tri décroissant :", tri([...tableau], "desc"));
