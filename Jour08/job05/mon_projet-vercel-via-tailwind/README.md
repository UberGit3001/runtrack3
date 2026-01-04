# mon_projet-vercel-via-tailwind

**Portfolio (HTML/PHP) + Tailwind** — projet d'exemple avec formulaire de contact envoyé via EmailJS.

---

## 📋 Description
Petit projet portfolio qui utilise :
- HTML/PHP pour les pages (includes `inc/header.php`, `inc/footer.php`)
- Tailwind CSS (CDN au départ, compilation locale ensuite)
- Un formulaire de contact front-end contrôlé et envoi via EmailJS (client-side)
- Structure simple pour faciliter l'évolution (assets, styles, api, inc, config)

> Ce README s'arrête à la configuration et test de l'envoi d'email via EmailJS (arrêt demandé : « arrête toi au envoi des mails »).

---

## 📂 Structure principale

```
mon_projet-vercel-via-tailwind/
├─ api/ (endpoints serveurs, ex: send_code.php)
├─ assets/
│   ├─ files/ (CV, documents)
│   ├─ icons/
│   ├─ img/
│   └─ js/ (email.min.js, main.js)
├─ config/ (config.php non committé - stocke secrets)
├─ inc/ (header.php, footer.php, classes.php)
├─ styles/ (input.css, output.css (généré))
├─ .gitignore
├─ .stylelintrc.json
├─ contact.php
├─ index.php
├─ services.php
├─ database.sql
├─ postcss.config.js
├─ tailwind.config.js
├─ package-lock.json
├─ package.json
└─ README.md
```

---

## ⚙️ Prérequis
- PHP (ex. installé via WAMP/XAMPP)
- Node.js + npm
- (Optionnel) Un compte EmailJS pour l'envoi d'emails côté client

---

## Installation & dev

1. Ouvrir un terminal à la racine du projet :

```bash
npm install
```

2. Compiler Tailwind en mode développement (watch) :

```bash
npx tailwindcss -i ./styles/input.css -o ./styles/output.css --watch
```

3. Pour une build de production (minifiée) :

```bash
npx tailwindcss -i ./styles/input.css -o ./styles/output.css --minify
```

> Note : `styles/output.css` est généré automatiquement. En général on **ignore** ce fichier dans Git (voir `.gitignore`) si tu as un pipeline/build sur le serveur.

---

## 🔐 Configuration (secrets)

- Crée `config/config.php` localement et **ne** le commits pas.
- Utilise `config/config.php.example` dans le repo avec des valeurs factices.

Exemple minimal `config/config.php` (NE PAS committer) :

```php
<?php
return [
    'EMAILJS_PUBLIC_KEY' => 'pk_live_XXXX',
    'EMAILJS_SERVICE_ID' => 'service_ABCD',
    'EMAILJS_TEMPLATE_ID' => 'template_1234',
    'MON_EMAIL' => 'moi@exemple.com'
];
```

---

## 📨 Intégration EmailJS (envoi d'email côté client)

1. Crée un compte sur https://www.emailjs.com/
2. Dans le dashboard EmailJS :
   - Crée **Service** (ex: `service_xxx`) lié à ton email provider
   - Crée un **Template** (ex: `template_xxx`) avec les variables attendues (`{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`)
   - Récupère ta **Public Key** (clé publique côté client)

3. Ajoute le script EmailJS dans `inc/header.php` (ou le template head) :

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js"></script>
```

4. Injecte la configuration côté page (ex: `contact.php`) AVANT le chargement de `main.js` :

```php
<?php $config = require __DIR__ . '/config/config.php'; ?>
<script>
  const EMAILJS_CONFIG = <?php echo json_encode([
      'publicKey' => $config['EMAILJS_PUBLIC_KEY'],
      'serviceId' => $config['EMAILJS_SERVICE_ID'],
      'templateId' => $config['EMAILJS_TEMPLATE_ID'],
      'recipientEmail' => $config['MON_EMAIL']
  ], JSON_UNESCAPED_SLASHES); ?>;
</script>
<script src="./assets/js/main.js" defer></script>
```

5. `main.js` : initialiser EmailJS et appeler `emailjs.send(serviceId, templateId, templateParams)` lors du submit du formulaire.

Extrait d'usage côté client (simplifié) :

```js
// initialisation
emailjs.init(EMAILJS_CONFIG.publicKey);

// au submit
emailjs.send(
  EMAILJS_CONFIG.serviceId,
  EMAILJS_CONFIG.templateId,
  {
    from_name: 'Nom',
    from_email: 'user@ex',
    message: 'Bonjour...',
    to_email: EMAILJS_CONFIG.recipientEmail
  }
).then(res => { console.log('Envoyé', res); })
 .catch(err => { console.error(err); });
```

6. Test d'envoi :
   - Ouvre ta page `contact.php` dans le navigateur
   - Remplis le formulaire et soumets
   - Vérifie la console ou la notification de succès

---

## ✅ Conseils de sécurité & bonnes pratiques
- **Ne commit jamais** de clés ou mots de passe (`config/config.php`, `.env`) — ajoute-les à `.gitignore`.
- Stocke une **exemple** de config (`config/config.php.example`) dans le repo pour documenter la structure.
- La clé publique EmailJS peut être utilisée côté client — **ne** publie jamais de clés privées.
- Privilégie des messages d'erreur/retours utilisateur propres (success / error) après l'envoi.

---

Si tu veux, je peux :
- Ajouter `config/config.php.example` automatiquement
- Mettre à jour `.gitignore` selon les règles proposées
- Ajouter un petit script de test pour envoyer un email depuis `contact.php`

Souhaites-tu que j'applique une de ces actions maintenant ? (je m'arrête après l'envoi d'emails, comme demandé)
