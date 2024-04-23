const LoadThemes = () =>{
    const themeSelection = document.createElement("div")
    themeSelection.classList.add("config")
    themeSelection.classList.add("theme-selection")

    const themeHeader = document.createElement("h2")
    themeHeader.innerText = "Tételek száma"



    /*       
        <div class="config theme-selection" >
            <h2 style="text-decoration: underline; text-align: center;">Tételek száma</h2>
            <div style="display: flex; flex-direction:row; justify-content: space-around;">
                <p>Összes tétel: </p>
                <input type="radio" name="" id="" >
            </div>
            <button>A</button>
            <button>B</button>
            <button>C</button>
        </div>
        <div class="range-container config">
            <div style="display:flex; align-items: center;">
                <h2>Kérdések száma:</h2>
                <p style="text-align: center;" id="questionNum">5/10</p>
            </div>
            <input type="range" min="5" max="10" value="5" id="QuestionRange" style="width: 100%;" >
        </div>
        <div class="play config" >
            <button>Kvíz elkezdése</button>
        </div> 
    */
}