
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const quesitonElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions,currentQuestionIndex;
let quizScore =0; 

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',() =>{
    currentQuestionIndex++
    setnextQuestion()
})

function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add(correct)
    }else {
        element.classList.add(wrong)
    }
}

function clearStatusClass(element){
    element.classList.remove(correct)
    element.classList.remove(wrong)
}

const questions =[
    {
        quesiton: 'What is 33 x 2?',
        answers :[
            { Text: '332', correct: false},
            { Text: '35', correct: false},
            { Text: '66', correct: true},
            { Text: '31', correct: false},
        ]
    }
]