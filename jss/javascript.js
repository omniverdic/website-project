function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
};

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
};


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // visa fråga
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // visa options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    };
}


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

// skapa frågor här
var questions = [
    new Question("Vad heter Karwan i efternamn?", ["Seafood", "Saeed Foad","Hyss", "Holmgren"], "Seafood"),
    new Question("Vad är bästa matrestaurangen?", ["Falafelkungen", "Kebabkungen", "Café Cups", "Subway"], "Café Cups"),
    new Question("Vad är mest drip?", ["Veliance", "Arc'Teryx", "Acronym", "RON"], "RON"),
    new Question("Vilket ämne är bäst?", ["Webbutveckling", "Fysik", "Matematik", "Engelska"], "Webbutveckling"),
    new Question("Vad är ditt ortennamn?", ["Montasser", "Ariel", "Dinma", "Ali"], "Ariel"),
    new Question("Ok, men vad är din favoritserie?", ["Battlestar Galactica", "Rick and Morty", "The Big Bang Theory", "Star Trek"], "Battlestar Galactica"),

];

// skapa quiz
var quiz = new Quiz(questions);

// visa quiz
populate();


localStorage.setItem("myData", number.toString);
let numberFromMemory = localStorage.getItem("myData");