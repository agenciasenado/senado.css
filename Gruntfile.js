var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
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
            styledown: {
                files: ['**/*.less'],
                tasks: ['styledown'],
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
                    'index.html': ['less/**/*.less']
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
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ie 9'],
                map: true
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
            }
        },
        clean: {
            build: {
                src: ['dist', 'tests/desktop/results', 'tests/mobile/results']
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
            main: ['watch:styles', 'watch:styledown', 'watch:livereload', 'watch:jade']
        },
        phantomcss: {
            'desktop': {
                options: {
                    screenshots: 'tests/desktop/screenshots/',
                    results: 'tests/desktop/results/',
                    viewportSize: [1200, 1200]
                },
                src: [ 'tests/**/*desktop.js' ]
            },
            'mobile': {
                options: {
                    screenshots: 'tests/mobile/screenshots/',
                    results: 'tests/mobile/results/',
                    viewportSize: [480, 480]
                },
                src: [ 'tests/**/*desktop.js' ]
            }
        }
    })

    // region loadNpmTasks
    grunt.loadNpmTasks('grunt-banner')
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

    grunt.registerTask('build', [
        'jade:main',
        'less:main',
        'styledown'
    ])
    grunt.registerTask('server', [
        'connect', 'concurrent:main'
    ])
    grunt.registerTask('dev', [
        'build', 'styledown', 'server'
    ])

    grunt.registerTask('default', [
        'build', 'styledown'
    ])

    grunt.registerTask('test', [
        'build',
        'connect',
        'phantomcss',
        'clean'
    ])


}
