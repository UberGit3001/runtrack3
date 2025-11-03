const board = document.getElementById("board");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restartBtn");

    let tiles = [1,2,3,4,5,6,7,8,9]; // 9.png = vide
    let emptyIndex = 8; // la case vide au départ

    function shuffle() {
        for (let i = tiles.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        emptyIndex = tiles.indexOf(9);
    }

    function render() {
        board.innerHTML = "";
        tiles.forEach((num, i) => {
            let tile = document.createElement("img");
            tile.src = "images/" + num + ".png";
            tile.classList.add("tile");

            if (num === 9) {
                tile.style.opacity = "0"; 
            }

            tile.addEventListener("click", () => moveTile(i));
            board.appendChild(tile);
        });
    }

    function moveTile(index) {
        const adj = [index - 1, index + 1, index - 3, index + 3];
        if (adj.includes(emptyIndex)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            emptyIndex = index;
            render();
            checkWin();
        }
    }

    function checkWin() {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] !== i + 1) {
                message.textContent = "";
                return;
            }
        }
        message.textContent = "Vous avez gagné !";
        message.style.color = "green";
        blockGame();
    }

    function blockGame() {
        const images = document.querySelectorAll(".tile");
        images.forEach(img => img.style.pointerEvents = "none");
    }

    function restart() {
        shuffle();
        render();
        message.textContent = "";
        message.style.color = "";
    }

    restartBtn.addEventListener("click", restart);

    restart(); // Lancement automatique au chargement