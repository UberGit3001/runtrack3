const container = document.getElementById("rainbow-container");
const shuffleBtn = document.getElementById("shuffle");
const checkBtn = document.getElementById("check");
const result = document.getElementById("result");

// Mélanger les images
shuffleBtn.addEventListener("click", () => {
  const images = Array.from(container.children);
  images.sort(() => Math.random() - 0.5);
  images.forEach(img => container.appendChild(img));
  result.textContent = ""; // Réinitialiser le message
});
console.log(container.children);
// Drag & Drop
let dragged = null;

container.addEventListener("dragstart", (e) => {
  dragged = e.target;
  dragged.classList.add("dragging");
});
container.addEventListener("dragend", () => {
  dragged.classList.remove("dragging");
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = [...container.querySelectorAll("img")]
    .find(img => e.clientX < img.getBoundingClientRect().left + img.offsetWidth / 2);
  if (afterElement) {
    container.insertBefore(dragged, afterElement);
  } else {
    container.appendChild(dragged);
  }
});

// Vérifier la bonne position
checkBtn.addEventListener("click", () => {
  const images = [...container.children];
  const isCorrect = images.every((img, index) => img.dataset.order == index + 1);

  if (isCorrect) {
    result.textContent = " Vous avez gagné !";
    result.style.color = "green";
  } else {
    result.textContent = " Vous avez perdu";
    result.style.color = "red";
  }
});
