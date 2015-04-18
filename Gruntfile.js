module.exports = function (grunt) {

  'use strict';

  require('jit-grunt')(grunt, {
    cmq: 'grunt-combine-media-queries'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source',
      build: 'build'
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    clean: {
      folder: ['<%= config.build %>']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    concat: {
      files: {
        src: [
          '<%= config.source %>/js/script.js'
        ],
        dest: '<%= config.build %>/js/main.js',
      }
    },

    copy: {
      favicons: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '*{ico,jpg,png}'
      },
      fonts: {
        expand: true,
        cwd: '<%= config.source %>/fonts',
        dest: '<%= config.build %>/fonts',
        src: '**/*'
      },
      html: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '*.html'
      }
    },

    cssmin: {
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
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
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '**/*.html'
      }
    },

    imagemin: {
      files: {
        files: [{
          expand: true,
          cwd: '<%= config.source %>/img',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.build %>/img'
        }]
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
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '**/*.html'
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
        preserveComments: 'some'
      },
      traget: {
        files: {
          '<%= config.build %>/js/main.js': ['<%= config.build %>/js/main.js']
        }
      }

    },

    sass: {
      options: {
        style: 'expanded'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/scss',
        dest: '<%= config.source %>/css',
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
        dest: '<%= config.build %>/img',
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
          '<%= config.build %>/img/icons.svg': ['<%= config.build %>/img/icons/*.svg'],
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

      img: {
        files: ['<%= config.source %>/img/**/*.{gif,jpeg,jpg,png}'],
        tasks: []
      },

      js: {
        files: ['<%= config.source %>/js/**/*.js'],
        tasks: ['jshint']
      },

      sass: {
        files: ['<%= config.source %>/scss/**/*.scss'],
        tasks: ['sass']
      },

      svg: {
        files: ['<%= config.source %>/img/**/*.svg'],
        tasks: []
      }

    }

  });

  grunt.registerTask('default', ['sass', 'watch']);
  grunt.registerTask('test', [
    'sass',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'autoprefixer',
    'cmq',
    'cssmin',
    'processhtml',
    'concat',
    'uglify',
    'svgmin',
    'imagemin'
  ]);

};
