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
            essencial: {
                options : {
                    keepSpecialComments: 0
                },
                files: {
                    'css/essencial.css': ['css/essencial.css']
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
        }
    })

    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    grunt.registerTask('default', ['jade', 'less', 'autoprefixer', 'uncss:essencial', 'cssmin:essencial'])

}
