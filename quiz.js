let data = LoadData();

let Answers = [];


const AnswerQuestion = (header, answers, value) => {
    //Disable buttons after inputting an answer
    document.querySelectorAll(".answer-button").forEach(button => { 
        button.style.pointerEvents = "none";
    })
    
    //Save the given and correct answers
    Answers.push({
        "event": header,
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
    data.filter(x => selectedThemes.includes(x.theme)).forEach(theme => {
        theme.events.forEach(event => {
            allQuestions.push(event);
        })
    })

    //Select a question and select 4 other wrong answers

    let askedQuestions = []

    Answers.forEach(x => {
        askedQuestions.push(allQuestions.filter(y => y.date == x.correctAnswer)[0].event)
    }) 

    const selectedQuestion = allQuestions.filter(x => !askedQuestions.includes(x.event)).sort(() => .5 - Math.random()).pop(); 


    let wrongAnswers = []
    
    console.log(askedQuestions)
    for (let i = 0; i < 4; i++) {
        wrongAnswers.push(allQuestions.filter(x => x.theme == selectedQuestion.theme).sort(() => .5 - Math.random()).pop())
        allQuestions.slice(allQuestions.indexOf(wrongAnswers[i]),1)
    }

    const answers = [wrongAnswers[0],wrongAnswers[1],wrongAnswers[2],wrongAnswers[3], selectedQuestion]
    
    //Load the images assigned to the question
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("images")
    selectedQuestion.pics.forEach(pic => {
        const img = document.createElement("img")
        img.src = `Images/${pic}`
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
    const h2 = document.createElement("h2");
    h2.innerText = `Elértél ${Answers.filter(x=> x.correctAnswer == x.givenAnswer).length}-t a ${Answers.length}-ból`
    resultSection.appendChild(h2);

    const table = document.createElement("table")

    const header = document.createElement("tr")
    const firstHeader = document.createElement("td")
    firstHeader.innerText = "Esemény"
    firstHeader.colSpan = "2"
    const secondHeader = document.createElement("td")
    secondHeader.innerText = "Helyes dátum"
    const thirdHeader = document.createElement("td")
    thirdHeader.innerText = "Megadott dátum"

    header.appendChild(firstHeader)
    header.appendChild(secondHeader)
    header.appendChild(thirdHeader)
    table.appendChild(header)

    Answers.forEach(x => {
        const line = document.createElement("tr")
        
        line.classList.add(x.correctAnswer == x.givenAnswer ? "correct" : "incorrect")

        const firstElement = document.createElement("td")
        firstElement.innerText = x.event
        firstElement.colSpan = "2"
        const secondElement = document.createElement("td")
        secondElement.innerText = x.correctAnswer
        const thirdElement = document.createElement("td")
        thirdElement.innerText = x.givenAnswer

        line.appendChild(firstElement)
        line.appendChild(secondElement)
        line.appendChild(thirdElement)
        table.appendChild(line)
    })
    resultSection.appendChild(table)
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