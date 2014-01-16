module.exports = function(grunt) {
    
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %>\n * <%= pkg.homepage %>\n */\n'
            },
            my_target: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js'],
                    'example/js/<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};