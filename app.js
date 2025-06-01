let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");

let turn0 = true; // true -> player O, false -> player X
let xWins = 0;
let oWins = 0;
let draws = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 5, 6],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

    // Show main section with fade-in
    main.classList.remove("hide");
    main.classList.add("fade-in");
    setTimeout(() => {
        main.classList.remove("fade-in");
    }, 500);
};

const updateScoreboard = () => {
    const scoreboard = document.querySelector("#scoreboard");
    scoreboard.innerHTML = `Player X: ${xWins} | Player O: ${oWins} | Draws: ${draws}`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O";
                box.classList.add('o');
                turn0 = false;
            } else {
                box.innerText = "X";
                box.classList.add('x');
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

let disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

let enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('x', 'o');
    }
};

let showWinner = (winner) => {
    msg.innerText = `Congratulations 🎉, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    // Fade out main section
    main.classList.add("fade-out");
    setTimeout(() => {
        main.classList.add("hide");
        main.classList.remove("fade-out");
    }, 500);

    disableBoxes();

    if (winner === "X") {
        xWins++;
    } else {
        oWins++;
    }
    updateScoreboard();
};

let showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");

    // Fade out main section
    main.classList.add("fade-out");
    setTimeout(() => {
        main.classList.add("hide");
        main.classList.remove("fade-out");
    }, 500);

    disableBoxes();
    draws++;
    updateScoreboard();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

updateScoreboard();
