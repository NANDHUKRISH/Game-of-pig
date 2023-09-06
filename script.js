(function () {
    'use strict';

    const player0E = document.querySelector('.player--0');
    const player1E = document.querySelector('.player--1');
    const score0E1 = document.getElementById('score_0');
    const score1E1 = document.getElementById('score_1');
    const diceE1 = document.querySelector('.dice');
    const current0E = document.getElementById('current--0');
    const current1E = document.getElementById('current--1');

    // btns
    const btnRoll = document.querySelector('.btn--roll');
    const btnhold = document.querySelector('.btn--hold');
    const btnNew = document.querySelector('.btn--new');
    let scores, activePlayer, currentScore, playGame;

    
    // initialize fun
    const init = function () {
        score0E1.textContent = 0;
        score1E1.textContent = 0;
        diceE1.classList.add('hidden');

        scores = [0, 0];
        activePlayer = 0;
        currentScore = 0;
        playGame = true;

        current0E.textContent = 0;
        current1E.textContent = 0;
        player0E.classList.remove('player--winner');
        player1E.classList.remove('player--winner');
        player0E.classList.add('player--active');
        player1E.classList.remove('player--active');
    };
    init();

    // Switch the player
    const switchPlayer = function () {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0E.classList.toggle('player--active');
        player1E.classList.toggle('player--active');
    };

    
    // Roll Event
    btnRoll.addEventListener('click', function () {
        if (playGame) {
            diceE1.classList.remove('hidden');

            // 1. generate random number
            const diceRand = Math.floor(Math.random() * 6) + 1;
            // Display random image
            diceE1.src = `.//image/dice-${diceRand}.png`;

            // check for roll 1

            if (diceRand !== 1) {
                currentScore += diceRand;
                // current0E.textContent=currentScore;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            } else {
                switchPlayer();
            }
        }
    });

    // Hold event
    btnhold.addEventListener('click', function () {
        if (playGame) {
            scores[activePlayer] += currentScore;
            document.getElementById(`score_${activePlayer}`).textContent = scores[activePlayer];

            if (scores[activePlayer] >= 50) {
                playGame = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
                diceE1.classList.add('hidden');
            } else {
                switchPlayer();
            }
        }
    });

    // new game event
    btnNew.addEventListener('click', init);
})();
