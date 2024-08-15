const quizInput=[
    {
        question: "What is the result of 5 + 3?",
        options: ["6", "8", "10", "7"],
        correct: "8",
        feedback: "The correct answer is 8 because 5 + 3 = 8."
    },
    {
        question: "What is the data type of 'JavaScript'?",
        options: ["String", "Number", "Boolean", "Array"],
        correct: "String",
        feedback: "The correct answer is String because 'JavaScript' is a sequence of characters enclosed in single or double quotes."
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["=", "==", "===", "!="],
        correct: "=",
        feedback: "The correct answer is '=' because it is the assignment operator used to assign values to variables."
    },
    {
        question: "Which data type is 'true'?",
        options: ["String", "Boolean", "Number", "Object"],
        correct: "Boolean",
        feedback: "'true' is a Boolean value."
    },
    {
        question: "What is the result of '10' + 5 in JavaScript?",
        options: ["15", "'105'", "NaN", "Error"],
        correct: "'105'",
        feedback: "In JavaScript, '10' + 5 results in concatenation, giving '105'."
    }
]


function loadQuiz(){
    let quizContainer=document.getElementById('quiz');
    quizContainer.innerHTML=quizInput.map((item,index)=>`
    <div class="quesstion" id="question${index}">
    <div class="question-number">Question ${index + 1}</div>
    <div class="question-text">${item.question}</div>
    <div class="options">
    ${item.options.map(option=>`
        <div class="form-check">
        <input class="form-check-input" type="radio" name="question${index}" value="${option}">
        <label class="form-check-label">${option}</label>
        </div>
       `).join('')}
            </div>
            <div class="feedback mt-2"></div>
        </div>
    `).join('');
}

function getSelectedAnswers() {
    const selectedAnswers = [];
    quizInput.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            selectedAnswers.push(selectedOption.value);
        } else {
            selectedAnswers.push(null);
        }
    });
    return selectedAnswers;
}

function calculateScore() {
    const answers = getSelectedAnswers();
    let score = 0;

    answers.forEach((answer, index) => {
        const feedbackElement = document.querySelector(`#question${index} .feedback`);
        
        if (answer === quizInput[index].correct) {
            score++;
            feedbackElement.innerHTML = `<span class="text-success">Correct!</span>`;
        } else {
            feedbackElement.innerHTML = `<span class="text-danger">Incorrect. ${quizInput[index].feedback}</span>`;
        }
    });

    return score;
}

function showFinalFeedback(score) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `You scored ${score} out of ${quizInput.length}`;
    feedback.classList.add(score === quizInput.length ? 'text-success' : 'text-danger');
}

document.getElementById('submit').addEventListener('click', () => {
    const score = calculateScore();
    console.log(score);
    showFinalFeedback(score);
});

window.onload = loadQuiz;