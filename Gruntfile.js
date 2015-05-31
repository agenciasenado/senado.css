var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            senado: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'less/styles.css.map',
                    sourceMapURL: 'styles.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'less/styles.css': 'less/styles.less'
                }
            },
            essencial: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'essencial/styles.css.map',
                    sourceMapURL: 'styles.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'essencial/styles.css': 'essencial/styles.less'
                }
            },
            componentize: {
                files: {
                    'essencial/essencial.css': 'essencial/essencial.less'
                }
            }
        },
        jade: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    'essencial/index.html': ['essencial/index.jade']
                }
            },
            includes: {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    'dist/essencial/utf-8/navglobal.html': ['essencial/jade/navglobal.jade'],
                    'dist/essencial/utf-8/footer.html': ['essencial/jade/footer.jade'],
                    'dist/essencial/utf-8/portaltopo.html': ['essencial/jade/portaltopo.jade']
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less:essencial', 'uncss:essencial'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade:dev'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['**/*.css', '**/*.html']
            }
        },
        styledown: {
            build: {
                files: {
                    'styleguide/index.html': ['**/less/**/*.less']
                },
                options: {
                    css: 'dist/styles.css',
                    config: 'styleguide/config.md',
                    sg_css: 'styleguide/styledown.css',
                    sg_js: 'styleguide/styledown.js',
                    title: 'Senado.CSS'
                }
            }
        },
        uncss: {
            essencial: {
                options : {
                    ignore: ['.collapse.in', '.collapsing', '.open'],
                    stylesheets: ['styles.css']
                },
                files: {
                    'essencial/essencial.css': ['essencial/index.html']
                }
            }
        },
        autoprefixer: {
            // TODO: verficar se o prefixer está funcionando
            essencial: {
                options: {
                    browsers: ['last 2 versions', 'ie 9'],
                    map: true
                },
                src: 'essencial/styles.css'
            }
        },
        cssmin: {
            options : {
                keepSpecialComments: 1,
                rebase: true
            },
            essencial: {
                files: {
                    'dist/essencial/dist.css' : 'essencial/essencial.css'
                }
            }
        },
        clean: {
            build: {
                src: ['dist']
            },
            essencial: {
                src: ['essencial/*.html', 'essencial/*.css', 'essencial/*.map']
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(function(req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*')
                            res.setHeader('Access-Control-Allow-Methods', '*')
                            next()
                        })
                        return middlewares
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
            },
            styles: ['watch:styles', 'watch:livereload', 'watch:jade']
        },
        charset: {
            essencial : {
                options: {
                    from: 'utf8',
                    to: 'iso-8859-1',
                },
                files: [{
                    dest: 'dist/essencial/iso-8859-1/footer.html',
                    src: 'dist/essencial/utf-8/footer.html'
                }, {
                    dest: 'dist/essencial/iso-8859-1/navglobal.html',
                    src: 'dist/essencial/utf-8/navglobal.html'
                }, {
                    dest: 'dist/essencial/iso-8859-1/portaltopo.html',
                    src: 'dist/essencial/utf-8/portaltopo.html'
                }]
            }
        }
    })

    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-charset')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.registerTask('build', [
        'jade:dev',            // gera html
        'less:essencial',      // gera styles dos módulos essenciais
        'autoprefixer',        // autoprefixa
        'uncss:essencial'      // faz o uncss do essencial/styles.css
    ])

    grunt.registerTask('essencial', [
        'clean:build',         // limpar arquivos antigos
        'build',               // gera html, styles, autoprefixa e faz o uncss
        'less:componentize',   // gera o arquivo no escopo sf-component
        'jade:includes',       // gera os html para include
        'charset',             // gera cópia do include em iso-88959-1
        'cssmin:essencial',    // minifica o css gerado
        'clean:essencial'      // limpar arquivos que não seja de distribuição
    ])

    grunt.registerTask('default', [
        'essencial', 'styledown'
    ])

    grunt.registerTask('server', [
        'connect', 'concurrent'
    ])

    grunt.registerTask('dev', [
        'build', 'server'
    ])

}
