<?php 
$currentPage = 'contact';
$pageTitle = 'SebNono - Contactez-moi';
?>

<?php include 'inc/header.php'; ?>

  <!-- HERO -->
  <section class="text-center mt-12 px-4">
    <h1 class="text-4xl md:text-5xl font-extrabold text-seb-purple">Contactez-moi</h1>
    <p class="mt-4 text-gray-600 text-lg">Envoyez-moi un message directement via ce formulaire</p>
  </section>

  <!-- FORMULAIRE -->
  <section class="max-w-2xl mx-auto mt-12 bg-white/70 backdrop-blur-sm shadow-xl border border-gray-200 rounded-xl p-8 mb-12">

    <h2 class="text-3xl font-bold text-center mb-8 text-purple-700">Formulaire de contact</h2>

    <form method="POST" action="#" class="space-y-6">

        <!-- ==== Nom ==== -->
        <div>
            <label for="nom" class="block mb-2 text-sm font-medium text-purple-500">Nom</label>
            <div class="relative">
                <i class="fa-solid fa-id-card absolute top-3 left-3 text-purple-300"></i>
                <input type="text" id="nom" name="nom"
                    class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                    placeholder="Votre nom ..." autocomplete="on">
            </div>
        </div>

        <!-- ==== Email ==== -->
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-purple-500">Email</label>
            <div class="relative">
                <i class="fa-solid fa-envelope absolute top-3 left-3 text-purple-300"></i>
                <input type="email" id="email" name="email"
                    class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                    placeholder="Votre email ..." autocomplete="on">
            </div>
        </div>

        <!-- ==== Text-Area ==== -->
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-purple-500">Message</label>
            <div class="relative">
                <i class="fa-solid fa-message absolute top-3 left-3 text-purple-300"></i>
                <textarea id="message" name="message" rows="4"
                    class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm resize-none"
                    placeholder="Votre message ..."></textarea>
            </div>
        </div>

        <!-- ==== Submit ==== -->
        <button type="submit"
            class="w-full py-3 text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition shadow-md hover:shadow-xl">
            Envoyer
        </button>
    </form>

  </section>

  <!-- FOOTER identique -->
  <?php include 'inc/footer.php'; ?>