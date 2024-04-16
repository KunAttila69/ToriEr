const LoadLearning = (data) => {
    /*
    <div class="exam-container">
        <h2 class="exam-header">Töri tétel</h2>
            <ul class="events">
                <li>Esemény - évszám</li>
                <li>Esemény - évszám</li>
                <li>Esemény - évszám</li>
                <li>Esemény - évszám</li>
        </ul>
    </div>
    */
    data.forEach(theme => {
        const examContainer = document.createElement("div")
        examContainer.classList.add("exam-container")

        const examHeader = document.createElement("h2")
        examHeader.classList.add("exam-header")
        examHeader.innerText = theme.theme

        const events = document.createElement("ul")
        events.classList.add("events")

        theme.events.forEach(event => {
            const eventItem = document.createElement("li")
            eventItem.innerText = `${event.event} - ${event.date}`
            events.appendChild(eventItem)
        })

        examContainer.appendChild(examHeader)
        examContainer.appendChild(events)

        learning.appendChild(examContainer)
    });
}

LoadLearning(data)