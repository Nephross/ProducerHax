'use strict';

module.exports = function(grunt) {
  
  //Load libraries
  const path = require('path');

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    shell: {
        multiple: {
            command: ['bower install',
                'mv bower_components/** public/',
                'rm -rf bower_components'].join('&&')
        }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec', // Optionally capture the reporter output to a file 
        },
        src: [path.join('./test', '**', '*.js')]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'shell', 'mochaTest']);

  //Test
  grunt.registerTask('test', ['mochaTest']);

  //Shell
  grunt.registerTask('shell', ['shell']);

};