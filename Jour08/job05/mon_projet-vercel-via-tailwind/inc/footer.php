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
</body>
</html>