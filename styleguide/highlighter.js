'use strict'

var $ = require('jquery')
var Prism = require('prismjs')
var examples = require('./examples')

module.exports = function () {

  $('pre code[class^="lang"]').each(function () {
    var $this = $(this)
    var $pre = $this.closest('pre')
    var $wrap = $('figure').insertBefore($pre)
    var conf = {}
    var text = $this.text()

    $this.attr('class').replace(/^lang-(\w+)(?::(\w+))?/, function ($0, $1, $2) {
      if ($2) {
        return 'example:' + $2 + ',lang:' + $2
      }

      if ($1 === 'example') {
        return 'example:html'
      }

      return 'lang:' + $1
    }).split(/\s*,\s*/).forEach(function (opt) {
      opt = opt.split(':')
      conf[opt.shift().trim()] = opt.join(':').trim()
    })

    $this.removeAttr('class')
    $wrap.append($pre)

    if (conf.lang in Prism.languages) {
      $this.html(Prism.highlight(text, Prism.languages[conf.lang]))
    }

    // conditionally create code examples
    if (conf.example in examples.lang) {
      examples.lang[conf.example]($pre, text, conf)

      if (!(conf.lang in Prism.languages)) {
        $pre.remove()
      }
    }

  })

}
