<?php
// contact.php
$config = require __DIR__ . '/config/config.php';
$currentPage = 'contact';
$pageTitle = 'SebNono - Contactez-moi';
include 'inc/header.php'; 
?>

    <div id="image-captcha-modal" 
        class="hidden fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-sm transition-opacity duration-300">

        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4     text-center transform scale-95 transition-transform duration-300" id="captcha-modal-content">
                
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Sécurité Visuelle</h3>
            <p class="text-gray-600 mb-6">Prouvez que vous êtes humain.</p>
            
            <div class="mb-6 bg-blue-50 text-blue-800 px-4 py-3 rounded-lg border border-blue-200">
                Cliquez sur l'icône : <span id="target-icon-name" class="font-extrabold uppercase text-xl">...</span>
            </div>

            <div id="icons-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            </div>

            <p id="image-captcha-status" class="h-6 text-sm font-bold"></p>
        </div>
    </div>

    <section class="text-center mt-12 px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold text-purple-600">Contactez-moi</h1>
        <p class="mt-4 text-gray-600 text-lg">Envoyez-moi un message directement via ce formulaire</p>
    </section>

    <div id="top-notification-bar" class="hidden w-full py-3 text-center font-bold text-white transition-all duration-300 fixed top-[80px] z-40 shadow-lg transform -translate-y-full">
    </div>

    <section class="max-w-2xl mx-auto mt-12 bg-white/70 backdrop-blur-sm shadow-xl border border-gray-200 rounded-xl p-8 mb-12">

        <h2 class="text-3xl font-bold text-center mb-8 text-purple-700">Formulaire de contact</h2>

        <form method="POST" action="" class="space-y-6" id="contact-form">

            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-purple-500">Nom</label>
                <div class="relative">
                    <i class="fa-solid fa-id-card absolute top-3 left-3 text-purple-300"></i>
                    <input type="text" id="name" name="name" required
                        class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                        placeholder="Votre nom ..." autocomplete="on">
                </div>
            </div>

            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-purple-500">Email</label>
                <div class="relative">
                    <i class="fa-solid fa-envelope absolute top-3 left-3 text-purple-300"></i>
                    <input type="email" id="email" name="email" required
                        class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                        placeholder="Votre email ..." autocomplete="on">
                </div>
            </div>

            <div>
                <label for="message" class="block mb-2 text-sm font-medium text-purple-500">Message</label>
                <div class="relative">
                    <i class="fa-solid fa-message absolute top-3 left-3 text-purple-300"></i>
                    <textarea id="message" name="message" rows="4" required
                        class="w-full pl-10 pr-3 py-2 focus:outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm resize-none"
                        placeholder="Votre message ..."></textarea>
                </div>
            </div>

            <div id="captcha-container" class="bg-purple-50 border border-purple-200 rounded-lg p-4 animate-fade-in">
                <label class="block mb-2 text-sm font-bold text-purple-700 flex items-center gap-2">
                    <i class="fa-solid fa-robot"></i> Vérification de sécurité
                </label>
                
                <div class="flex flex-col sm:flex-row gap-4 items-center">
                    <div class="text-gray-700 font-medium whitespace-nowrap" id="captcha-question">
                        Calcul en cours...
                    </div>
                    
                    <input type="number" id="captcha-input" 
                        class="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-center"
                        placeholder="Résultat ?">
                    
                    <span id="captcha-status" class="text-sm font-medium hidden"></span>
                </div>
            </div>

            <button type="submit" id="submit-btn" disabled
                class="w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg shadow-md transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-purple-700 hover:shadow-xl">
                <i class="fa-solid fa-paper-plane mr-2"></i> Envoyer
            </button>
        </form>

    </section>

<?php include 'inc/footer.php'; ?>