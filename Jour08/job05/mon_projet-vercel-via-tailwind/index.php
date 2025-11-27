l<?php 
$currentPage = 'accueil';
$pageTitle = 'SebNono - Développeur Web & Mobile';
?>

<?php include 'inc/header.php'; ?>

<section class="text-center mt-16 px-4 max-w-4xl mx-auto animate-fadeIn">
    <h1 class="text-4xl md:text-4xl font-extrabold text-purple-600 tracking-tight hover:scale-105 transition-transform duration-300">
        Développeur Web & Mobile
    </h1>

    <p class="text-xl mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Je crée des sites modernes, rapides et responsives avec les dernières technologies
    </p>

    <div class="mt-8 flex gap-4 justify-center flex-wrap">
        <a href="contact.php" class="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center active:bg-purple-900 shadow-purple-200 hover:shadow-xl active:scale-95">
            <i class="fas fa-envelope px-4 mr-2"></i> Me contacter
        </a>
        
        <a href="services.php" class="px-10 py-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition duration-200">
            Voir mes services
        </a>
    </div>
</section>

<section class="mt-20 px-6 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Mes Compétences</h2>
    
    <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <i class="fas fa-code text-purple-600 text-5xl mb-4"></i>
            <h3 class="text-2xl font-semibold mt-4">Développement Web</h3>
            <p class="mt-4 text-gray-600 leading-relaxed">Création de sites modernes avec HTML, CSS, JavaScript, Tailwind et React</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">
            <i class="fas fa-mobile-alt text-purple-600 text-5xl mb-4"></i>
            <h3 class="text-2xl font-semibold mt-4">Mobile First</h3>
            <p class="mt-4 text-gray-600 leading-relaxed">Design responsive qui s'adapte parfaitement à tous les écrans</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">

            <i class="fas fa-rocket text-purple-600 text-5xl mb-4"></i>
            <h3 class="text-2xl font-semibold mt-4">Performance</h3>
            <p class="mt-4 text-gray-600 leading-relaxed">Sites optimisés pour la vitesse et le référencement naturel</p>
        </div>

    </div>
</section>

<?php include 'inc/footer.php'; ?>