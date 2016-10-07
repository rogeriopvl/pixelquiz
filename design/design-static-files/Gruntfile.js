'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
        files: "assets/less/**/*.less",
        tasks: ["less"]
  	},

    less: {
        compile: {
            options: {
                paths: ['assets']
            },
            files: {'assets/css/style.css': 'assets/less/main.less'},
            options: { spawn: false }
        }
    },

    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'assets/css/*.css',
                    './*.html'
                ]
            },
            options: {
                watchTask: true,
                server: './'
            }
        }
    },

    cssmin: {
        options: {
            keepSpecialComments: 0,
            report: 'gzip'
        },
        target: {
            files: [{
                expand: true,
                cwd: 'assets/css',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/css',
                ext: '.min.css'
            }]
        }
    },

    imagemin: {
  		all: {
  			files: [{
  				expand: true,
  				cwd: 'assets/imgs',
  				src: ['**/*.{png,jpg,gif}'],
  				dest: 'assets/imgs'
  			}]
  		}
  	},

    uglify: {
      my_target: {
        files: [{
            expand: true,
            cwd: 'assets/js',
            src: '**/*.js',
            dest: 'assets/js/min'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('css', ['less','cssmin','imagemin']);
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('default', ['browserSync', 'cssmin', 'watch']);
};
