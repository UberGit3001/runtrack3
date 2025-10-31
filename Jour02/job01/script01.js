const texte = document.getElementById('citation');
const bouton = document.getElementById('button');

function citation() {
    bouton.addEventListener('click', texte);
    console.log(texte.innerText);
    
}