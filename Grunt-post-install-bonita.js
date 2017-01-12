module.exports = function(grunt) {

  // Project configuration portal
  grunt.initConfig({

    pkg: grunt.file.readJSON('Grunt-post-install-bonita.json'),

    copy: {
      tomcat_config_mac: {
        files: [
          {
            expand: true,
            cwd: 'cfg/tomcat', 
            src: ['tomcat-users.xml'], 
            dest: '<%= pkg.bonita.installPathMacOs %><%= pkg.bonita.installVersion %>/<%= pkg.tomcat.confPath %>', 
          },       
        ],
      },
      bonita_webinf_cors_mac: {
        files: [
          {
            expand: true,
            cwd: 'cfg/bonita/WEB-INF/cors', 
            src: ['web.xml'], 
            dest: '<%= pkg.bonita.installPathMacOs %><%= pkg.bonita.installVersion %>/<%= pkg.tomcat.bonitaWebInfPath %>', 
          },       
        ],
      },
    },

  });

  // Load the plugins that provides the tasks
//  grunt.loadNpmTasks('grunt-contrib-clean');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-ng-annotate');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('grunt-war');
//  grunt.loadNpmTasks('grunt-tomcat-deploy');
//  grunt.loadNpmTasks('grunt-open');

  // mac Task: copy:studio
  grunt.registerTask('postinstall_mac', ['copy:tomcat_config_mac', 'copy:bonita_webinf_cors_mac'] );

};