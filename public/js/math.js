const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')
const scoreContainer = document.getElementById('hud-item')
const homePage = document.getElementById('home-page')
const submitButton = document.getElementById('submit-btn')
const userInfo = document.getElementById('user-info')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

let shuffledQuestions, currentQuestionIndex
let score = 0;

const CORRECT_BONUS = 10;

function startGame() {
    console.log('started');
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    resetScore()
    scoreContainer.classList.remove("hide")
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion(question) {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
} 

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    userInfo.classList.add('hide')
    submitButton.classList.add('hide')
    homePage.classList.add('hide')
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
}

function selectAnswer(e) {
    const selectedButton = e.target
    if (selectedButton.dataset.correct) {
        incrementScore(CORRECT_BONUS)
    }
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        userInfo.classList.remove('hide')
        submitButton.classList.remove('hide')
        homePage.classList.remove('hide')
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

    
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
   
}

function resetScore() {
    score = 0;
    scoreElement.innerText = score;
}

function incrementScore(num) {
    score += num;
    scoreElement.innerText = score;
}

const questions = [
    {
        question: 'Evaluate the expression 2x - (4y - 3) + 5xy, when x = -3, y = 2, and z = -1.',
        answers: [
             {text: '49', correct: false },
             {text: '15', correct: false },
             {text: '4', correct: true },
             {text: '-11', correct: false }

        ]
    },
    {
        question: 'Find the solution to the following inequality: 12(x - 2) < 24',
        answers: [
             {text: 'x < 0', correct: false },
             {text: 'x > 4', correct: false },
             {text: 'x < 12', correct: false },
             {text: 'x < 4', correct: true }

        ]
    },
    {
        question: 'What is the number 4,540,000,000 expressed in scientific notation?',
        answers: [
             {text: '4.54 x 10^8', correct: false },
             {text: '4.54 x 10^9', correct: true },
             {text: '454 x 10^11', correct: false },
             {text: '4(127 x 10^7)', correct: false }

        ]
    },
    {
        question: 'A parallelogram has two obtuse angles and two acute angles. If one of the obtuse angles is 110 degrees, what is the measurement of one of the acute angles?',
        answers: [
             {text: '20 degrees', correct: false },
             {text: '70 degrees', correct: true },
             {text: '120 degrees', correct: false },
             {text: '250 degrees', correct: false }

        ]
    },
    {
        question: 'A cardboard box measures 5 feet along each edge. What is the volume of the box in cubic feet?',
        answers: [
             {text: '115', correct: false },
             {text: '50', correct: false },
             {text: '15', correct: false },
             {text: '125', correct: true }

        ]
    },
    {
        question: 'The radius of a circle is 6 cm. What is the diameter of the circle in centimeters?',
        answers: [
             {text: '12', correct: true },
             {text: '3', correct: false },
             {text: '123', correct: false },
             {text: '18', correct: false }

        ]
    },
    {
        question: 'Which of the following is the correct order of operations?',
        answers: [
             {text: 'PENDAS', correct: false },
             {text: 'PEMDAS', correct: true },
             {text: 'PEDMAS', correct: false },
             {text: 'PEDNAS', correct: false }

        ]
    },
    {
        question: 'The length of two sides of a right triangle are both 8 inches. What is the legth of its hypotenuse?',
        answers: [
             {text: '16', correct: false },
             {text: '64', correct: false },
             {text: '11.31', correct: true },
             {text: '1.28', correct: false }

        ]
    },
    {
        question: 'Which value for x makes the statement x > 500 true?',
        answers: [
             {text: '7^2', correct: false },
             {text: '4^5', correct: true },
             {text: '3^4', correct: false },
             {text: '6^3', correct: false }

        ]
    },
    {
        question: 'Which variable in the equation y = mx + b represents the slope of a line?',
        answers: [
             {text: 'y', correct: false },
             {text: 'x', correct: false },
             {text: 'b', correct: false },
             {text: 'm', correct: true }

        ]
    },
]


