const container = document.getElementById('container');

const containerGame = document.getElementById('container-game');
const containerScore = document.getElementById('container-score');
const containerMenu = document.getElementById('container-menu');

const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const scoreDisplay = document.getElementById('score-display');
const timer = document.getElementById('timer');

const timeInput = document.getElementById('time');
const textLengthInput = document.getElementById('text-length');

const getRandomWord = async () => {
    const response = await fetch('./dictionary.json');
    const json = await response.json();
    const word = json.indonesia;
    const length = textLengthInput.value;
    return generateSentence(word, length);
}

const generateSentence = (word, length) => {
    let output = '';
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * word.length);
        output += `${word[rand]} `;
    }
    return output;
}

const displayWord = async () => {
    wordDisplay.innerHTML = '';
    wordInput.value = '';
    const word = await getRandomWord();
    const arrayChar = word.split('');
    arrayChar.forEach((char) => {
        const span = document.createElement('span');
        span.innerHTML = char;
        wordDisplay.appendChild(span);
    })
}

wordInput.addEventListener('input', () => {
    const arrayWord = wordDisplay.querySelectorAll('span')
    const arrayValue = wordInput.value.split('')

    arrayWord.forEach((characterSpan, i) => {
      const character = arrayValue[i]
      if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
      }
    })
  
    if (arrayWord.length-1 === arrayValue.length) {
        addScore();
    };
})

let score = 0;
const addScore = () => {
    const correctPoint = wordDisplay.querySelectorAll('span.correct').length;
    score += correctPoint
    scoreDisplay.innerHTML = score;
    displayWord();
}

const resetScore = () => {
    score = 0;
    scoreDisplay.innerHTML = score;
}

const menu = () => {
    containerGame.style.display = 'none';
    containerScore.style.display = 'none';
    containerMenu.style.display = 'flex';
}

const startGame = () => {
    containerMenu.style.display = 'none';
    resetScore();
    displayWord();
    containerGame.style.display = 'flex';
    wordInput.focus();
    let time = timeInput.value;
    timer.innerHTML = time;
    const startTimer = setInterval(() => {
        timer.innerHTML = --time;
        if (time < 1) {
            clearInterval(startTimer);
            endGame();
        }
    }, 1000);
}

const endGame = () => {
    addScore();
    document.getElementById('score').innerHTML = score;
    containerGame.style.display = 'none';
    containerScore.style.display = 'flex';
}

containerMenu.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        startGame();
    }   
})
