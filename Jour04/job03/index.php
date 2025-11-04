<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 03 - Pokémon Filter</title>
    <link rel="stylesheet" href="style04.03.css">
</head>
<body>

    <h1>Filtrer les Pokémon</h1>

    <!-- Formulaire -->
    <div class="filter-box">
        <label for="id">ID :</label>
        <input type="text" id="id" placeholder="Ex : 25">

        <label for="name">Nom :</label>
        <input type="text" id="name" placeholder="Ex : Pikachu">

        <label for="type">Type :</label>
        <select id="type">
            <option value="">-- Choisir un type --</option>          
            <option value="Grass">Grass</option>
            <option value="Poison">Poison</option>
            <option value="Fire">Fire</option>
            <option value="Flying">Flying</option>
            <option value="Water">Water</option>
            <option value="Bug">Bug</option>
            <option value="Normal">Normal</option>
            <option value="Electric">Electric</option>
            <option value="Ground">Ground</option>
            <option value="Fairy">Fairy</option>
            <option value="Fighting">Fighting</option>
            <option value="Psychic">Psychic</option>
            <option value="Rock">Rock</option>
            <option value="Steel">Steel</option>
            <option value="Ice">Ice</option>
            <option value="Dragon">Dragon</option>
            <option value="Ghost">Ghost</option>
        </select>
        

        <button id="filter">Filtrer</button>
    </div>

    <!-- Résultats -->
    <div id="results"></div>

    <script src="script04.03.js"></script>
</body>
</html>
