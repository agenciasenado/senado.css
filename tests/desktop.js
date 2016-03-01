/* global casper, phantomcss, __utils__ */

var classNames = [];

casper.start('http://localhost:8000/styleguide')
.then(function () {
  phantomcss.pathToTest = './';
  classNames = this.evaluate(function () {
    $()
    var blocks = __utils__.findAll('figure');
    return Array.prototype.map.call(blocks, function (el) {
      var className = el.classList[1];
      return className;
    });
  });
}).then(function () {
  classNames.forEach(function (className) {
    phantomcss.screenshot('.' + className + ' .sg-canvas', className.split('sg-section-')[1]);
  });
});
