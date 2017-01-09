module.exports = function(grunt) {

// Project deploy on local testserver
  grunt.initConfig({

    build: grunt.file.readJSON('Grunt-build-war.json'),
    deploy: grunt.file.readJSON('Grunt-deploy-prod.json'),

      tomcat_deploy: {
        host: '<%= deploy.host %>',
        login: '<%= deploy.login %>',
        password: '<%= deploy.password %>',
        path: '/<%= build.warDeployPath %>&update=true',
        port: '<%= deploy.port %>',
        war: '<%= build.warDistFolder %>/<%= build.warName %>.war',
        deploy: '/manager/text/deploy',
        undeploy: '/manager/text/undeploy'
      },

    });

    // Load the plugins that provides the tasks
    grunt.loadNpmTasks('grunt-tomcat-deploy');

    grunt.registerTask('default', ['tomcat_deploy'] );

};