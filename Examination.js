import Question from "./Question.js";
class Examination {
  constructor(questions, timeLimit) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.timeLimit = timeLimit;
    this.timer = null;
    this.count = 0;
    this.countPage = 1;
    this.startTimer();
    this.renderQuestion();
    this.updateProgressBar();
  }

  startTimer() {
    let timeRemaining = this.timeLimit;
    const timerElement = document.getElementById("time");

    this.timer = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(this.timer);
        this.timeOut();
      } else {
        timeRemaining--;
        timerElement.textContent = `${Math.floor(timeRemaining / 60)}:${
          timeRemaining % 60
        }`;
        this.updateProgressBar(timeRemaining);
      }
    }, 1000);
  }

  renderQuestion() {
    const questionContainer = document.getElementById("questions-container");
    questionContainer.innerHTML = "";
    document.getElementById("count").textContent = this.countPage;

    const question = this.questions[this.currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionText = document.createElement("p");
    questionText.style.fontSize = "30px";
    questionText.style.fontWeight = "600px";
    questionText.textContent = question.questionText;
    questionElement.appendChild(questionText);

    question.options.forEach((option) => {
      const optionCard = document.createElement("div");
      optionCard.classList.add("option-card");
      optionCard.textContent = option;
      optionCard.addEventListener("click", () => {
        console.log("x");
        if (!question.selectedAnswer) {
          this.count += 1;
          document.getElementById("answered-count").textContent = this.count;
          document.getElementById("remaining-count").textContent =
            this.questions.length - this.count;
        }
        question.selectedAnswer = option;
        this.updateProgressBar();

        const allOptionCards = document.querySelectorAll(".option-card");
        allOptionCards.forEach((card) => card.classList.remove("selected"));

        optionCard.classList.add("selected");
      });

      if (question.selectedAnswer === option) {
        optionCard.classList.add("selected");
      }

      questionElement.appendChild(optionCard);
    });

    const bookmarkButton = document.createElement("button");
    bookmarkButton.setAttribute("class", "markQuestion");
    bookmarkButton.textContent = question.isBookmarked ? "unmark" : "mark";
    bookmarkButton.addEventListener("click", () => {
      question.isBookmarked = !question.isBookmarked;
      bookmarkButton.textContent = question.isBookmarked
        ? "unmarked"
        : "marked";
      this.updateBookmarkedQuestions();
    });

    questionElement.appendChild(bookmarkButton);
    questionContainer.appendChild(questionElement);
    let prevBtn = document.querySelector("#prev");
    const next = document.querySelector("#next");
    if (this.currentQuestionIndex === 0) {
      prevBtn.style.display = "none";
    }
    if (this.currentQuestionIndex > 0) {
      console.log("amr");
      prevBtn.style.display = "block";
    }

    if (this.currentQuestionIndex === this.questions.length - 1) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }

  updateProgressBar(timeRemaining) {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage =
      ((this.timeLimit - timeRemaining) / this.timeLimit) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

  updateBookmarkedQuestions() {
    const bookmarkedContainer = document.querySelector(".marked__list");
    bookmarkedContainer.innerHTML = "";

    this.questions.forEach((question, index) => {
      if (question.isBookmarked) {
        const bookmarkItem = document.createElement("div");
        bookmarkItem.classList.add("bookmark-item");
        bookmarkItem.textContent = `Question ${index + 1}`;
        bookmarkItem.addEventListener("click", () => {
          this.currentQuestionIndex = index;
          this.countPage = index + 1;
          this.renderQuestion();
        });
        const markedList = document.getElementById("marked__list");
        markedList.style.overflowY = "auto";
        markedList.style.maxHeight = "240px";
        bookmarkedContainer.appendChild(bookmarkItem);
      }
    });
  }

  nextQuestion() {
    let nextBtn = document.getElementById("next");
    console.log(
      "Current Question Index before increment:",
      this.currentQuestionIndex
    );

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      console.log(
        "Current Question Index after increment:",
        this.currentQuestionIndex
      );

      this.countPage += 1;
      document.getElementById("count").textContent = this.countPage;
      this.renderQuestion();
    }
  }

  previousQuestion() {
    let prevBtn = document.getElementById("prev");
    console.log(this.currentQuestionIndex);

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.countPage -= 1;
      document.getElementById("count").textContent = this.countPage;
      this.renderQuestion();
    }
  }

  submitExam() {
    const date = new Date("9,25,2024");
    clearInterval(this.timer);
    const score = this.calculateScore();
    this.setCookie("examScore", score, date);
    this.setCookie("wrongAnswered", this.questions.length - score, date);
    alert(`
      Your score is ${score}
      Your wrong answers: ${this.questions.length - score}
       `);
    window.location.replace("/result.html");
  }

  timeOut() {
    clearInterval(this.timer);
    window.location.replace("timeout.html");
  }

  calculateScore() {
    let score = 0;
    this.questions.forEach((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        score++;
      }
    });
    return score;
  }

  setCookie(key, value, date) {
    document.cookie = `${key}=${value};expires=${date}`;
  }

  deleteCookie(key) {
    var oldDate = new Date("6,21,2023");
    setCookie(key, "ff", oldDate);
  }

  getCookie(key) {
    var value = null;
    var cookieArr = document.cookie.split(";");
    console.log();
    cookieArr.forEach(function (el) {
      var keyAndvalue = el.split("=");
      if (keyAndvalue[0].trim() == key) {
        value = keyAndvalue[1];
      }
    });

    return value;
  }
}

export default Examination;
