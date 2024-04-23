const data = LoadData();

let Answers = [];


const AnswerQuestion = (header, answers, value) => {
    //Disable buttons after inputting an answer
    document.querySelectorAll(".answer-button").forEach(button => { 
        button.style.pointerEvents = "none";
    })
    
    //Save the given and correct answers
    Answers.push({
        "correctAnswer": answers.find(x => x.event === header).date, 
        "givenAnswer": value
    });

    //Check if the given number of questions have been answered and load the new page
    setTimeout(() => {
        currentState = Answers.length >= numberOfQuestions ? State.Finished : currentState;
        LoadPage();
    }, 200);
}

const QuestionPage = (data) => {
    document.getElementById("main-menu").style.display = "none"
    quiz.style.display = "flex"
    result.style.display = "none"

    //Save all questions into an array
    let allQuestions = [];
    data.forEach(theme => {
        theme.events.forEach(event => {
            allQuestions.push(event);
        })
    })

    //Select a question and select 4 other wrong answers
    const selectedQuestion = allQuestions.sort(() => .5 - Math.random()).pop(); 
    const answers = [allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(), selectedQuestion]
    
    //Load the images assigned to the question
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("images")
    selectedQuestion.pics.forEach(pic => {
        const img = document.createElement("img")
        img.src = `images/${pic}`
        imageContainer.appendChild(img)
    })
    
    //Load the question
    const questionHeader = document.createElement("div")
    questionHeader.appendChild(document.createElement("h2"))
    questionHeader.classList.add("question-header")
    questionHeader.children[0].innerText = selectedQuestion.event
    
    //Load the container div containing the answers
    const questionContainer = document.createElement("div")
    questionContainer.classList.add("question-container")
    
    //Load the answers into the container
    answers.sort(() => .5 - Math.random()).forEach(answer => {
        const answerButton = document.createElement("div")
        answerButton.innerText = answer.date
        answerButton.addEventListener("click", (e) => { 
            AnswerQuestion(selectedQuestion.event,answers,answer.date)
        })
        answerButton.classList.add("answer-button")
        questionContainer.appendChild(answerButton)
    }) 

    //Assign the elements to the main element
    quiz.innerHTML = ""
    quiz.appendChild(imageContainer)
    quiz.appendChild(questionHeader)
    quiz.appendChild(questionContainer)
}

const DisplayResults = () => {
    document.getElementById("main-menu").style.display = "none"
    quiz.style.display = "none"
    result.style.display = "flex"

    const resultSection = document.querySelector("#result");

    resultSection.classList.add("container");
    const h2 = document.createElement("h2");
    h2.innerText = `Elértél ${Answers.filter(x=> x.correctAnswer == x.givenAnswer).length}-t a ${Answers.length}-ból`
    resultSection.appendChild(h2);
}
// Switch between states
// Quiz - quiz
// Main - Configure quiz
// Finished - display quiz result
const LoadPage = () => {
    switch (currentState) {
        case "Main":
            LoadThemes(LoadPage)
            break;
        case "Quiz":
            QuestionPage(data)
            break;
        case "Finished":
            DisplayResults();
            break;
    }
}

LoadPage()