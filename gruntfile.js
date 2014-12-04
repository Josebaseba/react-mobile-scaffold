module.exports = function(grunt){

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {

      assets  : 'assets',
      test    : 'test',
      package : 'app',
      banner  : '/*\n\
          <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("dd/mm/yyyy") %>\n\
          Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n\
          Under <%= pkg.license %> License \n*/'

    },

    source: {

      js: [
        '<%= meta.assets %>/js/*.js',
        '<%= meta.assets %>/js/utils/*.js',
        '<%= meta.assets %>/js/stores/*.js',
        '<%= meta.assets %>/js/dispatcher/*.js',
        '<%= meta.assets %>/js/actions/*.js',
        '<%= meta.assets %>/js/components/*.js',
        '<%= meta.assets %>/js/routers/*.js'
      ],

      styles: [
        '<%= meta.assets %>/styles/theme/*.css',
        '<%= meta.assets %>/styles/*.css'
      ],

      components_fonts: [
        'bower_components/ratchet/fonts/ratchicons.eot',
        'bower_components/ratchet/fonts/ratchicons.svg',
        'bower_components/ratchet/fonts/ratchicons.ttf',
        'bower_components/ratchet/fonts/ratchicons.woff'
      ],

      components_css: [
        'bower_components/ratchet/dist/css/ratchet-theme-android.css',
        'bower_components/ratchet/dist/css/ratchet-theme-ios.css',
        'bower_components/ratchet/dist/css/ratchet.css'
      ],

      test: [
        '<%= meta.test %>/bdd/**.js',
        '<%= meta.test %>/index.html'
      ]

    },

    browserify: {
      dev: {
        src : '<%= meta.assets %>/js/app.js',
        dest: '<%= meta.package %>/js/<%= pkg.name %>.debug.js'
      },

      test: {
        src : '<%= meta.test %>/bdd/test.init.js',
        dest: '<%= meta.test %>/js/tests.js'
      },

      options: {
        transform: [require('grunt-react').browserify]
      }
    },

    uglify: {

      assets: {

        files: {
          '<%= meta.package %>/js/<%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= meta.package %>/js/<%= pkg.name %>.debug.js']
        }

      }

    },

    copy: {

      fonts: {

        files: [
          {expand: true, src: '<%= source.components_fonts %>', dest: '<%= meta.package %>/fonts/', filter: 'isFile', flatten: true}
        ]

      },

      components_css: {

        files: [
          {expand: true, src: '<%= source.components_css %>', dest: '<%= meta.assets %>/styles/ratchet', filter: 'isFile', flatten: true}
        ]

      }

    },

    cssmin: {

      styles: {

        options: {

          banner: '<%= meta.banner %>'

        },

        files: {

          '<%= meta.package %>/styles/<%= pkg.name %>.<%= pkg.version %>.min.css': '<%= source.styles %>'

        }

      },

      ratchet_styles: {

        options: {

          keepSpecialComments: 0,
          banner: '<%= meta.banner %>'

        },

        files: {

          '<%= meta.package %>/styles/ratchet-theme-ios.min.css'    : '<%= meta.assets %>/styles/ratchet/ratchet-theme-ios.css',
          '<%= meta.package %>/styles/ratchet-theme-android.min.css': '<%= meta.assets %>/styles/ratchet/ratchet-theme-android.css',
          '<%= meta.package %>/styles/ratchet.min.css'              : '<%= meta.assets %>/styles/ratchet/ratchet.css'

        }

      }

    },

    usebanner: {

      components: {

        options: {

          position : 'top',
          banner   : '<%= meta.banner%>',
          linebreak: true

        },

        files: {

          src: [
            '<%= meta.package %>/js/<%= pkg.name %>.min.js'
          ]

        }

      }

    },

    watch: {

      assets: {

        options: {livereload: true},
        files: ['<%= source.js %>'],
        tasks: ['browserify:dev', 'uglify', 'usebanner']

      },

      test: {

        files: ['<%= source.test %>'],
        tasks: ['browserify:test',]

      },

      theme: {

        options: {livereload: true},
        files: ['<%= source.styles %>'],
        tasks: ['cssmin:styles']

      },

      ratchet_styles: {

        options: {livereload: true},
        files: ['<%= meta.assets %>/styles/ratchet/**.css'],
        tasks: ['cssmin:ratchet_styles']

      }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask('default', ['browserify:dev', 'copy', 'uglify', 'cssmin', 'usebanner']);
  grunt.registerTask('test', ['browserify:test']);

};