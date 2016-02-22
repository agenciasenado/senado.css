/* global examples */

'use strict'

var $ = require('jquery')
var colorsUtils = require('./colors-utils')

var templates = {
  responsiveBar: require('./templates/responsive-bar.jade'),
  iframe: require('./templates/iframe.jade')
}

module.exports.lang = {

  color: function ($pre, value) {
    var $colors = $('<div/>').insertBefore($pre)
    var lines = value.trim().split(/\n+/)

    $colors.addClass('colors')

    lines
      .map(colorsUtils.parseLine)
      .map(colorsUtils.parseColor)
      .forEach($colors.append, $colors)
  },

  html: function ($pre, value, conf) {

    var $wrap = $('<div/>').insertBefore($pre)
    $wrap.addClass('iframe-wrapper')
    $wrap.html(templates.responsiveBar())

    var $iframe = $('<iframe></iframe>').appendTo($wrap)
    var iwin = $iframe[0].contentWindow
    var idoc = iwin.document

    idoc.open()
    idoc.write(templates.iframe({
      examples: examples,
      value: value
    }))
    idoc.close()

    // add default block styles to iframe dom
    idoc.documentElement.setAttribute('style', examples.htmlcss)
    idoc.body.setAttribute('style', examples.bodycss)
    idoc.body.setAttribute('id', 'sfcss')

    if (conf.width) {
      $iframe.css({ width: String(conf.width) })
    }

    var documentElement = idoc.documentElement
    var scrollHeight

    function resize() {
      var currentScrollHeight = idoc.getElementById('contentWrapper').offsetHeight
      if (scrollHeight !== currentScrollHeight) {
        scrollHeight = currentScrollHeight
        $iframe.css({ height: 0 })
        var iframeH = documentElement.scrollHeight + ($iframe[0].offsetHeight - iwin.innerHeight)
        $iframe.css({ height: iframeH + 'px' })
      }
    }

    iwin.addEventListener('load', resize)
    resize()
    setInterval(resize, 16)

  }
}
