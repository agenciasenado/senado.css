/* global casper, phantomcss */

casper.start('http://localhost:8000/essencial/output')
.then(function() {
    phantomcss.screenshot('body', 'body-open')
})
.then(function() {
    this.mouse.click('.sf-H1');
    phantomcss.screenshot('body', 'body-closed')
})
.then(function() {
    this.mouse.click('.PortalTopo-toggler--menu')
    this.wait(500, function () {
        phantomcss.screenshot('body', 'menu-open')
     })
})