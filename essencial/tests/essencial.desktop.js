/* global casper, phantomcss */

casper.start('http://localhost:8000/essencial/output')
.then(function() {
    this.mouse.click('.sf-H1');

    phantomcss.screenshot('.NavGlobal', 'topo global')
    phantomcss.screenshot('.PortalTopo', 'topo portal')
    phantomcss.screenshot('.FooterMain', 'rodape global')

    phantomcss.screenshot('.Nav--principal', 'navegacao principal')
    phantomcss.screenshot('.Nav--secundaria', 'navegacao secundaria')

    phantomcss.screenshot('.Breadcrumbs', 'breadcrumbs')
    phantomcss.screenshot('.titulo-principal', 'titulo principal')

})
.then(function() {
    this.mouse.click('.sf-H1');

    this.mouse.click('.NavGlobal-toggle')
    phantomcss.screenshot('.NavGlobal-dropdownMenu', 'menu portais aberto')

})
.then(function() {
    this.mouse.click('.sf-H1');

    this.mouse.click('.Nav--principal .dropdown-toggle')
    phantomcss.screenshot('.Nav--principal', 'nav principal dropdown aberto')
    phantomcss.screenshot('.Nav--principal .dropdown-menu', 'dropdown aberto')

})

