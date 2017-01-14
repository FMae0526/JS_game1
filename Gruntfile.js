module.exports = function(grunt){
    // Setting Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    // Definition of Default Task
    grunt.registerTask('default', 'Log some stuff.', function(){
        // Output Log Message
        grunt.log.write('Logging some stuff...').ok();
    });
    // Example of Reading uglify Plugin
       grunt.loadNpmTasks('grunt-contrib-uglify');
};
