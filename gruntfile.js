module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    uglify : {
    	// often called 'dist' instead of build
    	build: {
    		src: 'src/js/*.js',
    		dest: 'js/script.min.js'
    	},
    	dev: {
    		options: {
    			beautify: true,
    			mangle: false,
    			compress: false,
    			preserveComments: 'all'
    		},
            files: {
            'js/script.min.js': ['node_modules/jquery/dist/jquery.js', 'src/js/slick.js', 'src/js/jquery.balanced-gallery.js' ,'src/js/jquery.matchHeight.js', 'src/js/scripts.js']
            }
    	},
    },


    watch : {
	    options: {
	      livereload: true,
	    },
    	js: {
    		files: ['src/js/**/*.js'], // <-- when these files change
    		tasks: ['uglify:dev']	// <-- run this task
    	},
    	css: {
    		files: ['src/scss/**/*.scss'], // <-- when these files change
    		tasks: ['sass:dev']	// <-- run this task
    	},
        html: {
            files: ['*.html']
        }
    },


    sass: {
    	dev: {
    		options: {
    			outputStyle: 'expanded'
    		},
    		files: {
                'css/style.css'  :  'src/scss/style.scss'
    		}
    	},
    	build: {
    		options: {
    			outputStyle: 'compressed'
    		},
    		files: {
    			'css/style.css'  :  'src/scss/style.scss'
    		}
    	}
    } 

 

  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); // watch you do not need to resgister that task just enter on comand line 'grunt watch'
  grunt.loadNpmTasks('grunt-sass');

  // Register the default tasks.
  grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
  grunt.registerTask('build', ['uglify:build', 'sass:build']);
};