module.exports = function(grunt) {

  // Project configuration buiding Hypzaak production version
  grunt.initConfig({

    build: grunt.file.readJSON('Grunt-build-war.json'),

    // WebApp Deployment on Tomcat server requires a base-reference path
    // for HTML5 routing
    replace: {
        warindex: {
            src: ['<%= build.aotSrcFolder %>/index.html'], // source files array (supports minimatch) 
            dest: '<%= build.aotSrcFolder %>/<%= build.webXmlWelcome %>', // destination directory or file 
            replacements: [{
            from: '<base href="/">',  // string replacement 
            to: '<base href="/<%= build.warDeployPath %>/">'
            }, ]
        }
    },

    war: {
        prod: {
            options: {
                war_dist_folder: '<%= build.warDistFolder %>',    /* Folder where to generate the WAR. */
                war_name: '<%= build.warName %>',  /* The name fo the WAR file (.war will be the extension) */
                webxml_welcome: '<%= build.webXmlWelcome %>', /* first webpage for webapp */
                webxml_display_name: '<%= build.webXmlDisplayName %>', /* display name for webapp */
            },
            files: [
            {
                expand: true,
                cwd: '<%= build.aotSrcFolder %>',
                src: [
                    '<%= build.webXmlWelcome %>',
                    'shim.min.js',
                    'zone.min.js', 
                    'dist/**', 
                    'assets/**'],
                dest: ''
            }
            ]
        }
    },

  });

  // Load the plugins that provides the tasks
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-war');

  // build .war ready to deploy as tomcat webapp
  grunt.registerTask('build', ['replace:warindex', 'war:prod']);

  // default Task: dev(elopment)
  grunt.registerTask('default', ['build']);

};