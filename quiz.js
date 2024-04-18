/*
const State = {
    Main : "Main",
    Quiz : "Quiz",
    Finished : "Finished"
};


const Question = {
    Correct : 0,
    Incorrect : 0
};
let currentState = State.Quiz;
*/
const AnswerQuestion = (e,header, answers, value) => { 
    e.target.style.color = "#fff"
    if (answers.find(x => x.event === header).date == value) {
        e.target.style.background = "green"
    }else{
        e.target.style.background = "red"
        document.querySelectorAll(".answer-button").forEach(button => { 
            if (answers.find(x => x.event === header).date == " "+button.innerText) {
                button.style.color = "#fff"
                button.style.background = "green"
            }
        })
    }
    setTimeout(() => {
        ReturnQuestion(data)
    }, 1000);
}


const ReturnQuestion = (data) => {
    let allQuestions = []  
    data.forEach(theme => {
        theme.events.forEach(event => {
            allQuestions.push(event)
        })
    }) 
    
    
    const selectedQuestion = allQuestions.sort(() => .5 - Math.random()).pop(); 
    const answers = [allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(), selectedQuestion]
    
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("images")
    selectedQuestion.pics.forEach(pic => {
        const img = document.createElement("img")
        img.src = pic
        imageContainer.appendChild(img)
    })
    
    const questionHeader = document.createElement("div")
    questionHeader.appendChild(document.createElement("h2"))
    questionHeader.classList.add("question-header")
    questionHeader.children[0].innerText = selectedQuestion.event
    
    const questionContainer = document.createElement("div")
    questionContainer.classList.add("question-container")
    
    answers.sort(() => .5 - Math.random()).forEach(answer => {
        const answerButton = document.createElement("div")
        answerButton.innerText = answer.date
        answerButton.addEventListener("click", (e) => {
            AnswerQuestion(e,selectedQuestion.event,answers,answer.date)
        })
        answerButton.classList.add("answer-button")
        questionContainer.appendChild(answerButton)
    })
    quiz.innerHTML = ""
    quiz.appendChild(imageContainer)
    quiz.appendChild(questionHeader)
    quiz.appendChild(questionContainer)
}
// Switch between states
// Quiz - quiz
// Main - Configure quiz
// Finished - display quiz result
//ReturnQuestion(data)