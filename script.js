(function () {
    let boxes, msgContainer, msg; // Define boxes, msgContainer, and msg outside the event handler

    document.addEventListener("DOMContentLoaded", () => {
        boxes = document.querySelectorAll(".box");
        let results = document.querySelector("#reset");
        msgContainer = document.querySelector(".msgContainer");
        msg = document.querySelector(".msg");

        let turn0 = true; // PlayerX, PlayerO
        let moves = 0; // Track the number of moves
        const maxMoves = 9; // Maximum number of moves
        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];

        const disabledboxes = () => {
            for (let box of boxes) {
                box.disabled = true;
            }
        };

        const enabledboxes = () => {
            for (let box of boxes) {
                box.disabled = false;
                box.innerText = "";
            }
        };

        const ShowWinner = (winner) => {
            msg.innerText = `Congratulation, winner is ${winner} `;
            msgContainer.classList.remove("hide");
            disabledboxes();
        };

        const showTieMessage = () => {
            msg.innerText = "It's a tie!";
            msgContainer.classList.remove("hide");
            disabledboxes();
        };

        const checkWinner = () => {
            for (let pattern of winPatterns) {
                let pos1val = boxes[pattern[0]].innerText;
                let pos2val = boxes[pattern[1]].innerText;
                let pos3val = boxes[pattern[2]].innerText;

                if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
                    if (pos1val == pos2val && pos2val == pos3val) {
                        console.log("winner", pos1val);
                        ShowWinner(pos1val);
                        return true; // Return true if a winner is found
                    }
                }
            }
            return false; // No winner found
        };

        const checkTie = () => {
            return moves === maxMoves;
        };

        // Add click event listeners to each box
  // Add click event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            // Player O
            box.innerText = "O";
            turn0 = false;
        } else {
            // Player X
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        moves++;

        if (checkWinner()) {
            // Handle winner
        } else if (checkTie()) {
            // Handle tie
            showTieMessage();
        }
    });
});

    });

    const resetgame = () => {
        turn0 = true;
        moves = 0;
        enabledboxes();
        msgContainer.classList.add("hide");
    };

    const enabledboxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };

    const newgamebtn = document.getElementById("newgamebtn");
    const resetgamebtn = document.getElementById("resetbtn");

    if (newgamebtn && resetgamebtn) {
        newgamebtn.addEventListener("click", resetgame);
        resetgamebtn.addEventListener("click", resetgame);
    } else {
        console.error("One or both buttons not found.");
    }

})();
