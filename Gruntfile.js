var path = require('path')

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapRootpath: '../'
                },
                files: [{
                    cwd: 'less',
                    expand: true,
                    src: '*.less',
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        jade: {
            main: {
                options: {
                    pretty: false
                },
                files: [{
                    expand: true,
                    src: 'jade/*.jade',
                    rename : function (dest, src) {
                        return src.replace(/\.jade$/, '.html')
                    }
                }]
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less'],
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
                files: [{
                    expand: true,
                    src: 'dist/*.css'
                }]
            }
        },
        cssmin: {
            options : {
                keepSpecialComments: 0
            },
            dist: {
                files: [{
                    expand: true,
                    src: 'dist/*.css'
                }]
            }
        },
        clean: {
            build: {
                src: [
                    'dist',
                    'tests/desktop/screenshots/*.diff.png',
                    'tests/mobile/screenshots/*.diff.png',
                    'tests/desktop/screenshots/*.fail.png',
                    'tests/mobile/screenshots/*.fail.png'
                ]
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
            full: ['watch:styles', 'watch:styledown', 'watch:livereload', 'watch:jade'],
            dev: ['watch:styles', 'watch:livereload', 'watch:jade']
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



    grunt.registerTask('build', [
        'jade:main',
        'less',
        'autoprefixer',
        'cssmin',
        'styledown'
    ])
    grunt.registerTask('server:dev', [
        'connect', 'concurrent:dev'
    ])
    grunt.registerTask('server:full', [
        'connect', 'concurrent:full'
    ])

    grunt.registerTask('dev', [
        'build', 'server:dev'
    ])

    grunt.registerTask('full', [
        'build', 'server:full'
    ])

    grunt.registerTask('default', [
        'build'
    ])

    grunt.registerTask('test', [
        'clean',
        'build',
        'connect',
        'phantomcss',
        'clean'
    ])

}
