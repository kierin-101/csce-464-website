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
    }
  ]
  if (index === questions.length) {
    endGame();
    return;
  }

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
        // update score
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
        displayQuestion(index + 1);
      } else {
        endGame();
      }
    });
    answersElement.appendChild(answerButton);
  });
}

function endGame() {
  // update final score
  const finalScoreElement = document.getElementById("finalScoreMessage");
  const score = parseInt(document.getElementById("score").textContent);
  // calculate game over message
  if (score >= 8) {
    finalScoreElement.textContent = "Great job! You got " + score + " out of 10 correct!";
  }
  else if (score >= 5) {
    finalScoreElement.textContent = "Not bad! You got " + score + " out of 10 correct!";
  }
  else {
    finalScoreElement.textContent = "Better luck next time! You got " + score + " out of 10 correct!";
  }
  // hide the question screen
  document.getElementById("gameScreen").style.display = "none";
  // display the end screen
  document.getElementById("endScreen").style.display = "block";
}

function startGame() {
  // hide the start screen
  document.getElementById("startScreen").style.display = "none";
  // hide the end screen
  document.getElementById("endScreen").style.display = "none";
  // make game screen visible
  document.getElementById("gameScreen").style.display = "block";
  displayQuestion(0);
}