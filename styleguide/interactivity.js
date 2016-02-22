// jshint browser:true

'use strict'

var $ = require('jquery')
var Draggabilly = require('draggabilly')

module.exports = function () {

  $('.codecollapse').on('click', function () {
    $(this).prev('pre').toggle()
  })

  $('.responsive-bar').on('click', 'img', function () {
    var $this = $(this)
    $this.closest('.iframe-wrapper').width($this.data('width'))
  })

  $('.drag-handler').each(function () {

    var $dragHandler = $(this)

    var draggie = new Draggabilly(this, {
      axis: 'x'
    })

    draggie.on('pointerDown', function () {
      var $container = $dragHandler.closest('.iframe-wrapper')
      var $mask = $container.find('.drag-mask')
      var containerWidth = $container.width()

      $mask.show()
      $container.addClass('is-dragging')
      $dragHandler
        .css({ left: containerWidth - $dragHandler.outerWidth() })
        .data('container', $container)
        .data('mask', $mask)
        .data('container-width', containerWidth)
    })
    .on('dragMove', function (evt, pointer, vector) {
      $dragHandler.data('container').width(
        $dragHandler.data('container-width') + vector.x
      )
    })
    .on('dragEnd', function () {
      $dragHandler.data('container').removeClass('is-dragging')
      $dragHandler.removeAttr('style').data('mask').hide()
    })

  })

}
