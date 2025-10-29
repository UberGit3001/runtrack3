// Fonction pour vérifier si un nombre est premier
function estPremier(n) {
    if (n < 2) return false; // 0 et 1 ne sont pas premiers
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Fonction pour sommer deux nombres s'ils sont premiers
function sommenombrespremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

// Tests
console.log(sommenombrespremiers(3, 5));   // 8 (les deux sont premiers)
console.log(sommenombrespremiers(4, 5));   // false (4 n'est pas premier)
console.log(sommenombrespremiers(7, 11));  // 18 (les deux sont premiers)
console.log(sommenombrespremiers(6, 8));   // false (aucun des deux n'est premier)
