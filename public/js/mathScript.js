
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions,currentQuestionIndex;
let quizScore =0; 

startButton.addEventListener('click',startGame);

nextButton.addEventListener('click',() =>{
    currentQuestionIndex++
    setnextQuestion();
});
/* Quiz Start */
function startGame(){
    startButton.classList.add('hide')
    shuffleQuestions=questions.sort(() => Math.random() -0.5)
    currentQuestionIndex=0;
    questionContainerElement.classList.remove('hide')
    setnextQuestion()
    quizScore=0
}

function setnextQuestion(){
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText= question.quesiton;
    question.answers.forEach((answer) => {
        const button =document.createElement('button')
        button.innerText=answer.text;
        button.classList.add('btn')

        if(answer.correct){
            button.dataset.correct =answer.correct
        }

        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }

}

function selectAnswer(e){
    const selectedButton=e.target
    const correct=selectedButton.dataset.correct
    
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button.dataset.correct)
    })

    if(shuffleQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove("hide")
    }

    else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }

    if(selectedButton.dataset = correct) {
        quizScore++

    }

    document.getElementById('right-answers').innerText=quizScore

}

/* End of added code */

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
    /* Q1 */
    {
        question: 'What is 33 x 2?',
        answers :[
            { Text: '332', correct: false},
            { Text: '35', correct: false},
            { Text: '66', correct: true},
            { Text: '31', correct: false},
        ],
    },
    /* Q2 */
    {
        question: 'What is 33 x 2?',
        answers :[
            { Text: '332', correct: false},
            { Text: '35', correct: false},
            { Text: '66', correct: true},
            { Text: '31', correct: false},
        ],
    },
    /* Q3 */
    {
        question: 'What is 33 x 2?',
        answers :[
            { Text: '332', correct: false},
            { Text: '35', correct: false},
            { Text: '66', correct: true},
            { Text: '31', correct: false},
        ]
    }
]