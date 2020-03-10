/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice1, previousDice2;

// call the init function to start the game
init();


// EVENT LISTENER -------------------------------------------> 

// event listener button roll 
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1 - random number
        // var dice = Math.floor(Math.random() * 6) + 1;          
        var dice1 = randomIntFromInterval(4,6);
        var dice2 = randomIntFromInterval(4,6);
        
        document.querySelector('#dice1').classList.remove('dice-off');
        document.querySelector('#dice2').classList.remove('dice-off');
    
        // 2 - display the result
        var diceDOM1 = document.querySelector('#dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        var diceDOM2 = document.querySelector('#dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
    
        // 3 - update the round score IF the rolled number was not a 1
        if(dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            // check if current dices equal 6 and previous dices different from 6
            if (dice1 === 6 && dice2 === 6){
                resetPlayer();
            } else if(dice1 === 6 && previousDice1 !== 6 ) {
                previousDice1 = dice1;
                previousDice2 = dice2;
            // check if current dices and previous dices equal six to reset complete score of active player
            } else if((dice1 === 6 && previousDice1 === 6) || (dice2 === 6 && previousDice2 === 6) ) {
                console.log('active player: ' + activePlayer + ' dice === 6 && previousDice === 6 >>>>>> RESET');
                resetPlayer();
            }          
        } else {
            // next player
            nextPlayer();            
        }
    }

});

// event listener button hold
document.querySelector('.btn-hold').addEventListener('click', function() { 
    if(gamePlaying) {
        // add current score to player's global score
        scores[activePlayer] += roundScore;

        // reset previous dice value: 
        previousDice1 = 0;
        previousDice2 = 0;
    
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // checking input for final score
        var input = document.querySelector('.winning-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';     
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player 
            nextPlayer();
        }
    }
});

// event listener button new
document.querySelector('.btn-new').addEventListener('click', init);


// FUNCTIONS -------------------------------------------> 

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';     
    document.getElementById('name-1').textContent = 'Player 2';    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active'); 
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.add('active'); 
}


function resetPlayer() {
    scores[activePlayer] = 0;
    roundScore = 0;
    previousDice1 = 0;
    previousDice2 = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.getElementById('score-' + activePlayer).textContent = '0';
    document.querySelector('#dice1').classList.toggle('dice-off');
    document.querySelector('#dice2').classList.toggle('dice-off');
    nextPlayer();
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}