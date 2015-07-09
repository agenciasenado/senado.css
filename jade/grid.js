/* global jQuery */
(function ($) {
    'use strict';

    var addRow = $('.js-add-row'),
        container = $('.js-container'),
        template_row = $('.js-template-row'),
        template_col = $('.js-template-col')

    function activate (template) {
        return $(document.importNode(template.get(0).content, true));
    }

    addRow.on('click', function (e) {
        container.append(activate(template_row))
    })

    $(document.body).on('click', '.js-addcol', function (e) {
        var $this = $(e.currentTarget)
        $this.closest('.row').append(activate(template_col))
    })

    $(document.body).on('click', '.js-remove', function (e) {
        var $this = $(e.currentTarget)
        $this.closest('.' + $this.data('type')).remove()
    })

    $(document.body).on('click', '.js-split', function (e) {

        var $this = $(e.currentTarget),
            col = $this.closest('.col'),
            parent_col = activate(template_col),
            row = activate(template_row),
            parent = col.parent()

            parent_col.append(row).appendTo(parent)

            row = parent.children().last().children().first()
            col.detach()
            col.appendTo(row)

    })

    $(document.body).on('click', '.js-change-width', function (e) {

        e.preventDefault()

        var $this = $(e.currentTarget),
            col = $this.closest('.col').get(0),
            size = $this.data('value')

        col.className = col.className.replace(/\bcol-[^ ]*/, 'col-xs-' + size);

    })

})(jQuery)