# senado.css

> conjunto de componentes `less` e guia de estilo do portal senado.noticias

## pré-requisitos

* [node](https://iojs.org)
* grunt (`npm -g install grunt-cli`)

## instalação

O senado.css é um conjunto de estilos css utilizados no portal `senado.noticias`. Sua organização é inspirada no
[smacss](http://smacss.com); sua nomenclatura, no [suitcss](http://suitcss.github.io/).

Para gerar os arquivos de distribuição, é necessário a instalação do grunt.

    npm -g install grunt-cli
    cd senado.css
    npm install
    grunt

Os seguintes arquivos serão gerados:

* **dist/styles.css**: combinado do bootstrap + todos os componentes
* **dist/essencial.css**: combinado das classes necessárias para utilização do topo, navegação e rodapé
* **dist/*.html**: markup dos componentes essenciais.

## desenvolvimento

Para compilar os arquivos .less e .jade automaticamente ao editá-los execute:

    grunt dev

## problemas comuns

### Configurações de proxy

O `npm` no Windows não enxerga as configurações de proxy automaticamente. Para configurar utilize:

    npm config set proxy http://user:password@host:port
    npm config set https.proxy http://user:password@host:port
