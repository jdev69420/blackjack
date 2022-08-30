// 2. Create the player object. Give it two keys, name and chips, and set their values
var name = window. prompt("Enter your name: ")

let cards = []
let dealerCards = []
let sum = 0
let dealersSum = 0
let bet = 0
let chips = 100
let hasBlackJack = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerSumEl = document.getElementById("dealerssum-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let totalBetEl = document.getElementById("totalbet-el")
let winningEl = document.getElementById("winning-el")
let isendTurn = false
let stand = false
let dealerBusted = false
let playerBusted = false
let gameStarted = false
playerEl.textContent = name + ": $" + chips
totalBetEl.textContent = "Bet: " + "$" + bet

function startGame() {
    if (bet > 0) { 
    gameStarted = true
    hasBlackJack = false
    playerBusted = false
    dealerBusted = false
    isendTurn = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard] // array - ordered list of items
    sum = firstCard + secondCard
    let dealerCardOne = getRandomCard()
    let dealerCardTwo = getRandomCard()
    dealerCards = [dealerCardOne, dealerCardTwo]
    dealersSum = dealerCardOne + dealerCardTwo
    renderGame()
    dealersCard()
    } else {
        messageEl.textContent = "Place a bet before clicking start game"
    }

}

function dealersCard() {
    dealerCardsEl.textContent = "Cards: " + dealerCards[0]
    dealerSumEl.textContent = "sum: " + "?"
}

function renderGame() {
    if (sum == 21) {
        blackjack()
    }
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else if (sum > 21) {
        playerBusted = true
        busted()
    }
    messageEl.textContent = message
    }


function hit() {
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if (!gameStarted == false){
    if (sum < 21 && hasBlackJack === false && gameStarted === true) {
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
    } 
    stand = true
    } else {
        messageEl.textContent = "Please start the game first!"
    }
}


// Make this function return a random number between 1 and 12
function getRandomCard() {
    let number = Math.floor(Math.random() * 12) + 1
    if (number > 10)
    {
        return 10
    } else if (number === 1) {
        return 11
    } else {
        return number
    }
}

function endTurn() {
    if (!gameStarted == false) {
    if (isendTurn == false) {
    dealerResults()
    }
 } else {
    messageEl.textContent = "Please start the game first!"
 }
}

 function dealerResults() {
    console.log(dealersSum)
    isendTurn = true
    dealerCardsEl.textContent = "Cards: "
    for (let dealerCard = getRandomCard(); dealersSum < 17; dealersSum += dealerCard) {
        dealerCards.push(dealerCard)
    }
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsEl.textContent += dealerCards[i] + " "
        }
    
        dealerSumEl.textContent = "sum: " + dealersSum
        dealerEnd()
    }


function dealerEnd() {

    
    if (dealersSum > 21) {
        dealerBusted = true
        busted() 
    }
    messageEl.textContent = message
    if (dealerBusted == false && playerBusted == false) {
        result()
    }
    }

function result() { 
    if (dealersSum > sum) {
        chips -= bet
        message = "Dealer wins!"
        final = "Player lost $" + bet
    } else if (dealersSum == sum) {
        chips = chips 
        message = "Push!"
        final = "Player pushed"
    } else if (sum > dealersSum) {
        chips += bet
        message = "Player wins!"
        final = "Player won $" + bet
    }
    winningEl.textContent = final
    messageEl.textContent = message
    playerEl.textContent = name + " $" + chips
    gameStarted = false
    removeBets()
}

function busted() {
    if (playerBusted == true) {
        chips -= bet
        final = "Player lost $" + bet
        messageEl.textContent = "Player busted"
    } else if (dealerBusted == true) {
        chips += bet
        final = "Player won $" + bet
        messageEl.textContent = "Dealer busted."
    }
    winningEl.textContent = final
    playerEl.textContent = name + " $" + chips

}

function one(){
    if (chips - bet > 0) {
        bet ++ 
    totalBetEl.textContent = "bet: $" + bet  
    } else {
        messageEl.textContent = "insufficient funds"
    }
}

function five(){
    if (chips - (bet + 5) >= 0) {
        bet += 5 
    totalBetEl.textContent = "bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}

function ten(){
    if (chips - (bet + 10) >= 0) {
    bet += 10 
    totalBetEl.textContent = "bet: $" + bet 
    } else {
        messageEl.textContent = "insufficient funds"
    }
}

function double() {
    if (chips - (bet*2) >= 0) {
        bet *= 2 
        totalBetEl.textContent = "bet: $" + bet 
        } else {
            messageEl.textContent = "insufficient funds"
        }
    }

function removeBets () {
    bet = 0
    totalBetEl.textContent = "bet $" + bet
}

function replenish() {
    if (chips < 10) {
        chips += 100
        playerEl.textContent = name + ": $" + chips    
    } else {
        messageEl.textContent = "You must have less than $10 to Replenish"
    }
}

function blackjack() {
    chips += (bet * 1.5)
    playerEl.textContent = name + ": $" + chips    
    winningEl.textContent = "Player was dealth blackjack! Winnings 1.5"
    messageEl.textContent = "Player has blackjack!"
    hasBlackJack = true
    gameStarted = false
}