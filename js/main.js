/// <reference path='cible.js' />
/// <reference path='content.js' />

class Main {

    constructor() {
        this.cible = new Cible()
        this.content = new Content()
    }

    RegisterOnReady() {
        this.cible.RegisterOnReady()
        this.content.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }

    onReady() {
        console.log('Main.onReady')

        $(this.cible).on('cibleSelected', $.proxy(this.onCibleSelected, this))
    }

    onCibleSelected(e, data) {
        this.content.setContent(data)
    }
}

let main = new Main()
main.RegisterOnReady()