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

const AnswerQuestion = (e,header, answers, value) => { 
    e.target.style.color = "#fff"
    if (answers.find(x => x.event === header).date == value) {
        e.target.style.background = "green"
    }else{
        e.target.style.background = "red"
    }
    setTimeout(() => {
        ReturnQuestion()
    }, 1000);
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
    selectedQuestion.pics.forEach(pic => {
        const img = document.createElement("img")
        img.src = pic
        imageContainer.appendChild(img)
    })

    const questionHeader = document.createElement("h2")
    questionHeader.classList.add("question-header")
    questionHeader.innerText = selectedQuestion.event

    const questionContainer = document.createElement("div")
    questionContainer.classList.add("question-container")

    answers.sort(() => .5 - Math.random()).forEach(answer => {
        const answerButton = document.createElement("div")
        answerButton.innerText = answer.date
        answerButton.addEventListener("click", (e) => {
            AnswerQuestion(e,selectedQuestion.event,answers,answer.date)
        })
        questionContainer.appendChild(answerButton)
    })
    quiz.innerHTML = ""
    quiz.appendChild(imageContainer)
    quiz.appendChild(questionHeader)
    quiz.appendChild(questionContainer)
}

ReturnQuestion()