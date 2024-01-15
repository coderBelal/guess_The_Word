//  select variable(start)
const inputs = document.querySelector(".inputs"),
  resetBtn = document.querySelector(".reset-btn"),
  hint = document.querySelector(".hint span"),
  guessleft = document.querySelector(".guess-left"),
  wrongLetter = document.querySelector(".wrong-letter span");
typingInput = document.querySelector(".typing-input");
let word,
  maxGuess,
  correct = [],
  incorrect = [];

// select variable (end)
// this function help to guess word with randomly(start)
function randomWord() {
  // getting random object from wordList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // Assign the value to the global variable
  // getting word of random object
  maxGuess = 8;
  correct = [];
  incorrect = [];
  console.log(word);
  hint.innerText = ranObj.hint;
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text disabled"/>`;
  }
  inputs.innerHTML = html;
}

randomWord();
// this function help to guess word with randomly(end)

function initGame(e) {
  const key = e.target.value;
  if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(`${key}`)) {
    console.log(key);
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(`${key}`);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuess--;
      incorrect.push(`${key}`);
    }

    guessleft.innerText = "Remaining-guess:" + maxGuess;
    wrongLetter.innerText = incorrect;
  }

  typingInput.value = "";
  setTimeout(() => {
    if (correct.length === word.length) {
      alert(`Congrats! You Found The Word ${word.toUpperCase()}`);
      randomWord();
    } else if (maxGuess < 1) {
      alert("Game Over! You Don't Have Remaining Guess");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());
