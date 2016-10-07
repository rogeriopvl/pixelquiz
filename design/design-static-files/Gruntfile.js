'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
        files: "static/less/**/*.less",
        tasks: ["less"]
  	},

    less: {
        compile: {
            options: {
                paths: ['static']
            },
            files: {'static/css/style.css': 'static/less/main.less'},
            options: { spawn: false }
        }
    },

    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'static/css/*.css',
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
                cwd: 'static/css',
                src: ['*.css', '!*.min.css'],
                dest: 'static/css',
                ext: '.min.css'
            }]
        }
    },

    imagemin: {
  		all: {
  			files: [{
  				expand: true,
  				cwd: 'static/imgs',
  				src: ['**/*.{png,jpg,gif}'],
  				dest: 'static/imgs'
  			}]
  		}
  	},

    uglify: {
      my_target: {
        files: [{
            expand: true,
            cwd: 'static/js',
            src: '**/*.js',
            dest: 'static/js/min'
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
