// Random Words List
// Words For Each Level
let Easy = [
  "code",
  "html",
  "css",
  "php",
  "go",
  "fish",
  "fox",
  "cafe",
  "web",
  "app",
  "game",
  "sport",
  "eygpt",
  "syria",
  "KSA",
  "USA",
  "UK",
  "UAE",
  "homs",
  "home",
]; // 20
let Normal = [
  "computer",
  "programming",
  "javascript",
  "laravel",
  "english",
  "science",
  "advert",
  "tomato",
  "potato",
  "mobile",
  "application",
  "football",
  "tennis",
  "lebanon",
  "horse",
  "jordan",
  "battery",
  "biology",
  "basket",
  "diploma",
  "carbon",
  "dioxide",
  "display",
  "emotion",
  "kingdom",
]; // 25
let Hard = [
  "programming",
  "telephone",
  "television",
  "abstract",
  "acadimic",
  "absolute",
  "accident",
  "relative",
  "argument",
  "approach",
  "baseball",
  "breeding",
  "assembly",
  "capacity",
  "amberjacks",
  "ambulance",
  "background",
  "backpacker",
  "checkbox",
  "checkmark",
  "deactivate",
  "everything",
  "everything",
  "facebooking",
  "fabricating",
  "quizzical",
  "squeezing",
  "blackjack",
  "keyboard",
  "opreating system",
];

// Object Contains Level And Its Words
const words = {
  /* Level : ArrayOfWords */
  Easy: Easy,
  Normal: Normal,
  Hard: Hard,
};

// Game Levels
const levels = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

// Fetch Game Selector
let startGame = document.querySelector(".start");
let levelNameSpan = document.querySelector(".message .lvl");
let levelTimeSpan = document.querySelector(".message .seconds");
let targetWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let userInput = document.querySelector(".input");
let remainingTime = document.querySelector(".time span");
let score = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finalMessage = document.querySelector(".finish");
let controlDiv = document.querySelector(".control");
let difficult = document.querySelectorAll(".difficult div");

// Default Level <Static>
let defaultLevelName = "Normal";
let defaultLevelTime = levels[defaultLevelName];
// Aux Variable For Select Level Array
let levelNow = defaultLevelName;
// Check Local Storage
if (localStorage.getItem("level")) {
  defaultLevelName = localStorage.getItem("level");
  defaultLevelTime = levels[defaultLevelName];
  levelNow = defaultLevelName;
  difficult.forEach((div) => {
    if (div.getAttribute("data-dif") === localStorage.getItem("level")) {
      div.classList.add("active");
    }
  });
} else {
  difficult.forEach((div) => {
    if (div.getAttribute("data-dif") === defaultLevelName) {
      div.classList.add("active");
    }
  });
}

// Set Level Name & Seconds & Score <Static>
// According To The Previos Static Varibles
writeInfo(defaultLevelName, defaultLevelTime);

// Select Game Difficulty
difficult.forEach((div) => {
  div.addEventListener("click", function () {
    difficult.forEach((all) => {
      all.classList.remove("active");
    });
    this.classList.add("active");
    // Change Static Level Name & Seconds & Score
    let selectedLevelName = this.getAttribute("data-dif");
    let selectedLevelTime = levels[selectedLevelName];
    // According To What User Has Been Selected
    writeInfo(selectedLevelName, selectedLevelTime);

    levelNow = selectedLevelName;
    localStorage.setItem("level", selectedLevelName);
  });
});

/**
 * Recive (Game Level) as param
 *
 * - Handle Dynamic Page Info Depending On Game Level
 *
 * @param {string} name  Game Level.
 * @param {number} time  Level Time.
 */
function writeInfo(name, time) {
  levelNameSpan.innerHTML = name;
  levelTimeSpan.innerHTML = time;
  remainingTime.innerHTML = time;
  scoreTotal.innerHTML = words[name].length;
}

// DOM

// Handle Paste Ev On User Input
userInput.onpaste = function () {
  return false;
};
// Handle Press Enter Event On User Input
let userPressEnter = false; // User Didn't Press Enter Yet
userInput.addEventListener("keypress", (e) => {
  // The Key That Pressed Is "Enter"
  if (e.key === "Enter") {
    userPressEnter = true; // User Has Pressed Enter Key
  }
});

