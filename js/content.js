
class Content {

    constructor() {
    }

    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }

    onReady() {
        $('#contents_title').hide()
        $('#infos_title').hide()
        console.log('Content.onReady')
    }

    setContent(data) {
        let contents = data.content

        $('#infos_title').hide()
        $('#infos').hide()

        let contentsRow = $('#contents_row')
        contentsRow.empty()
        contents.forEach(content => {
            let html = Content.getHtmlCol(content, data.cible)
            contentsRow.append(html)
        });

        $('#contents_title').text(data.cible)
        $('#contents_title').show()
        this.setOnCLick()
    }


    setOnCLick() {
        $('#contents_row > .col > .card').each((i, card) => {
            $(card).click($.proxy(Content.onClick, this))
        })
    }

    setInfosField(infos) {
        $('#infos').remove()
        $('#infos_title').show()
        $('#bellow').append(Content.getInfosFieldHtml(infos))
        $('#infos_area').bind('input change', $.proxy(Content.onChange, this))
    }

    static onChange(e) {
        let target = $(e.currentTarget)
        let infos = target.val().trim().replace(/\s\s+/g, ' ')
        $('#word_count').text(Content.wordCount(infos) + ' mots')

        let selectedContent = $('#selected_content')
        selectedContent.data('infos', target.val())

        let selectedCible = $('#' + selectedContent.data('cible'))
        let selectedCibleContents = selectedCible.data('content')

        let selectedCibleContent = selectedCibleContents.filter(content => content.name == selectedContent.data('name'))
        selectedCibleContent[0].infos = target.val()

        selectedCible.data('content', selectedCibleContents)
    }

    static onClick(e) {
        let target = $(e.currentTarget)
        if (!target.hasClass('border-primary')) {
            let selected = $('#selected_content')
            selected.removeAttr('id')
            selected.removeClass('border-primary')
            target.addClass('border-primary')
            target.attr('id', 'selected_content')
            this.setInfosField(target.data('infos'))
        }
    }

    static getHtmlCol(content, cible) {
        let html = '<div class="col">'

        html += '<p class="card_title font-weight-normal">'
        html += content.name
        html += '</p>'
        html += '<div class="card" data-cible=' + cible + ' data-name=' + content.name + ' data-infos=' + content.infos + '>'
        html += '<img class="mx-auto" src="https://assistant.getasound.com/assets/boy.png" alt="">'
        html += '</div>'
        html += '</div>'

        return html
    }

    static getInfosFieldHtml(infos) {
        let html = '<div class="container w-75" id="infos">'

        html += '<p class="text-right text-info" id="word_count">'
        html += Content.wordCount(infos) + ' mots'
        html += '</p>'
        html += '<div class="form-group">'
        html += '<textarea class="form-control" id="infos_area" rows="3">' + infos + '</textarea>'
        html += '</div>'
        html += '</div>'


        return html
    }

    static wordCount(infos) {
        if (infos.length != 0) {
            let wordCount = 123 - infos.split(' ').length
            if (wordCount <= 0) {
                Content.changeWordCountColor()
            }
            return wordCount
        } else {
            return 123
        }
    }

    static changeWordCountColor() {
        let wordCount = $('#word_count')
        if (wordCount.hasClass('text-info')) {
            wordCount.removeClass('text-info')
            wordCount.addClass('text-danger')
        } else {
            wordCount.removeClass('text-danger')
            wordCount.addClass('text-info')
        }
    }
}