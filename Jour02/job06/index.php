<?php
// index.php - Job 06 : Konami -> style "La Plateforme_"
// (Fichier autonome : HTML + CSS + JS)
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style06.css" />

  <title>Job 06 — Konami & La Plateforme_</title>
 
</head>
<body>

  <main class="card" role="main">
    <h1>Job 06 — Konami & La Plateforme_</h1>
    <p class="lead">Par défaut, cette page est neutre. Tape le <strong>Code Konami</strong> pour déclencher le thème spécial.</p>

    <div>
      <span class="hint">Séquence : ↑ ↑ ↓ ↓ ← → ← → B A</span>
      <!-- <span class="hint">Séquence : ↑↓ ← →</span> -->
    </div>

    <div style="margin-top:1.2rem;display:flex;gap:12px;align-items:center;">
      <button id="resetBtn" class="btn secondary">Réinitialiser l'effet</button>
      <div id="status" style="margin-left:auto;display:flex;gap:10px;align-items:center">
        <span id="badge" class="konami-badge" style="display:none">Activated</span>
      </div>
    </div>

    <p style="margin-top:1.2rem;opacity:.9">
      Tu peux modifier les couleurs : <code>--pf-primary</code>, <code>--pf-accent</code>, <code>--pf-highlight</code> dans le <code>:root</code>.
    </p>
  </main>

    <script src="script06.js"></script>

</body>
</html>
