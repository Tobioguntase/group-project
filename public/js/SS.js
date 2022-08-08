const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')
const scoreContainer = document.getElementById('hud-item')

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
        startButton.innerText = 'Restart with random question'
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
        question: 'Which of the following actions represents participation in government?',
        answers: [
             {text: 'pursuing higher education', correct: false },
             {text: 'displaying the flag of a nation', correct: false },
             {text: 'volunteering at a busy hospital', correct: false },
             {text: 'serving on a jury', correct: true }

        ]
    },
    {
        question: 'In some countries, control passes back and forth between military and civilian rule. In general, a civilian ruled government tries to improve conditions for the citizens of that country, but attempts to do so lead to turmoil and civil unrest. In response, the military takes power, imposing strict control on the populace. Which of the following is highly valued by those who favor military rule?',
        answers: [
             {text: 'social welfare', correct: false },
             {text: 'free and fair elections', correct: false },
             {text: 'freedom of speech', correct: false },
             {text: 'law and order', correct: true }

        ]
    },
    {
        question: "Which war is known as america's deadliest?",
        answers: [
             {text: 'the Civil War', correct: true },
             {text: 'World War I', correct: false },
             {text: 'World War II', correct: false },
             {text: 'the Vietnam War', correct: false }

        ]
    },
    {
        question: 'A culture hearth refers to the center of a culture-the source of its ideas, values, customs, fashions, and practices. Which of the following is an example of a modern culture hearth with world wide influence?',
        answers: [
             {text: 'Pyongyang, capital of North Korea; has a 95% literacy rate', correct: false },
             {text: 'Ottawa, capital of Canada; population: 1 million', correct: false },
             {text: 'Hollywood, California; produces movies and TV shows enjoyed around the world', correct: true },
             {text: 'New Zealand; exports wool and textiles', correct: false }

        ]
    },
    {
        question: 'Which of the following actions represents participation in government?',
        answers: [
             {text: 'pursuing higher education', correct: false },
             {text: 'displaying the flag of a nation', correct: false },
             {text: 'volunteering at a busy hospital', correct: false },
             {text: 'serving on a jury', correct: true }

        ]
    }
]