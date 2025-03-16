let players = [];
let bankMemory = {player_gain: null, player_lose: null, score: 0};

class Player {
    constructor(name) {
        this.name = name;
        this.score = 15000000;
        this.element = playerInjection(this);
    }
    gainMoney(score) {
        this.score += score;
    }
    loseMoney(score) {
        this.score -= score;
    }
    getScore() {
        return this.score;
    }
    getName() {
        return this.name;
    }
    setElement(el) {
        this.element = el;
    }
}
function addPlayer(name, element) {
    if (players.length < 6) {
        players.push(new Player(name, element));
        return players;
    }else {
        alert('Maximum players reached');
        return players;
    }
};

function moneyTransfer(player1, player2, score) { // player1 is the sender and player2 is the receiver
    players.forEach((player) => {
        if (player.name === player1) {
            player.loseMoney(score);
        } else if (player.name === player2) {
            player.gainMoney(score);
        }
    });
}

function transaction() {
    if (bankMemory.score<=0) {
        alert('Please enter a valid amount');
    } else {
        if (bankMemory.player_gain !== null && bankMemory.player_lose !== null) {
            moneyTransfer(bankMemory.player_lose, bankMemory.player_gain, bankMemory.score);
            bankMemory.player_gain = null;
            bankMemory.player_lose = null;
            bankMemory.score = 0;
        } else {
            if (bankMemory.player_gain !== null) {
                bankMemory.player_gain.gainMoney(bankMemory.score);
                bankMemory.score = 0;
                bankMemory.player_gain = null;
            } else if (bankMemory.player_lose !== null) {
                bankMemory.player_lose.loseMoney(bankMemory.score);
                bankMemory.score = 0;
                bankMemory.player_lose = null;
            } else {
                alert('No player selected');
            }
        }   
    }
}

let INPUTS = {
    add_btn : document.getElementById("add"),
    bank_plus : document.getElementById("plus"),
    bank_minus : document.getElementById("minus"),
    bank_score : document.getElementById("bank-input"),
    modal : document.getElementById("modal"),
    execute : document.getElementById("execute"),
    closeModal : document.getElementById("done"),
    newName: document.getElementById("new-name")
}

INPUTS.add_btn.addEventListener('click', () => {
    INPUTS.modal.style.display = "flex";
}) //there will be more once ron finishes the modal
INPUTS.bank_score.addEventListener('change', ()=> {
    bankMemory.score = bank_score.value;
})
INPUTS.execute.addEventListener('click', ()=> {
    transaction();
})
INPUTS.closeModal.addEventListener('click', ()=> {
    INPUTS.modal.style.display = "none";
    players.push(new Player(INPUTS.newName.value));
    INPUTS.newName.value = "";
})

function playerInjection(player){
    // forEach(players, (player) => {
        let playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.id = player.name;
        let player_name = document.createElement('t');
        player_name.innerHTML = player.name;
        playerElement.appendChild(player_name);
        let player_score = document.createElement('c');
        player_score.innerHTML = player.score.toString() + ' $';
        playerElement.appendChild(player_score);
        let player_btns = document.createElement('div');
        player_btns.classList.add("horizontal");
        let plussy = document.createElement('button');
        plussy.innerHTML = "+";
        plussy.classList.add("pm");
        plussy.id = "PlusP";
        plussy.addEventListener("click", ()=>{
            bankMemory.player_gain = player;
        })
        player_btns.appendChild(plussy);
        let minussy = document.createElement('button');
        minussy.innerHTML = "-";
        minussy.classList.add("pm");
        minussy.id = "PlusP";
        minussy.addEventListener("click", ()=>{
            bankMemory.player_lose = player;
        })
        player_btns.appendChild(minussy);
        playerElement.appendChild(player_btns);
        document.getElementById('players').appendChild(playerElement);
    // });
    return playerElement;
}


console.log(document.getElementById("prefab").children);


// let bak_plus = document.getElementById("plus")
