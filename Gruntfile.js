var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            essencial: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'essencial/output/styles.css.map',
                    sourceMapURL: 'styles.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'essencial/output/styles.css': 'essencial/styles.less',
                    'essencial/output/essencial.thin.css': 'essencial/essencial.thin.less'
                }
            },
            'essencial.componentize': {
                files: {
                    'essencial/output/essencial.fat.css': 'essencial/essencial.fat.less'
                }
            },
            main: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'dist/main.css.map',
                    sourceMapURL: 'main.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'dist/main.css': 'less/styles.less'
                }
            }
        },
        jade: {
            essencial: {
                options: {
                    pretty: true
                },
                files: {
                    'essencial/output/index.html': ['essencial/index.jade']
                }
            },
            'essencial.includes': {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    'dist/essencial/utf-8/navglobal.html': ['essencial/jade/navglobal.jade'],
                    'dist/essencial/utf-8/footer.html': ['essencial/jade/footer.jade'],
                    'dist/essencial/utf-8/portaltopo.html': ['essencial/jade/portaltopo.jade'],
                    'dist/essencial/utf-8/scripts.html': ['essencial/jade/scripts.jade']
                }
            },
            main: {
                options: {
                    pretty: true
                },
                files: {
                    'index.html': ['index.jade']
                }

            }
        },
        watch: {
            'styles.essencial': {
                files: ['**/*.less'],
                tasks: ['less:essencial', 'uncss:essencial', 'less:essencial.componentize'],
                options: {
                    spawn: false
                }
            },
            'jade.essencial': {
                files: ['**/*.jade'],
                tasks: ['jade:essencial'],
                options: {
                    spawn: false
                }
            },

            styles: {
                files: ['**/*.less'],
                tasks: ['less:main'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade:main'],
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
                    css: 'dist/fat.css',
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
                    'essencial/output/uncss.css': ['essencial/output/index.html']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ie 9'],
                map: true
            },
            essencial: {
                src: 'essencial/output/essencial.fat.css'
            },
            main: {
                src: 'dist/main.css'
            }
        },
        cssmin: {
            options : {
                keepSpecialComments: 0,
                rebase: true,
                target: './',
                relativeTo: '../../'
            },
            essencial: {
                files: {
                    'dist/essencial/fat.css' : 'essencial/output/essencial.fat.css',
                    'dist/essencial/thin.css' : 'essencial/output/essencial.thin.css'
                }
            }
        },
        clean: {
            build: {
                src: ['dist', 'essencial/output']
            },
            essencial: {
                src: ['essencial/output', 'essencial/tests/**/results']
            }
        },
        usebanner: {
            essencial: {
                options: {
                    position: 'top',
                    banner: '/*! <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */',
                },
                files: {
                    src: ['dist/essencial/fat.css', 'dist/essencial/thin.css', 'dist/main.css']
                }
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
            essencial: ['watch:styles.essencial', 'watch:livereload', 'watch:jade.essencial'],
            main: ['watch:styles', 'watch:livereload', 'watch:jade']
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
                }, {
                    dest: 'dist/essencial/iso-8859-1/scripts.html',
                    src: 'dist/essencial/utf-8/scripts.html'
                }]
            }
        },
        phantomcss: {
            'essencial.desktop': {
                options: {
                    screenshots: 'essencial/tests/desktop/screenshots/',
                    results: 'essencial/tests/desktop/results/',
                    viewportSize: [800, 800]
                },
                src: [ 'essencial/tests/**/*desktop.js' ]
            },
            'essencial.mobile': {
                options: {
                    screenshots: 'essencial/tests/mobile/screenshots/',
                    results: 'essencial/tests/mobile/results/',
                    viewportSize: [320, 480]
                },
                src: [ 'essencial/tests/**/*mobile.js' ]
            }
        }
    })

    // region loadNpmTasks
    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-banner')
    grunt.loadNpmTasks('grunt-charset')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-phantomcss')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')
    // endregion

    grunt.registerTask('build.essencial', [
        'jade:essencial',             // gera html
        'less:essencial',             // gera styles dos módulos essenciais
        'uncss:essencial',            // faz o uncss do essencial/fat.css
        'less:essencial.componentize' // gera o arquivo no escopo sf-component
    ])
    grunt.registerTask('server.essencial', [
        'connect', 'concurrent:essencial'
    ])
    grunt.registerTask('dev.essencial', [
        'build.essencial', 'server.essencial'
    ])
    grunt.registerTask('essencial', [
        'clean:build',                    // limpar arquivos antigos

        'build.essencial',                // gera html, styles, faz o uncss e componentiza
        'autoprefixer:essencial',         // autoprefixa

        'connect',                        // comparação de screenshots
        'phantomcss:essencial.mobile',
        'phantomcss:essencial.desktop',

        'cssmin:essencial',               // comprime o css gerado
        'usebanner:essencial',            // insere o banner nos arquivos css

        'jade:essencial.includes',        // gera os html para inserção
        'charset',                        // gera cópia do include em iso-88959-1

        'clean:essencial'                 // limpar arquivos que não seja de distribuição
    ])

    grunt.registerTask('build', [
        'jade:main',
        'less:main'
    ])
    grunt.registerTask('server', [
        'connect', 'concurrent:main'
    ])
    grunt.registerTask('dev', [
        'build', 'server'
    ])

    grunt.registerTask('default', [
        'essencial', 'styledown'
    ])

}
