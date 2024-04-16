
const LoadData = () => {
    let questions = text.map(line => {
        line = line.split(";")
        let kepek = []
        for (let i = 3; i < line.length; i++) {
            kepek.push(line[i])
        }
        return new Tetel(line[0],line[1],line[2],kepek)
    });
    
    let tetelek = new Set()
    questions.forEach(question => {
        tetelek.add(question.tetel)
    });
}

let data = LoadData();