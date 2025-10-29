function jourtravaille(date) {

    const joursFeries2020 = [
        new Date(2020, 0, 1),   // 01 janvier
        new Date(2020, 3, 13),  // 13 avril
        new Date(2020, 4, 1),   // 01 mai
        new Date(2020, 4, 8),   // 08 mai
        new Date(2020, 4, 21),  // 21 mai
        new Date(2020, 5, 1),   // 01 juin
        new Date(2020, 6, 14),  // 14 juillet
        new Date(2020, 7, 15),  // 15 août
        new Date(2020, 10, 1),  // 01 novembre
        new Date(2020, 10, 11), // 11 novembre
        new Date(2020, 11, 25)  // 25 décembre
    ];

    const jour = date.getDate();
    const mois = date.getMonth() + 1; // car Janvier = 0
    const annee = date.getFullYear();

    // Vérifier jour férié
    for (let jf of joursFeries2020) {
        if (jf.getDate() === jour && jf.getMonth() === date.getMonth()) {
            console.log(`Le ${jour}/${mois}/${annee} est un jour férié`);
            return;
        }
    }

    // Vérifier week-end (0 = dimanche, 6 = samedi)
    const jourSemaine = date.getDay();
    if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`Non, le ${jour}/${mois}/${annee} est un week-end`);
    }
    else {
        console.log(`Oui, le ${jour}/${mois}/${annee} est un jour travaillé`);
    }
}

// Tests ➜ changent juste ici pour vérifier différents cas
jourtravaille(new Date(2020, 0, 1));  // Jour férié
jourtravaille(new Date(2020, 0, 5));  // Week-end
jourtravaille(new Date(2020, 0, 6));  // Jour travaillé
