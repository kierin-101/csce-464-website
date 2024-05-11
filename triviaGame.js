let score = 0;

function displayQuestion(index) {
  const questions = [
    {
      question: "What is my major?",
      answers: ["Software Engineering", "Computer Science", "Underwater Basket Weaving", "Mechanical Engineering"],
      correctAnswer: "Software Engineering"
    },
    {
      question: "Where was I born?",
      answers: ["Lincoln", "Omaha", "North Platte", "Benson"],
      correctAnswer: "Omaha"
    },
    {
      question: "Who did I intern for in Summer of 2023?",
      answers: ["Henderson State Bank", "Union Pacific", "Mutual of Omaha", "Nobody"],
      correctAnswer: "Mutual of Omaha"
    },
    {
      question: "What is my favorite programming language?",
      answers: ["Python", "PHP", "C", "JavaScript"],
      correctAnswer: "Python"
    },
    {
      question: "What is my favorite color?",
      answers: ["Red", "Blue", "Green", "Purple"],
      correctAnswer: "Blue"
    },
    {
      question: "What is my favorite food?",
      answers: ["Pizza", "Burgers", "Tacos", "Sushi"],
      correctAnswer: "Tacos"
    },
    {
      question: "What is my favorite movie?",
      answers: ["The Matrix", "The Dark Knight", "Saving Private Ryan", "Interstellar"],
      correctAnswer: "The Dark Knight"
    },
    {
      question: "What is my favorite TV show?",
      answers: ["The Owl House", "Amphibia", "Resident Alien", "Stranger Things"],
      correctAnswer: "The Owl House"
    },
    {
      question: "What is my favorite book series?",
      answers: ["The Hunger Games", "Harry Potter", "Animorphs", "Percy Jackson"],
      correctAnswer: "Animorphs"
    },
    {
      question: "What is my favorite video game?",
      answers: ["The Legend of Zelda: Breath of the Wild", "Super Mario Odyssey", "Hollow Knight", "Baldur's Gate 3"],
      correctAnswer: "Baldur's Gate 3"
    },
    {
      question: "What is my favorite board game?",
      answers: ["Ticket to Ride", "Settlers of Catan", "Risk", "Monopoly"],
      correctAnswer: "Monopoly"
    },
    {
      question: "When did I start programming?",
      answers: ["Middle School", "High School", "College", "Never"],
      correctAnswer: "Middle School"
    },
    // got past 12 questions so start asking the hard ones
    {
      question: "What is my social security number?",
      answers: ["#########", "###-######", "#####-####", "###-##-####"],
      correctAnswer: "###-##-####"
    },
    {
      question: "Who is my blorbo?",
      answers: ["Juan Cena", "Vee Noceda", "Hunter Noceda", "Tibblet Tibblie Grimm Hammer III"],
      correctAnswer: "Vee Noceda"
    },
    {
      question: "How much did I weigh at birth?",
      answers: ["10 lbs 8 oz", "7 lbs 2 oz", "1 lb 6 oz", "3 lbs 5 oz"],
      correctAnswer: "1 lb 6 oz"
    },
    {
      question: "Which eye did I have surgery on in 2021?",
      answers: ["Left", "Right", "Both", "Neither"],
      correctAnswer: "Left"
    },
    {
      question: "Approximately how many hours of sleep do I get per night?",
      answers: ["6", "7", "8", "9"],
      correctAnswer: "7"
    },
    {
      question: "What musical instrument do I play?",
      answers: ["Drums", "Cello", "Clarinet", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      question: "What band did I see in concert in 2024?",
      answers: ["Gloryhammer", "Twilight Force", "Infant Annihilator", "John Cage"],
      correctAnswer: "Gloryhammer"
    },
    {
      question: "What is my favorite type of music?",
      answers: ["Classical", "Metal", "Jazz", "Country"],
      correctAnswer: "Metal"
    }
  ]
  if (index === questions.length) {
    endGame();
    return;
  }
  // set question score to 30 on each question
  let questionScore = 30;
  // decrement question score every second
  const interval = setInterval(() => {
    questionScore -= 1;
    const questionScoreElement = document.getElementById("questionScore");
    questionScoreElement.textContent = questionScore;
    if (questionScore === 0) {
      endGame();
    }

  }, 1000);

  // update question number
  const questionNumberElement = document.getElementById("questionNumber");
  questionNumberElement.textContent = index + 1;

  // update question text
  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[index].question;

  // update answers
  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";
  // loop through answers and create a button for each one
  questions[index].answers.forEach(answer => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", function () {
      if (answer === questions[index].correctAnswer) {
        // clear interval
        clearInterval(interval);
        // update score
        score += questionScore;
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;
        displayQuestion(index + 1);
      } else {
        endGame();
      }
    });
    answersElement.appendChild(answerButton);
  });
}

function endGame() {
  // hide the question screen
  document.getElementById("gameScreen").style.display = "none";
  // display the end screen
  document.getElementById("endScreen").style.display = "block";
  // display name form
  document.getElementById("triviaGameForm").style.display = "block";
  // update final score
  const finalScoreElement = document.getElementById("finalScoreMessage");
  finalScoreElement.textContent = `Your final score is ${score}!`;
}

function startGame() {
  // reset score
  score = 0;
  // update score element
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
  // hide the start screen
  document.getElementById("startScreen").style.display = "none";
  // hide the end screen
  document.getElementById("endScreen").style.display = "none";
  // make game screen visible
  document.getElementById("gameScreen").style.display = "block";
  displayQuestion(0);
}

function submitScore(event) {
  event.preventDefault();
  const name = document.getElementById("triviaGameName").value;
  const abbreviation = document.getElementById("triviaGameAbbreviation").value;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "uploadGameScore.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // clear form
      document.getElementById("triviaGameName").value = "";
      document.getElementById("triviaGameAbbreviation").value = "";
      // hide form
      document.getElementById("triviaGameForm").style.display = "none";
      // show top 10 scores
      showTopScores();
    }
  }
  xhr.send(`player_name=${name}&abbreviation=${abbreviation}&score=${score}`);
}

function showTopScores() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "getGameScores.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // response text is html for table
      document.getElementById("topScores").innerHTML = xhr.responseText;
    }
  }
  xhr.send();
}