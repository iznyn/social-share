module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            main: {
                src: 'js/social-share.js',
                dest: 'js/social-share.min.js'
            }
        },

        watch: {
            uglify: {
                files: ['js/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'uglify','watch'
    ]);
};
