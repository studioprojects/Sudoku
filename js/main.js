
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
        'X-RapidAPI-Key': '05f7a8a677mshe2b1b4d6f756062p1d32acjsn58f69be92d9d'
    }
};

fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81---45--"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function () {
    setGame();
}

function setGame() {
    //digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div"); // create <div>
        number.id = i // populates id in <div>
        number.innerText = i; // populates the number <div>i</div>
        number.addEventListener("click", selectNumber); // event listener for numbers at bottom
        number.classList.add("number"); // populates the class in the <div>
        document.getElementById("digits").appendChild(number); // iterates through the HTML
    }

    // board 9x9
    for (let r = 0; r < 9; r++) { // loop rows
        for (let c = 0; c < 9; c++) { // loop columns
            let tile = document.createElement("div"); // create div dynamically
            tile.id = r.toString() + "-" + c.toString(); // create string "r-c" for tile id
            if (board[r][c] != "-") { // check for the dash delimniter and remove it
                tile.innerText = board[r][c];
                tile.classList.add("tile-start"); // highlight squares with numbers in them
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile"); // populates the class in the <div>
            document.getElementById("board").append(tile); // iterates through the HTML
        }
    }
}

function selectNumber() { // function to select numbers at bottom
    if (numSelected != null) {
        numSelected.classList.remove("number-selected"); // if number is highlighted, deselect
    }
    numSelected = this;
    numSelected.classList.add("number-selected"); // if not highlighted, select number
}

function selectTile() { // function to select tile and assign number to it
    if (numSelected) { // conditional to see if a number is selected
        if (this.innerText != "") {
            return; // if the tile isn't empty, do nuthin'
        }
        // this.innerText = numSelected.id; 

        let coords = this.id.split("-"); // remove delimiter and create string of numbers ["0", "1"]
        let r = parseInt(coords[0]); // change from string to integer
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id; // assign that number to the tile
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}