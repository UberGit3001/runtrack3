<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://cdn.tailwindcss.com"></script>
    <link href="./styles/output.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <title><?= $pageTitle ?? 'SebNono-Portfolio' ?></title>
</head>

<body class="bg-gray-100 text-gray-900">
    <header class="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <a href="index.php">
            <img src="./assets/img/Logo_mes_initiales_(250 x 60 px).png" class="w-32 md:w-40" alt="Logo SebNono">
        </a>        
    
        <nav class="hidden md:flex gap-8 text-lg">
            <a href="index.php" class="hover:text-purple-600 transition duration-200 <?= $currentPage === 'accueil' ? 'text-purple-600 font-semibold' : '' ?>">Accueil</a>
            <a href="services.php" class="hover:text-purple-600 transition duration-200 <?= $currentPage === 'services' ? 'text-purple-600 font-semibold' : '' ?>">Services</a>
            <a href="contact.php" class="hover:text-purple-600 transition duration-200 <?= $currentPage === 'contact' ? 'text-purple-600 font-semibold' : '' ?>">Contact</a>
        </nav>

        <button class="md:hidden text-2xl text-gray-700" id="mobileMenuButton">
            <i class="fas fa-bars"></i>
        </button>
    </header>

    <!-- Menu Mobile -->
    <div class="md:hidden hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40" id="mobileMenu">
        <nav class="flex flex-col p-4 gap-4 text-lg">
            <a href="index.php" class="hover:text-purple-600 py-2 px-4 <?= $currentPage === 'accueil' ? 'bg-purple-50 text-purple-600 rounded' : '' ?>">Accueil</a>
            <a href="services.php" class="hover:text-purple-600 py-2 px-4 <?= $currentPage === 'services' ? 'bg-purple-50 text-purple-600 rounded' : '' ?>">Services</a>
            <a href="contact.php" class="hover:text-purple-600 py-2 px-4 <?= $currentPage === 'contact' ? 'bg-purple-50 text-purple-600 rounded' : '' ?>">Contact</a>
        </nav>
    </div>