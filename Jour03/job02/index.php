<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style03.02.css">
    <title>job02</title>
</head>
<body>
    <h2>Reconstitue l'arc-en-ciel</h2>

<!-- Conteneur des images à mélanger -->
<div id="rainbow-container" class="container">
  <img src="./images/arc1.png" data-order="1" draggable="true">
  <img src="./images/arc2.png" data-order="2" draggable="true">
  <img src="./images/arc3.png" data-order="3" draggable="true">
  <img src="./images/arc4.png" data-order="4" draggable="true">
  <img src="./images/arc5.png" data-order="5" draggable="true">
  <img src="./images/arc6.png" data-order="6" draggable="true">
</div>

<button id="shuffle">Mélanger</button>
<button id="check">Vérifier</button>

<p id="result"></p>

<script src="script03.02.js"></script>

</body>
</html>