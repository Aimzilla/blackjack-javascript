// BLACKJACK

// Card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine",
            "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

// DOM variables
let textArea = document.getElementById('text-area');  //paragraph text
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
//let deck = [];

// hide the hit and stay buttons at the beginning/loading of the game
hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

// handler for when new game button is clicked
newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    // create a deck of cards
    deck = createDeck();
    // shuffle the deck for dealing
    shuffleDeck(deck);
    // each start with 2 cards
    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];
    // hide new game button since game has just started
    newGameButton.style.display = "none";
    // show the hidden hit & stay buttons now that game has started
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
});
 // gives the player another card when they click hit me btn
hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

// no more deals to player and ends game
stayButton.addEventListener("click", function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

// this function compiles the deck of cards
function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            //card object & properties
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

// shuffle the deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let shuffleIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[shuffleIndex];
        deck[shuffleIndex] = deck[i];
        deck[i] = temp;
    }
}


// display what the player is dealt
function getCardString(card) {
    return card.value + " of " + card.suit;
}

// gets the next card for the player
function getNextCard() {
    return deck.shift();
}

// converts card value to calculate score
function getCardNumericValue(card) {
    switch(card.value) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}


function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i ++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score = 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function checkForEndOfGame() {

    updateScores();

    if (gameOver) {
        // let dealer take cards
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <=21) {
            dealerCards.push(getNextCard() );
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else if (playerScore < dealerScore) {
            playerWon = false;
        }
        else if (playerScore === dealerScore) {
            playerWon = false;
        }
    }
}

// displays a welcome message if game hasn't yet started
function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack!";
        return;
    }

    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i ++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i ++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    for (let i = 0; i < deck.length; i++) {
        textArea.innerText += '\n' + getCardString(deck[i]);
    }

    updateScores();

    textArea.innerText =
        "Dealer has:\n" + dealerCardString + "(score: " + dealerScore + ")\n\n" +
        "Player has:\n" + playerCardString + "(score: " + playerScore + ")\n\n";

        if (gameOver) {
            if (playerWon) {
                textArea.innerText = "You win!!";
                updateScores();
            }
            else {
                textArea.innerText = "Dealer wins.";
                updateScores();
            }
            newGameButton.style.display = "inline";
            hitButton.style.display = "none";
            stayButton.style.display = "none";
        }
}



//console.log("Welcome to Blackjack!!");
//console.log("You have been dealt: ");
//console.log(" " + getCardString(playerCards[0]) );
//console.log(" " + getCardString(playerCards[1]) );
