var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'css/styles.css.map',
                    sourceMapURL: 'styles.css.map'
                },
                files: {
                    "css/styles.css": "css/styles.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less', 'uncss'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade'],
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
                    css: 'css/styles.css',
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
                    'css/essencial.css': ['index.html']
                }
            }
        },
        autoprefixer: {
            essencial: {
                options: {
                    browsers: ['last 2 versions', 'ie 9']
                },
                src: 'css/styles.css'
            }
        },
        cssmin: {
            dist: {
                options : {
                    keepSpecialComments: 0
                },
                files: {
                    'css/essencial.css': ['css/essencial.css'],
                    'css/styles.css': ['css/styles.css']
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    "index.html": ["index.jade"],
                    "essencial.html": ["essencial.jade"]
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
        }
    })

    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.registerTask('default', [
        'jade', 'less', 'autoprefixer', 'uncss:essencial', 'cssmin', 'styledown'
    ])
    grunt.registerTask('dev', [
        'jade', 'less', 'connect', 'concurrent'
    ])

}