// Start Game
startGame.addEventListener("click", function () {
  // Give User 3 Seconds For First Word To Be Ready
  this.textContent = "Be Ready! Game Will Start Into 2 Seconds";
  // Focus On Input To Start Typing Without Waste Any Seconds ...
  userInput.focus();
  // Prevent User From Change Level After Starting Game
  difficult.forEach((div) => {
    div.style.pointerEvents = "none";
  });
  // Wait 3 Seconds The Start Generating Words
  setTimeout(() => {
    // Remove Start Play Button
    this.remove();
    // Call Generating Words Function
    generateWord(levelNow);
  }, 3000);
});
/**
 * Recive (Game Level) as param
 *
 * - Generating a Random Word Depending On Game Level
 * - Writing Remaining Words To Be Showen To The User
 * @param {string} gameLevel  Game Level.
 */
function generateWord(gameLevel) {
  // Get Random Word From Array
  let randomWord =
    words[gameLevel][Math.floor(Math.random() * words[gameLevel].length)];
  //  Get word index
  let wordIndex = words[gameLevel].indexOf(randomWord);
  //  Remove The Word From The Array
  words[gameLevel].splice(wordIndex, 1);
  //   Add Words To Upcoming Words Div
  generateUpComingWords(words[gameLevel]);
  //   Show Target Word
  targetWord.innerHTML = randomWord;
  //   Start Play Function
  startPlay(gameLevel);
}
/**
 * - Recive (Game Level) as param
 * - Control Timing Depending On Game Level Then Check Between Words
 * @param {string} gameLevel  Game Level.
 */
function startPlay(gameLevel) {
  // Reset Time
  remainingTime.innerHTML = defaultLevelTime;
  let start = setInterval(() => {
    // Start Decreasing Time
    remainingTime.innerHTML--;

    // If Time Ended OR User Press Enter
    if (remainingTime.innerHTML === "0" || userPressEnter) {
      // Reset Press Enter Variable
      userPressEnter = false;

      // Stop Timer
      clearInterval(start);

      //   Compare Words
      checkWord(gameLevel);
    }
  }, 1000);
}
/**
 * [Recive (Game Level) as param]
 * - Checking the word the user is typing and the word to be typed
 * @param {string} gameLevel  Game Level.
 */
function checkWord(gameLevel) {
  if (targetWord.innerHTML.toLowerCase() === userInput.value.toLowerCase()) {
    // Make User Input Empty For Next Word
    userInput.value = "";

    // Increase User Score
    score.innerHTML++;

    // If There Are Remaining Elements
    if (words[gameLevel].length > 0) {
      // Call Generate Random Word Function
      generateWord(gameLevel);
    } else {
      // The User Has Answered All Words Correctly
      finalResult(true);
    }
  } else {
    // If There Is Wrong Input And Time Been Ended
    finalResult(false);
  }
}

/**
 * - Recive (Game Level Words) as param
 * - Show Remaining Words In The Page
 * @param {string[]} words  Game Level.
 */
function generateUpComingWords(words) {
  // Emptying upcoming words
  upcomingWords.innerHTML = "";
  //   Looping on every word
  words.forEach((word) => {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(word);
    // Add Text To Div
    div.appendChild(txt);

    // Add Div To Upcoming Words
    upcomingWords.appendChild(div);
  });
}

/**
 * [Recive (User Result) as param]
 * - Depending On The Result If
 * - [true] <=> The User Has Answered All Words Correctly
 * --- [false] <=> There Is Wrong Input And Time Been Ended
 * @param {boolean} result  User Result.
 */
function finalResult(result) {
  let div = document.createElement("div");
  let playAgainBtn = document.createElement("button");
  playAgainBtn.innerHTML = "restart";
  if (result) {
    div.className = "good";
    div.innerText = "Winner";
  } else {
    div.className = "bad";
    div.innerText = "Game Over";
  }
  userInput.remove();
  targetWord.remove();
  upcomingWords.remove();
  finalMessage.appendChild(div);
  finalMessage.appendChild(playAgainBtn);
  playAgainBtn.onclick = function () {
    location.reload();
  };
}

/* 
    - Save score to local storage with date مالا داعي====
    - Break the logic to more functions XXX
    - Write game instructions with dynamic values
    - Add 3 seconds for only first word XXXX
*/
