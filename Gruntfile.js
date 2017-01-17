module.exports = function(grunt){
    // Setting Grunt
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['test/*.html']
        },
        watch: {
            files: [
                "Gruntfile.js",
                "*.html",
                "layout/*.css",
                "logic/*.js",
                "spec/*.js",
                "test/*.js",
                "test/*.html",
            ],
            tasks: ["qunit"]
        },
        jasmine: {
            all: {
                src: 'logic/**/*.js',
                options:{
                    specs: 'spec/**/*.spec.js',
                },
            },
        },
    });

    // Jasmine
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['jasmine', 'qunit','uglify']);

    // Qunit
    // grunt.registerTask("test", ["qunit"]);

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*
    // Definition of Default Task
    grunt.registerTask('default', 'Log some stuff.', function(){
        // Output Log Message
        grunt.log.write('Logging some stuff...').ok();
    });
    */

    // Example of Reading uglify Plugin
       grunt.loadNpmTasks('grunt-contrib-uglify');
    
};
