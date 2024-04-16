
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
    //Get all themes
    let themeNames = new Set()
    questions.forEach(question => {
        themeNames.add(question.theme)
    });

    let themes = []
    themeNames.forEach(theme => {
        themes.push(new Theme(theme,questions.filter(x=> x.theme == theme)))
    }) 
}

let data = LoadData();