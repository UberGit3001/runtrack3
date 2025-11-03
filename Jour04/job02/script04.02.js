let jsonString = {
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}

function jsonValueKey(jsonString, key) {

    // On convertit le JSON (en string) en un objet JavaScript utilisable
    const obj = JSON.parse(jsonString);

    // On retourne la valeur liée à la clé passée en paramètre
    return obj[key];
}
console.log(jsonValueKey(JSON.stringify(jsonString), "name"));      // Affiche "La Plateforme_"
console.log(jsonValueKey(JSON.stringify(jsonString), "address"));   // Affiche "8 rue d'hozier"
console.log(jsonValueKey(JSON.stringify(jsonString), "city"));      // Affiche "Marseille"
console.log(jsonValueKey(JSON.stringify(jsonString), "nb_staff"));   // Affiche "11"
console.log(jsonValueKey(JSON.stringify(jsonString), "creation"));  // Affiche "2019"       