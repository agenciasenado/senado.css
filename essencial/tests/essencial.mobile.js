/* global casper, phantomcss */

casper.start('http://localhost:8000/essencial/output')
.then(function() {
    this.mouse.click('.sf-H1');
    phantomcss.screenshot('body', 'body')
    phantomcss.screenshot('.NavGlobal', 'topo global')
    phantomcss.screenshot('.PortalTopo', 'topo portal')
    phantomcss.screenshot('.FooterMain', 'rodape global')
    phantomcss.screenshot('.container-miolo', 'miolo')
})
.then(function() {
    this.mouse.click('.sf-H1');
    this.mouse.click('.NavGlobal-toggle')
    phantomcss.screenshot('.NavGlobal-dropdownMenu', 'menu portais aberto')
}).then(function () {
    this.mouse.click('.sf-H1');
    this.mouse.click('.PortalTopo-toggler--menu')
    this.wait(400, function () {
        phantomcss.screenshot('.Nav--principal', 'nav principal aberto')
    })
})
.then(function () {
    this.mouse.click('.Nav--principal .caret')
    this.wait(50, function () {
        phantomcss.screenshot('.Nav--principal', 'nav principal dropdown aberto')
    })
})