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
        quiz: 'Social Studies Quiz'
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
        question: 'The infamous Watergate scandal involved which president?',
        answers: [
             {text: 'Donald Trump', correct: false },
             {text: 'Lyndon B. Johnson', correct: false },
             {text: 'John F. Kennedy', correct: false },
             {text: 'Richard Nixon', correct: true }

        ]
    },
    {
        question: 'Who was the 16th of the U.S.?',
        answers: [
             {text: 'Abraham Lincoln', correct: true },
             {text: 'Ulysses S. Grant', correct: false },
             {text: 'Thomas Jefferson', correct: false },
             {text: 'John Adams', correct: false }

        ]
    },
    {
        question: 'How many branches of government does the U.S. have?',
        answers: [
             {text: '2', correct: false },
             {text: '3', correct: true },
             {text: '1', correct: false },
             {text: '4', correct: false }

        ]
    },
    {
        question: 'What year did World War II begin?',
        answers: [
             {text: '1945', correct: false },
             {text: '1941', correct: false },
             {text: '1939', correct: true },
             {text: '1947', correct: false }

        ]
    },
    {
        question: 'the Cold War was a period of geopolitical tension between the United States and __________',
        answers: [
             {text: 'the Axis Powers', correct: false },
             {text: 'Vietnam', correct: false },
             {text: 'Great Britian', correct: false },
             {text: 'the Soviet Union', correct: true }

        ]
    },
    {
        question: 'In what year did Italian explorer Christopher Columbus start his voyage across the Atlantic Ocean?',
        answers: [
             {text: '1492', correct: true },
             {text: '1861', correct: false },
             {text: '1777', correct: false },
             {text: '1917', correct: false }

        ]
    }
]