let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let GAME_DISPLAY = document.getElementById("game-container");
let ADD_WORD_DISPLAY = document.getElementById("add-word");
let HOME_PAGE = document.getElementById("homePage");

ctx.lineWidth = 4;
ctx.strokeStyle = "#0A3871";

ctx.beginPath();

//PISO
ctx.moveTo(0, 358);
ctx.lineTo(294, 358);

//PALO VERTICAL
ctx.moveTo(60, 359);
ctx.lineTo(60, 3);

//TECHO
ctx.moveTo(59, 4);
ctx.lineTo(230, 3);

//SOGA
ctx.moveTo(229, 3);
ctx.lineTo(229, 60);

ctx.stroke();
ctx.closePath();

//THE GAME

let options = ["tener", "caracol"];

const words = document.getElementById("words");
const wrongContainer = document.getElementById("wrong-letters");
const container = document.getElementById("wordsContainer");

let selectedWord = options[Math.floor(Math.random() * options.length)];

const correctLetters = [];
const wrongLetters = [];

//DISPLAY HIDDEN LETTERS
function displayWord() {
  keyword();
  container.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
        <span class="letter">
        ${
          correctLetters.includes(letter)
            ? `<span id='singleLetter'>${letter.toUpperCase()}</span>`
            : ""
        }
        </span>
        `
    )
    .join(" ")}`;
  const innerWord = container.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord.toUpperCase()) {
    document.body.style.backgroundColor = "rgba(50,168,82, 0.5)";
    return;
  }
}

//UPDATE WRONG LETTERS
function upgradeWrongLetters() {
  const innerWord = container.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord.toUpperCase()) {
    document.body.style.backgroundColor = "rgba(50,168,82, 0.5)";
    return;
  } else {
    wrongContainer.innerHTML = `
    ${
      wrongLetters.length > 0
        ? wrongLetters
            .map(
              (letter) =>
                `<span id='singleWrong'>${letter.toUpperCase()}</span>`
            )
            .join(" ")
        : ""
    }
    `;
    //Display parts
    const errors = wrongLetters.length;

    if (errors == 1) {
      //CABEZA
      ctx.beginPath();
      ctx.arc(229, 90, 30, -20, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
    if (errors == 2) {
      ctx.beginPath();
      ctx.moveTo(229, 120);
      ctx.lineTo(229, 260);
      ctx.stroke();
      ctx.closePath();
    }
    if (errors == 3) {
      ctx.beginPath();
      ctx.moveTo(229, 120);
      ctx.lineTo(200, 180);
      ctx.stroke();
      ctx.closePath();
    }
    if (errors == 4) {
      ctx.beginPath();
      ctx.moveTo(229, 120);
      ctx.lineTo(258, 180);
      ctx.stroke();
      ctx.closePath();
    }
    if (errors == 5) {
      ctx.beginPath();
      ctx.moveTo(229, 260);
      ctx.lineTo(180, 290);
      ctx.stroke();
      ctx.closePath();
    }
    if (errors == 6) {
      ctx.beginPath();
      ctx.moveTo(229, 260);
      ctx.lineTo(278, 290);
      ctx.stroke();
      ctx.closePath();
    }

    if (errors === 6) {
      document.body.style.backgroundColor = "rgba(168,50,50, 0.8)";
      return;
    }
  }
}

//KEYBOARD WORDS
function keyword() {
  window.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          upgradeWrongLetters();
        }
      }
    }
  });
}

//DESISTIR BTN

let desistirBtn = document.getElementById("desistirBtn");

desistirBtn.addEventListener("click", () => {
  document.location.href = "/";
});

//NUEVO JUEGO BTN

let newGameBtn = document.getElementById("newGameBtn");

newGameBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = options[Math.floor(Math.random() * options.length)];
  document.body.style.backgroundColor = "#f3f5fc";

  upgradeWrongLetters();
  displayWord();
});

//ADD NEW WORD
//Save and start
const regex = /[^a-z ]/;

let saveBtn = document.getElementById("saveBtn");
let input = document.querySelector("textarea");

saveBtn.addEventListener("click", () => {
  let newWord = input.value;
  if (newWord.length > 0 && !regex.test(newWord)) {
    options = [...options, newWord];

    ADD_WORD_DISPLAY.classList.add("display");
    ADD_WORD_DISPLAY.classList.remove("flex");
    GAME_DISPLAY.classList.remove("display");
    GAME_DISPLAY.classList.add("flex");
    displayWord();
    upgradeWrongLetters();
  }
});

//Cancelar btn

let cancelBtn = document.getElementById("cancelBtn");

cancelBtn.addEventListener("click", () => {
  document.location.href = "/";
});

//HOME PAGE

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  HOME_PAGE.classList.remove("flex");
  HOME_PAGE.classList.add("display");
  ADD_WORD_DISPLAY.classList.remove("display");
  ADD_WORD_DISPLAY.classList.add("flex");
});

let startGameBtn = document.getElementById("startGameBtn");

startGameBtn.addEventListener("click", () => {
  HOME_PAGE.classList.remove("flex");
  HOME_PAGE.classList.add("display");
  GAME_DISPLAY.classList.remove("display");
  GAME_DISPLAY.classList.add("flex");
  displayWord();
  upgradeWrongLetters();
});

//logo

let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
  document.location.href = "/";
});
