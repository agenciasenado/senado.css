var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: true,
                    cleancss: true,
                    optimization: 2,
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
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        styledown: {
            build: {
                files: {
                    'docs/styleguide/index.html': ['**/css/**/*.less']
                },
                options: {
                    css: '../senado/radio/static/css/styles.css',
                    config: 'docs/styleguide/config.md',
                    sg_css: 'docs/styleguide/styledown.css',
                    sg_js: 'docs/styleguide/styledown.js',
                    title: 'Rádio Senado'
                }
            }
        },
        uncss: {
            dist: {
                options : {
                    ignore: ['.collapse.in', '.collapsing', '.open']
                },
                files: {
                    'css/tidy.css': ['index.html']
                }
            }
        },
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 2 versions', 'ie 9']
                },
                src: 'css/styles.css'
            }
        },
        cssmin: {
            target: {
                files: {
                    'css/styles-min.css': ['css/styles.css'],
                    'css/tidy-min.css': ['css/tidy.css']
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    grunt.registerTask('default', ['less', 'autoprefixer', 'uncss', 'cssmin'])

}
