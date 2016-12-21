module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' })

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {

      main: {
        options: {
          paths: ['./node_modules'],
          sourceMap: true,
          sourceMapRootpath: '../',
          sourceMapFileInline: true
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
          ext: '.html'
        }]
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: '<%= connect.options.livereload %>'
      },
      styles: {
        files: ['**/*.less'],
        tasks: ['less', 'postcss']
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade:main']
      }
    },

    cssmin: {
      options: {
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
      options: {
        port: 8000,
        livereload: 35729,
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(require('cors')())
            return middlewares
          }
        }
      }
    },

    postcss: {
      main: {
        options: {
          map: true,
          processors: [
            require('mdcss')({
              theme: require('mdcss-theme-fabianonunes'),
              examples: {
                css: ['../dist/main.css']
              },
              destination: 'styleguide'
            }),
            require('autoprefixer')({
              browsers: ['> 1%', 'last 2 versions', 'ie 9'],
            })
          ]
        },
        files: [{
          expand: true,
          src: 'dist/*.css'
        }]
      }
    }

  })

  grunt.registerTask('build', [
    'clean',
    'jade:main',
    'less',
    'postcss'
  ])

  grunt.registerTask('dev', [
    'build', 'connect', 'watch'
  ])

  grunt.registerTask('default', [
    'build',
    'cssmin'
  ])

  grunt.registerTask('test', [
    'clean',
    'build',
    'connect',
    'clean'
  ])
}
