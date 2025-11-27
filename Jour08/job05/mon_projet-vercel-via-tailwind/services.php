<?php 
$currentPage = 'services';
$pageTitle = 'SebNono - Mes Services';
?>

<?php include 'inc/header.php'; ?>

  <!-- HERO -->
  <section class="text-center mt-12 px-4">
    <h1 class="text-4xl md:text-5xl font-extrabold text-seb-purple">Mes Services</h1>
    <p class="mt-4 text-gray-600 text-lg">Découvrez ce que je peux créer pour vous</p>
  </section>

  <!-- SERVICES CARDS -->
  <section class="mt-12 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Développement Web -->
    <div class="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transition text-center">
      <i class="fas fa-code text-seb-purple text-4xl"></i>
      <h3 class="text-2xl font-semibold mt-4">Développement Web</h3>
      <p class="mt-2 text-gray-600">HTML, CSS, JS, Tailwind, React</p>
    </div>
    <!-- Mobile First -->
    <div class="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transition text-center">
      <i class="fas fa-mobile-alt text-seb-purple text-4xl"></i>
      <h3 class="text-2xl font-semibold mt-4">Mobile First</h3>
      <p class="mt-2 text-gray-600">Responsive sur tous les écrans</p>
    </div>
    <!-- Performance -->
    <div class="bg-white p-6 rounded-lg shadow hover:-translate-y-1 transition text-center">
      <i class="fas fa-rocket text-seb-purple text-4xl"></i>
      <h3 class="text-2xl font-semibold mt-4">Performance</h3>
      <p class="mt-2 text-gray-600">Sites rapides & optimisés SEO</p>
    </div>
  </section>

  <!-- FOOTER -->
 <?php include 'inc/footer.php'; ?>