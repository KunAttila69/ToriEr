const LoadData = () => {
    //Get all the events from the data.js file
    let questions = text.split("\n").map(line => {
        line = line.split(";")
        let pics = []
        for (let i = 3; i < line.length; i++) {
            pics.push(line[i])
        }
        return new Event(line[0],line[1],line[2],pics)
    });
    //Get all theme names
    let themeNames = new Set()
    questions.forEach(question => {
        themeNames.add(question.theme)
    });
    //Get all questions organized into the themes 
    let themes = []
    themeNames.forEach(theme => {
        themes.push(new Theme(theme,questions.filter(x => x.theme == theme)))
    })
    return themes
}

const AnswerQuestion = (header, answers, value) => {
    if (answers.filter(x => x.event === header).date == value) {
        alert("jó")
    }
}

let data = LoadData();

const ReturnQuestion = () => {
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

    const questionHeader = document.createElement("h2")
    questionHeader.classList.add("question-header")
    questionHeader.innerText = selectedQuestion.event

    const questionContainer = document.createElement("div")
    questionContainer.classList.add("question-container")

    answers.sort(() => .5 - Math.random()).forEach(answer => {
        const answerButton = document.createElement("button")
        answerButton.innerText = answer.date
        answerButton.addEventListener("click", () => {
            AnswerQuestion(selectedQuestion.event,answers,answer.data)
        })
    })
}

ReturnQuestion()