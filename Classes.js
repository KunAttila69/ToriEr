class Event{
    constructor(theme,event,date,pics){
        this.theme = theme,
        this.event = event,
        this.date = date,
        this.pics = pics
    }
}

class Theme{
    constructor(theme,events){
        this.theme = theme
        this.events = events
        this.isChecked = true
    }
}