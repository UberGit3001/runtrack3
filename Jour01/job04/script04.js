function bisextile(annee) {
    // Règles pour déterminer si une année est bisextile
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

// Test dans la console
console.log(bisextile(2024)); // true (année bisextile)
console.log(bisextile(2023)); // false (pas bisextile)
console.log(bisextile(2000)); // true (divisible par 400)
console.log(bisextile(1900)); // false (divisible par 100 mais pas 400)
