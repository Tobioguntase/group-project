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
const username = document.getElementById('uname')

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
const MAX_HIGH_SCORES = 5;



username.addEventListener('keyup', () =>{
    console.log(username.value) 
    submitButton.disabled = !username.value
})

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
        localStorage.setItem("mostRecentScore", score)
        userInfo.classList.remove('hide')
        submitButton.classList.remove('hide')
        homePage.classList.remove('hide')
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function saveHighScore(e) {
    console.log("clicked the save button")
    e.preventDefault();

    const scoreObject = {
        mostRecentScore: score,
        name: username.value,
        quiz: 'Science Quiz'
    }
    highScores.push(scoreObject)

    highScores.sort((a,b) => b.mostRecentScore - a.mostRecentScore)

    highScores.splice(5); 

    localStorage.setItem('highScores', JSON.stringify(highScores))

    window.location.assign("/")

    console.log(highScores)
    
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
        question: 'What is the chemical fourmula for water?',
        answers: [
             {text: 'H2O', correct: true },
             {text: 'CO2', correct: false },
             {text: 'H4O', correct: false },
             {text: 'CO3', correct: false }


        ]
    },
    {
        question: 'Which of the following subatomic particles has a negative charge?',
        answers: [
             {text: 'protons', correct: false },
             {text: 'electrons', correct: true },
             {text: 'neutrons', correct: false },
             {text: 'none of these are negatively charged', correct: false }

        ]
    },
    {
        question: 'Humans are unicellular organisms.',
        answers: [
             {text: 'true', correct: false },
             {text: 'false', correct: true }
        ]
    },
    {
        question: 'Unlike animal cells, plant cells contain _________',
        answers: [
             {text: 'a cell wall', correct: true },
             {text: 'mitochondria', correct: false },
             {text: 'ribosomes', correct: false },
             {text: 'a nucleus', correct: false }

        ]
    },
    {
        question: 'which human body system interacts with each cell of the body?',
        answers: [
             {text: 'the muscular system', correct: false },
             {text: 'the circulatory system', correct: true },
             {text: 'the skeletal system', correct: false },
             {text: 'the digestive system', correct: false }

        ]
    },
    {
        question: 'which of the following is a building block of protein?',
        answers: [
             {text: 'codons', correct: false },
             {text: 'enzymes', correct: false },
             {text: 'amino acids', correct: true },
             {text: 'RNA', correct: false }

        ]
    },
    {
        question: 'Who formulated the theory of evolution?',
        answers: [
             {text: 'Nikola Tesla', correct: false },
             {text: 'Johannes Kepler', correct: false },
             {text: 'Stephen Hawking', correct: false },
             {text: 'Charles Darwins', correct: true }

        ]
    },
    {
        question: 'Which of the following is most similar to a naturally occuring ecosystem?',
        answers: [
             {text: 'an aquarium containing aquatic plants and herbivorous tropical fish', correct: true },
             {text: 'a diorama containing stuffed animals and dried vegetation', correct: false },
             {text: 'a supermarket with a large section of fresh vegetables and fruits', correct: false },
             {text: 'a house that has central heating and air condtioning', correct: false }

        ]
    },
    {
        question: 'Which is most often refered to as the powerhouse of the cell?',
        answers: [
             {text: 'the cell wall', correct: false },
             {text: 'mitochondria', correct: true },
             {text: 'ribosomes', correct: false },
             {text: 'the nucleus', correct: false }

        ]
    },
    {
        question: 'Which planet in our solar system is closest to the sun?',
        answers: [
             {text: 'Mars', correct: false },
             {text: 'Venus', correct: false },
             {text: 'Mercury', correct: true },
             {text: 'Earth', correct: false }

        ]
    }
]