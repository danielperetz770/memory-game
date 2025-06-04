
var couplesCount = 10
var flippedCouplesCount = 0
var elPrevCard = null
var isBusy = false
var startTime
var endTime
var score

getUserName()

function onCardClick(elCard) {
    startStopwatch()
    if (elCard.classList.contains('flipped')) {
        return
    }
    if (isBusy) {
        console.log('Im busy!!!')
        return
    }
    if (!startTime) {
        startTime = Date.now()
        console.log('Timer started!')
    }
    elCard.classList.add('flipped')
    console.log(elCard)

    if (elPrevCard === null) {
        console.log('First card')
        elPrevCard = elCard
    } else {

        var card1 = elPrevCard.dataset.card
        var card2 = elCard.dataset.card

        console.log('Second card, cards are: ', card1, card2)

        if (card1 === card2) {
            console.log('Right!')
            var audioRight = new Audio('sound/right.mp3')
            audioRight.play()

            flippedCouplesCount = flippedCouplesCount + 1
            if (flippedCouplesCount === couplesCount) {
                endTime = Date.now()
                score = (endTime - startTime) / 1000
                getBestScore(score)
                console.log('the score:', score)
                var audioWin = new Audio('sound/win.mp3')
                audioWin.play()
                alert('Victory!!')
            }
            elPrevCard = null
        } else {
            console.log('Wrong...')
            var audioWrong = new Audio('sound/wrong.mp3')
            audioWrong.play()
            isBusy = true
            setTimeout(function () {
                console.log('Flipping back')
                elPrevCard.classList.remove('flipped')
                elCard.classList.remove('flipped')
                elPrevCard = null
                isBusy = false
            }, 1000)
        }

    }
}

function playAgain() {
    flippedCouplesCount = 0
    divs = document.querySelectorAll('.card')
    for (var i = 0; i < divs.length; i++) {
        var card = divs[i]
        card.classList.remove('flipped')
    }
    shuffle()
    resetStopwatch()

}

function shuffle() {
    var board = document.querySelector('.board');
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.floor(Math.random() * i)]);
    }
}

function getUserName() {
    var userName = localStorage.getItem('userName');
    if (!userName) {
        var name = prompt('enter a name')
        localStorage.setItem('userName', name);
        showPlayer(name)
    } else {
        showPlayer(userName)
    }
}

function getBestScore(score) {
    var bestScore = localStorage.getItem('best-score');
    if (!bestScore) {
        localStorage.setItem('best-score', score)
    } else {
        if (score < bestScore) {
            localStorage.setItem('best-score', score)
        }
    }

    bestScore = localStorage.getItem('best-score');
    showScore(bestScore)
}

function changeName() {
    var name = prompt('enter a name')
    localStorage.setItem('userName', name);
    showPlayer(name)
}

function showPlayer(name) {
    var elPlayerName = document.querySelector('h1')
    elPlayerName.innerText = 'The player : ' + name
}

function showScore(score) {
    var elScore = document.querySelector('.score')
    elScore.innerText = 'best score : ' + score + 'sec'
}

var stopwatchInterval;
var elapsedTime = 0; // in milliseconds
var running = false;

function startStopwatch() {
  if (running) return;
  running = true;

  var startTime = Date.now() - elapsedTime;

  stopwatchInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 100);
}

function updateDisplay() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  document.getElementById('stopwatch').textContent = hours + ':' + minutes + ':' + seconds;

}

function stopStopwatch() {
  running = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  updateDisplay();
}
