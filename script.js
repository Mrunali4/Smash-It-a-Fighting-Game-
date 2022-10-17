/* 
🌟 APP: Fighting Game

Create an updateGame() function that will update the DOM with the state of the game 👇
========================================

- updateGame()

These are the 2 classes you must create and their methods 👇
========================================

class Player {
  - strike()
  - heal()
}

class Game {
  - play()
  - checkIsOver()
  - declareWinner()
  - reset()
}

These functions are hard coded in the HTML. So, you can't change their names.

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 ID 👉 'play' = Button to run simulation
#2 ID 👉 'result' = Div that holds the winner of the match
#3 ID 👉 'p1Name' = Div that holds player 1's Name
#4 ID 👉 'p2Name' = Div that holds player 2's Name
#5 ID 👉 'p1Health' = Div that holds player 1's health
#6 ID 👉 'p2Health' = Div that holds player 2's health
*/

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name;
  p2NameDiv.innerText = p2.name;

  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    gameState = true;
    game.isOver = gameState;
    //   if (p2.health < 0) {
    //     resultDiv.innerText = `${p1.name} Wins!`
    //   }
    //   else {
    //     resultDiv.innerText = `${p2.name} Wins!`
    //   }
    // }
    resultDiv.innerText = game.declareWinner(gameState, p1, p2)
  }
  return gameState
}

// ** Create the Player class which can create a player with all it's attributes and methods **
// qazi = new Player('Qazi', 100, 7)
// qazi.name 👉 'Qazi'
// qazi.health 👉 100
// qazi.attackDmg 👉 7
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {

    // Get random number between 1 - 10 and that is damageAmount
    const damageAmount = Math.ceil(Math.random() * 10)
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount;
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState)
    //  Return a message of 'player name attacks enemy name for damageAmount'
    return `player ${player.name} damage enemy by${damageAmount} amount `
  }
  // ** Heal the player for random number from  1 to 5 **
  heal(player) {

    // Get random number between 1 - 5 and store that in hpAmount
    const hpAmount = Math.floor(Math.random() * 5)
    // Add hpAmount to players health
    player.health += hpAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState)
    //  Return a message of 'player name heals for hpAmount HP'
    return `player ${player.name} heal by ${hpAmount} amount`
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {

    // Create a message variable that will hold a message based on the condition
    let message;
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} Wins!`
    }
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} Wins!`
    }
    console.log(message)
    document.getElementById('victory').play();
    return message

  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
    p1.health = 100;
    p2.health = 100;
    resultDiv.innerText = ''
    game.isOver = false;
    gameState = game.isOver
    updateGame(p1, p2, gameState)
  }

  play(p1, p2) {
    reset(p1, p2)
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg);
      p1.heal(p1)
    }
    return this.declareWinner(this.isOver, p1, p2);
  }

}

// ** Create 2 players using the player class **
let player1 = new Player('Nick', 100, 10)
let player2 = new Player('Raynold', 100, 10)

// ** Save original Player Data into a variable in order to reset **
let p1 = player1;
let p2 = player2;
// ** Create the game object from the Game class **
let game = new Game();
// ** Intialize the game by calling updateGame() **
// ** Save intial isOver from the game object inside this variable **
let gameState = game.isOver;
updateGame(p1, p2, gameState)
// console.log(p1.strike(p1, p2, 10))
// console.log(p1.heal(p1));
// game.reset(p1,p2)



// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **


// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == "q" && p2.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg)
    // After striking then play attack sound
    document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == "a" && p2.health > 0) {
    p1.heal(p1)
    // After healing then play heal sound
    document.getElementById('p1heal').play();
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg)
    // After striking then play attack sound
    document.getElementById('p2attack').play();
  }
});
document.addEventListener('keydown', function(e) {
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == "l" && p2.health > 0) {
    p2.heal(p2)
    // After healing then play heal sound
    document.getElementById('p2heal').play();
  }
});




