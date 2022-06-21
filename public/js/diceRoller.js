var game = {

  // pas obligatoire
  nbDices: null,

  // propriétés
  victory: 0,
  defeat: 0,

  ingame: false,


  // méthodes
  init: function() {
    var playBtn = document.getElementById('play');


    playBtn.addEventListener('click', game.start);

    // on préférera keyup à keypress ici -> relaché qu'une fois
    document.addEventListener('keyup', function(event) {

      if (event.code === 'Space') {
        game.start();
      }
    });

    game.boards = document.querySelectorAll('.board');

    game.diceNumberInput = document.getElementById('dice-number-input');

    game.diceNumberInput.addEventListener('input', game.changeNumber);

    var gameForm = document.getElementById('game-form');

    gameForm.addEventListener('submit', game.play);
    

    game.changeNumber();
  },


  start: function() {

    document.getElementById('welcome').classList.add('hidden');

    document.getElementById('app').classList.remove('hidden');
  },

  changeNumber: function() {
    var diceNumberElement = document.getElementById('dice-number');

    game.nbDices = game.diceNumberInput.value;
    diceNumberElement.textContent = game.nbDices;
  },

  play: function(event) {

    event.preventDefault();

    if(!game.ingame) {

      game.ingame = true;


      game.reset();


      game.playerScore = game.createAllDices('player');


      setTimeout(game.dealerPlay, 3000);


      game.createCounter();
    }
  },


  reset: function() {

    for (var boardIndex = 0; boardIndex < game.boards.length; boardIndex++) {

      game.boards[boardIndex].innerHTML = '';
    }
  },


  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


  createAllDices: function(player) {

    var score = 0;

    for (var nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
      var diceScore = game.createDice(player);
      // on ajoute la valeur au score
      score += diceScore;
    }
    // on retourne le score
    return score;
  },

  // on récupère l'index du joueur en paramètre pour incrémenter son score
  createDice: function(player) {
    // on crée un div
    var dice = document.createElement('div');
    // on récupère un nombre aléatoire
    var diceValue = game.getRandom(1, 6);
    var imageOffset = (diceValue - 1) * 100;
    dice.className = 'dice';
    dice.textContent = '';
    dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';
    document.getElementById(player).appendChild(dice);

    return diceValue;
  },

  dealerPlay: function() {

    var dealerScore = game.createAllDices('dealer');

    if(dealerScore > game.playerScore) {
      game.defeat++;
    }

    else if(dealerScore < game.playerScore) {
      game.victory++;
    }
    game.displayResult('player', game.victory);
    game.displayResult('dealer', game.defeat);

    game.ingame = false;
  },

  displayResult: function(board, counter) {
    var result = document.createElement('div');
    result.className = 'result';
    result.textContent = counter;
    document.getElementById(board).appendChild(result);
  },


  createCounter: function() {

    game.counter = 3;

 
    game.counterElement = document.createElement('div');
    game.counterElement.textContent = game.counter;
    game.counterElement.className = 'counter';
    document.getElementById('app').appendChild(game.counterElement);


    game.counterInterval = setInterval(game.countdown, 1000);
  },

  // méthode pour décrémenter le compteur
  countdown: function() {
    // on décrémente le compteur
    game.counter--;

    // on met à jour l'élement dans le DOM
    game.counterElement.textContent = game.counter;

    // si on arrive à 0
    if (game.counter === 0) {
      game.deleteCounter();
    }
  },


  deleteCounter: function() {
    // on stoppe l'interval
    clearInterval(game.counterInterval);


    game.counterElement.remove();
  },
};


document.addEventListener('DOMContentLoaded', game.init);
