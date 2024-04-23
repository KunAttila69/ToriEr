const data = LoadData();

let Answers = [];
let currentState = State.Quiz;

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
    //Save all questions into an array
    let allQuestions = [];
    data.forEach(theme => {
        theme.events.forEach(event => {
            allQuestions.push(event);
        })
    })

    //Select a question and select 3 other wrong answers
    const selectedQuestion = allQuestions.sort(() => .5 - Math.random()).pop(); 
    const answers = [allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(),allQuestions.sort(() => .5 - Math.random()).pop(), selectedQuestion]
    
    //Load the images assigned to the question
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("images")
    selectedQuestion.pics.forEach(pic => {
        const img = document.createElement("img")
        img.src = pic
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

const CalculatePoints = () => {
    let points = 0;
    Answers.forEach( x => {
        if(x.correctAnswer === x.givenAnswer) points++;
    });
    return points;
}
const DisplayResults = (...points) => {
    const resultSection = document.querySelector("#result");
    resultSection.classList.add("container");
    const h2 = document.createElement("h2");
    h2.innerText = `Elértél ${points[0]}-ot a ${points[1]}-ból`
    resultSection.appendChild(h2);
    resultSection.appendChild((document.createElement("h2").innerHTML = `Ez ${points[2]}% teljesítmény`));
}
// Switch between states
// Quiz - quiz
// Main - Configure quiz
// Finished - display quiz result
const LoadPage = () => {
    switch (currentState) {
        case "Main":
            MainPage()
            break;
        case "Quiz":
            QuestionPage(data)
            break;
        case "Finished":
            const Points = CalculatePoints();
            const MaxPoints = Answers.length;
            const Percentage = (Points / MaxPoints) * 100;
            console.log(Answers)
            DisplayResults([Points, MaxPoints, Percentage]);
            break;
    }
}

LoadPage()