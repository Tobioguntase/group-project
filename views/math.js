const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById("question-container")
const quesitonElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
startButton.addEventListener('click', startGame)

let shuffledQuestions, currentQuestionIndex

function startGame() {
    console.log('started');
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setnextQuestion()
}

function setNextQuestion(question) {
    showQuestion(shuffledQuestions[currentQuestionIndex])
} 

function showQuestion(question) {
    quesitonElement.innerText = question.question 
}

function selectAnswer() {

}

const questions = [
    {
        quesiton: "What is 33 x 2?",
        answers: [
             {text: '66', correct: true },
             {text: '4', correct: false }

        ]
    }
]