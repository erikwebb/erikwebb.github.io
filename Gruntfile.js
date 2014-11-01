module.exports = function(grunt) {
  
  grunt.initConfig({
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          environment: 'production'
        }
      },
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  grunt.registerTask('default', ['compass']);

};
