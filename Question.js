

class Question {
    constructor(questionText, options, correctAnswer) {
      this.questionText = questionText;
      this.options = options;
      this.correctAnswer = correctAnswer;
      this.isBookmarked = false;
      this.selectedAnswer = null;
    }
  }
  
  export default Question;
  