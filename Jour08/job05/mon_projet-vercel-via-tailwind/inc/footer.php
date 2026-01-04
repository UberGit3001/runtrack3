 <footer class="mt-20 py-8 text-center bg-white border-t border-gray-200 text-gray-700">
        <p class="text-lg">
            <i class="far fa-copyright"></i>
            SebNono — <?= date('Y') ?>  
        </p>
        <div class="flex justify-center mt-4 gap-6 text-2xl">
            <a href="#" class="hover:text-purple-600 transition duration-200">
                <i class="fab fa-github"></i>
            </a>
            <a href="#" class="hover:text-purple-600 transition duration-200">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="contact.php" class="hover:text-purple-600 transition duration-200">
                <i class="fas fa-envelope"></i>
            </a>
        </div>
    </footer>

    <script>
        // Menu mobile
        document.getElementById('mobileMenuButton').addEventListener('click', function() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        });
    </script>


    
    <?php if (isset($config) && isset($config['EMAILJS_PUBLIC_KEY'])): ?>
        <script>
            const EMAILJS_CONFIG = <?php 
            echo json_encode([
                'publicKey' => $config['EMAILJS_PUBLIC_KEY'],
                'serviceId' => $config['EMAILJS_SERVICE_ID'],
                'templateId' => $config['EMAILJS_TEMPLATE_ID'],
                'recipientEmail' => $config['MON_EMAIL']
            ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);
            ?>;
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

    <script src="assets/js/menuBurger.js"></script>

    <script src="assets/js/script.js"></script>
    <script src="./assets/js/verif-du-verif.js"></script>
    
    <?php else: ?>
    <script>
        console.log('Mode visiteur : EmailJS non chargé sur cette page.');
    </script>
    <?php endif; ?>

</body>
</html>