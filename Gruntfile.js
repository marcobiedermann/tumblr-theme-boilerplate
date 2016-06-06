'use strict';

module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source',
      build: 'dist',
      tmp: '.tmp'
    },

    assemble: {
      options: {
        layout: 'default.html',
        layoutdir: '<%= config.source %>/templates/layouts',
        partials: '<%= config.source %>/templates/partials/**/*.html'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/templates/pages',
        dest: '<%= config.tmp %>',
        src: '**/*.html'
      }
    },

    clean: {
      dist: ['<%= config.build %>'],
      tmp: ['<%= config.tmp %>'],
      sass: ['.sass-cache']
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 3 versions']
          })
        ]
      },
      files: {
        expand: true,
        cwd: '<%= config.tmp %>/assets/css',
        dest: '<%= config.tmp %>/assets/css',
        src: '**/*.css'
      }
    },

    processhtml: {
      files: {
        expand: true,
        cwd: '<%= config.tmp %>',
        dest: '<%= config.build %>',
        src: '*.html'
      }
    },

    sass: {
      options: {
        style: 'expanded'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/assets/scss',
        dest: '<%= config.tmp %>/assets/css',
        src: ['**/*.scss'],
        ext: '.css'
      }
    },

    svgmin: {
      options: {

      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/assets/img',
        dest: '<%= config.tmp %>/assets/img',
        ext: '.svg',
        src: ['**/*.svg']
      }
    },

    svgstore: {
      options: {
        prefix : 'icon-',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      default: {
        files: {
          '<%= config.tmp %>/assets/img/icons.svg': ['<%= config.tmp %>/assets/img/icons/*.svg'],
        }
      }
    },

    watch: {

      css: {
        files: ['<%= config.source %>/assets/css/**/*.css'],
        tasks: []
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      html: {
        files: ['<%= config.source %>/templates/**/*.html'],
        tasks: ['assemble', 'processhtml']
      },

      sass: {
        files: ['<%= config.source %>/assets/scss/**/*.scss'],
        tasks: ['sass', 'postcss', 'processhtml']
      },

      svg: {
        files: ['<%= config.source %>/assets/img/**/*.svg'],
        tasks: []
      }

    }

  });

  grunt.registerTask('default', [
    'sass',
    'postcss',
    'assemble',
    'processhtml',
    'svgmin',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'sass',
    'postcss',
    'assemble',
    'processhtml',
    'svgmin',
    'clean:tmp',
    'clean:sass'
  ]);

};
