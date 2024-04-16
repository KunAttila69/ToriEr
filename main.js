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

let data = LoadData();

const ReturnQuestion = () => {
    let allQuestions = []  
    data.forEach(theme => {
        theme.events.forEach(event => {
            allQuestions.push(event)
        })
    })
    console.log(allQuestions) 
    /*
        <div class="images"></div>
        <h2 id="question-header">Foo question</h2>
        <div class="question-container">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </div>
    */
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("images")


}

ReturnQuestion()