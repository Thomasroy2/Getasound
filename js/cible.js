
class Cible {

    constructor() {
        this.cibles = Cibles
    }

    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }

    onReady() {
        console.log('Cible.onReady')
        let test = this.cibles.filter(cible => cible.name == "B2C")
        this.setCibles()
    }

    setCibles() {
        let ciblesRow = $('#cibles_row')
        ciblesRow.empty()
        this.cibles.forEach(cible => {
            let html = Cible.getHtmlCol(cible)
            $('#cibles_row').append(html)
        });

        this.setOnCLick()
    }

    setOnCLick() {
        $('#cibles_row > .col > .card').each((i, card) => {
            $(card).click($.proxy(Cible.onClick, this))
        })
    }

    static onClick(e) {
        let target = $(e.currentTarget)
        if (!target.hasClass('border-primary')) {
            let selected = $('#selected_cible')
            selected.removeAttr('id')
            selected.removeClass('border-primary')
            target.addClass('border-primary')
            target.attr('id', 'selected_cible')

            $(this).trigger('cibleSelected', {content: target.parent().data('content'), cible: target.parent().data('cible')})
        }
    }

    static getHtmlCol(cible) {
        let html = '<div class="col" id="' + cible.name + '" data-content=' + JSON.stringify(cible.content) + ' data-cible=' + cible.name + '>'

        html += '<div class="card">'
        html += '<p class="card_title font-weight-normal">'
        html += cible.name
        html += '</p>'
        html += '<img class="mx-auto" src="https://assistant.getasound.com/assets/factory.png" alt="">'
        html += '</div>'
        html += '</div>'

        return html
    }
}

const Cibles =
[
    {
        name: 'B2B',
        content: [
            {
                name: 'Entreprise',
                infos: ''
            },
            {
                name: 'Association',
                infos: ''
            },
            {
                name: 'Public',
                infos: ''
            },
            {
                name: 'Autres',
                infos: ''
            }
        ]
    }, {
        name: 'B2C',
        content: [
            {
                name: 'Homme',
                infos: ''
            },
            {
                name: 'Femme',
                infos: ''
            },
            {
                name: 'Autres',
                infos: ''
            }
        ]
    }
]