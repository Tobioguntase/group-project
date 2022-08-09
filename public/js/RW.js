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
        quiz: 'Reading & Writing Quiz'
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
        question: 'They did not reach an agreement ______ their differences',
        answers: [
             {text: 'on account of', correct: true },
             {text: 'due', correct: false },
             {text: 'because', correct: false },
             {text: 'due', correct: false }
        ]
    },
    {
        question: "I wish I _____ those words. But now it's too late",
        answers: [
             {text: 'not having said', correct: false },
             {text: 'have never said', correct: false },
             {text: 'never said', correct: false },
             {text: 'had never said', correct: true }
        ]
    },
    {
        question: "words that can be used to discribe a verb, an adverb, adjective, or a whole sentence are called _______",
        answers: [
             {text: 'objects', correct: false },
             {text: 'adjectives', correct: false },
             {text: 'verbs', correct: false },
             {text: 'adverbs', correct: true }
        ]
    },
    {
        question: "The woman, who has been missing for 10 days, is believed _____",
        answers: [
             {text: 'to be abducted', correct: false },
             {text: 'to be abducting', correct: false },
             {text: 'to have been abducted', correct: true },
             {text: 'to have been abducting', correct: false }
        ]
    },
    {
        question: "_____ to offend anyone, she said both cakes were equally good",
        answers: [
             {text: 'Not wanting', correct: true },
             {text: 'As not wanting', correct: false },
             {text: 'She didnt want', correct: false },
             {text: 'Because not wanting', correct: false }
        ]
    },
    {
        question: "He _____ robbed as he was walking out of the bank",
        answers: [
             {text: 'had', correct: false },
             {text: 'got', correct: true },
             {text: 'did', correct: false },
             {text: 'were', correct: false }
        ]
    },
    {
        question: "She was working on her computer with her baby next to _____",
        answers: [
             {text: 'her own', correct: false },
             {text: 'herself', correct: false },
             {text: 'her', correct: true },
             {text: 'hers', correct: false }
        ]
    },
    {
        question: "_____ in trying to solve this problem. It's clearly unsolvable",
        answers: [
             {text: "There's no point", correct: true },
             {text: "It's not point", correct: false },
             {text: "There isn't point", correct: false },
             {text: "It's no need", correct: false }
        ]
    },
    {
        question: "Last year, when I last met her, she told me she _____ a letter every day for the last two months",
        answers: [
             {text: 'had written', correct: false },
             {text: 'has written', correct: false },
             {text: 'had been writing', correct: true },
             {text: 'wrote', correct: false }
        ]
    },
    {
        question: "We'll never know what might have happened _____ the email earlier",
        answers: [
             {text: 'if he sent', correct: false },
             {text: 'had he sent', correct: true },
             {text: 'if he has sent', correct: false },
             {text: 'did he sent', correct: false }
        ]
    },
]