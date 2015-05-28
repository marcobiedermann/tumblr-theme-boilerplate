'use strict';

module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    cmq: 'grunt-combine-media-queries'
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

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        cwd: '<%= config.tmp %>/css',
        dest: '<%= config.tmp %>/css',
        src: '**/*.css'
      }
    },

    clean: {
      dist: ['<%= config.build %>'],
      tmp: ['<%= config.tmp %>'],
      sass: ['.sass-cache']
    },

    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true,
        caseSensitive: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      files: {
        expand: true,
        cwd: '<%= config.tmp %>',
        dest: '<%= config.build %>',
        src: '**/*.html'
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['<%= config.source %>/js/script.js']
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
        cwd: '<%= config.source %>/scss',
        dest: '<%= config.tmp %>/css',
        src: ['**/*.scss'],
        ext: '.css'
      }
    },

    svgmin: {
      options: {

      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/img',
        dest: '<%= config.tmp %>/img',
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
          '<%= config.tmp %>/img/icons.svg': ['<%= config.tmp %>/img/icons/*.svg'],
        }
      }
    },

    watch: {

      css: {
        files: ['<%= config.source %>/css/**/*.css'],
        tasks: []
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      html: {
        files: ['<%= config.source %>/templates/**/*.html'],
        tasks: ['assemble', 'processhtml']
      },

      js: {
        files: ['<%= config.source %>/js/**/*.js'],
        tasks: ['jshint']
      },

      sass: {
        files: ['<%= config.source %>/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'processhtml']
      },

      svg: {
        files: ['<%= config.source %>/img/**/*.svg'],
        tasks: []
      }

    }

  });

  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'assemble',
    'processhtml',
    'svgmin',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'sass',
    'autoprefixer',
    'assemble',
    'processhtml',
    'svgmin',
    'clean:tmp',
    'clean:sass'
  ]);

};
