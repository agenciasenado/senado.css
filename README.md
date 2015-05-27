# senado.css

> conjunto de componentes `less` e guia de estilo do portal senado.noticias

----
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

* styles.css: combinado do bootstrap + todos os componentes
* essencial.css: combinado das classes necessárias para utilização do topo, navegação e rodapé
* index.html: markup dos componentes essenciais.