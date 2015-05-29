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
            dist: {
                files: {
                    "dist/essencial.css": "css/dist.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less:styles', 'autoprefixer', 'uncss:essencial', 'less:dist'],
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
            dist: {
                options : {
                    keepSpecialComments: 0
                },
                files: {
                    'dist/essencial.css': ['dist/essencial.css'],
                    'dist/styles.css': ['dist/styles.css']
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
                    "essencial.html": ["essencial.jade"],
                }
            },
            dist: {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    "dist/navglobal.html": ["jade/navglobal.jade"],
                    "dist/portaltopo.html": ["jade/portaltopo.jade"],
                    "dist/footer.html": ["jade/footer.jade"]
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

    grunt.registerTask('build', [
        'jade'
        ,'less:styles'
        ,'autoprefixer'
        ,'uncss:essencial'
        ,'less:dist'
        ,'cssmin'
    ])
    grunt.registerTask('default', [
        'build', 'styledown'
    ])
    grunt.registerTask('server', [
        'connect', 'concurrent'
    ])
    grunt.registerTask('dev', [
        'build', 'server'
    ])

}
