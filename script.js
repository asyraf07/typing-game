const container = document.getElementById('container');
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
    const arrayWord = word.split('');
    arrayWord.forEach((char, i) => {
        const span = document.createElement('span');
        span.innerHTML = char;
        wordDisplay.appendChild(span);
    })
}

wordInput.addEventListener('input', () => {
    const arrayQuote = wordDisplay.querySelectorAll('span')
    const arrayValue = wordInput.value.split('')

    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
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
  
    if (arrayQuote.length-1 === arrayValue.length) {
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
    document.getElementById('container-game').style.display = 'none';
    document.getElementById('container-score').style.display = 'none';
    document.getElementById('container-menu').style.display = 'flex';
}

const startGame = () => {
    document.getElementById('container-game').style.display = 'flex';
    document.getElementById('container-menu').style.display = 'none';
    displayWord();
    resetScore();
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
    document.getElementById('container-game').style.display = 'none';
    document.getElementById('container-score').style.display = 'flex';
}