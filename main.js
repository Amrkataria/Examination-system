import Question from "./Question.js";
import Examination from "./Examination.js";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", () => {
  let questions = [];

  (async function fetchQuestions() {
    try {
      const response = await fetch("db (1).json");
      const data = await response.json();
      questions = data.map(
        (q) => new Question(q.questionText, q.options, q.correctAnswer)
      );
      questions = shuffle(questions);

      const exam = new Examination(questions, 3000);
      document
        .getElementById("next")
        .addEventListener("click", () => exam.nextQuestion());
      document
        .getElementById("prev")
        .addEventListener("click", () => exam.previousQuestion());
      document
        .getElementById("submit")
        .addEventListener("click", () => exam.submitExam());
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  })();
});
