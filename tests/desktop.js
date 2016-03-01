/* global casper, phantomcss, __utils__ */

var classNames = []

casper.start('http://localhost:8000/styleguide')
.on('page.error', function (msg, trace) {
  this.echo('Error:    ' + msg, 'ERROR');
  this.echo('file:     ' + trace[0].file, 'WARNING');
  this.echo('line:     ' + trace[0].line, 'WARNING');
  this.echo('function: ' + trace[0]['function'], 'WARNING');
})
.waitFor(function () {
  return this.evaluate(function () {
    return document.querySelectorAll('iframe').length > 0
  })
})
.then(function () {
  phantomcss.pathToTest = './'
  classNames = this.evaluate(function () {
    var blocks = __utils__.findAll('iframe')
    return Array.prototype.map.call(blocks, function (el) {
      return el.id
    })
  })
})
.then(function () {
  classNames.forEach(function (className) {
    phantomcss.screenshot('#' + className, className)
  })
})
