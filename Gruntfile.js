var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            styles: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'dist/styles.css.map',
                    sourceMapURL: 'styles.css.map'
                },
                files: {
                    "dist/styles.css": "css/styles.less"
                }
            },
            essencial: {
                files: {
                    "dist/essencial.css": "css/essencial.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less:styles', 'autoprefixer', 'uncss:essencial', 'less:essencial'],
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
                    livereload: true,
                    spawn: false
                },
                files: ['**/*.css', '**/*.html']
            }
        },
        styledown: {
            build: {
                files: {
                    'styleguide/index.html': ['**/css/**/*.less']
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
                    ignore: ['.collapse.in', '.collapsing', '.open']
                },
                files: {
                    'dist/essencial.css': ['index.html']
                }
            }
        },
        autoprefixer: {
            essencial: {
                options: {
                    browsers: ['last 2 versions', 'ie 9'],
                    map: true
                },
                src: 'dist/styles.css'
            }
        },
        cssmin: {
            options : {
                keepSpecialComments: 1,
                rebase: false
            },
            dist: {
                options : {
                    rebase: true
                },
                files: {
                    'dist/essencial/dist.css' : 'dist/essencial.css'
                }
            }
        },
        jade: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    "index.html": ["index.jade"],
                    "essencial.html": ["essencial.jade"]
                }
            },
            essencial: {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    "dist/essencial/navglobal.utf8.html": ["jade/navglobal.jade"],
                    "dist/essencial/footer.utf8.html": ["jade/footer.jade"],
                    "dist/essencial/portaltopo.html": ["jade/portaltopo.essencial.jade"]
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
            styles: ['watch:styles', 'watch:livereload', 'watch:jade']
        },
        charset: {
            dist : {
                options: {
                    from: 'utf8',
                    to: 'iso-8859-1',
                },
                files: [{
                    dest: 'dist/footer.iso88591.html',
                    src: 'dist/footer.utf8.html'
                }, {
                    dest: 'dist/navglobal.iso88591.html',
                    src: 'dist/footer.utf8.html'
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
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.registerTask('build', [
        'jade'
        ,'charset'
        ,'less:styles'
        ,'autoprefixer'
        ,'uncss:essencial'
        ,'less:essencial'
    ])

    grunt.registerTask('essencial', [
        'build' ,'cssmin'
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
