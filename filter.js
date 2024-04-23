let selectedThemes = []

const LoadThemes = (LoadPage) =>{
    document.getElementById("main-menu").style.display = "grid"
    quiz.style.display = "none"
    result.style.display = "none"

    
    
    const themeSelection = document.createElement("div")
    themeSelection.classList.add("config")
    themeSelection.classList.add("theme-selection")

    const themeHeader = document.createElement("h2")
    themeHeader.innerText = "Tételek száma"
    themeHeader.classList.add("theme-header")
    
    const centeredCol = document.createElement("div")
    centeredCol.classList.add("centered-col")
    
    const allThemes = document.createElement("p")
    allThemes.innerText = "Összes tétel"
    
    const selectAllBtn = document.createElement("input")
    selectAllBtn.type = "checkbox"
    selectAllBtn.id = "selectAllThemes"
    
    selectAllBtn.addEventListener("click", () => {
        if (selectAllBtn.checked) {
            document.querySelectorAll(".selected-theme").forEach(x => {
                selectedThemes = [] 
            })
        }else{
            LoadData().forEach( x => {
                selectedThemes = []
                selectedThemes.push(x.theme)
            })  
        }
        GenerateThemes(selectAllBtn.checked)
    })

    centeredCol.appendChild(allThemes)
    centeredCol.appendChild(selectAllBtn)

    
    const GenerateThemes = (isSelected) => {
        themeSelection.innerHTML = ""
        themeSelection.appendChild(themeHeader)
        themeSelection.appendChild(centeredCol)
        LoadData().forEach( theme => {
            const themeBtn = document.createElement("button")
            themeBtn.innerText = theme.theme
            if(isSelected){
                themeBtn.classList.add("selected-theme")
            }

            themeBtn.addEventListener("click", () => { 
                if (selectedThemes.includes(theme.theme)) {
                    selectedThemes.splice(selectedThemes.indexOf(theme.theme),1) 
                    
                    themeBtn.className = ""
                }
                else{
                    selectedThemes.push(theme.theme)
                    themeBtn.classList.add("selected-theme")
                } 
            })
    
            themeSelection.appendChild(themeBtn)
        })
    }
    GenerateThemes()

    //------------------------------------------------------------

    const rangeContainer = document.createElement("div")
    rangeContainer.classList.add("range-container")
    rangeContainer.classList.add("config")

    const centeredFlex = document.createElement("div")
    centeredFlex.classList.add("centered-flex")

    const questionHeader = document.createElement("h2")
    questionHeader.innerText = "Kérdések száma:"

    const questionNum = document.createElement("p")
    questionNum.style.textAlign = "center"
    questionNum.id = "questionNum"
    questionNum.innerText = `5/10`

    centeredFlex.appendChild(questionHeader)
    centeredFlex.appendChild(questionNum)

    const questionRange = document.createElement("input")
    questionRange.type = "range"
    questionRange.min = "5"
    questionRange.max = "10"
    questionRange.value = "5"
    questionRange.id = "QuestionRange"
    questionRange.style.width = "100%"
    
    questionRange.addEventListener("input", (e) =>  {
        questionNum.innerText = `${e.target.value}/10`
    })

    rangeContainer.appendChild(centeredFlex)
    rangeContainer.appendChild(questionRange)

    //------------------------------------------------------------

    const playContainer = document.createElement("div")
    playContainer.classList.add("play")
    playContainer.classList.add("config") 

    const playButton = document.createElement("button")
    playButton.innerText = "Kvíz elkezdése" 
    playButton.addEventListener("click", () => {
        if(selectedThemes.length > 0){
            currentState = State.Quiz
            numberOfQuestions = questionRange.value
            LoadPage()
        }else{
            alert("Nincs kiválasztva tétel!")
        }
    })

    playContainer.appendChild(playButton)

    document.getElementById("main-menu").appendChild(themeSelection)
    document.getElementById("main-menu").appendChild(rangeContainer)
    document.getElementById("main-menu").appendChild(playContainer)

}