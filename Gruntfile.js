module.exports = function(grunt) {

  // Project configuration Hypzaak
  grunt.initConfig({

    warBuild: grunt.file.readJSON('Grunt-build-war.json'),
    serverLocal: grunt.file.readJSON('Grunt-deploy-local.json'),
    serverProd: grunt.file.readJSON('Grunt-deploy-prod.json'),

    // clean-up / remove dirs and/or files
    clean : {
      aot : {
        files : [ {
          dot : true,
          src : [ 
            'aot' 
            ]
        } ]
      },
      jit : {
        files : [ {
          dot : true,
          src : [ 
            'app/**/*.js',
            'app/**/*.js.map', 
            ]
        } ]
      },
    },

    copy: {
      md_styles: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/@angular/material/core/theming/prebuilt', 
            src: [
              'indigo-pink.css',
              'indigo-pink.css.map',
              ], 
            dest: 'assets/styles/material-design', 
          },       
        ],
      },
      aot_shim: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/core-js/client', 
            src: [
              'shim.min.js',
              'shim.min.map',
              ], 
            dest: 'aot', 
          },       
        ],
      },
      aot_zone: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/zone.js/dist', 
            src: [
              'zone.min.js',
              ], 
            dest: 'aot', 
          },       
        ],
      },
      aot_assets: {
        files: [
          {
            expand: true,
            src: [
              'assets/**',
              ], 
            dest: 'aot', 
          },       
        ],
      },
      aot_cfg: {
        files: [
          {
            expand: true,
            cwd: 'cfg/cfg-aot',
            src: [
              'bs-config.json',
              'index.html',
              ], 
            dest: 'aot', 
          },       
        ],
      },
    },

    // open / start webapps
    open : {
        local : {
          path: 'http://<%= serverLocal.host %>:<%= serverLocal.port %>/<%= warBuild.warDeployPath %>/',
          //app: 'Google Chrome'
          //app: 'Firefox'
        },
        prod : {
          path: 'http://<%= serverProd.host %>:<%= serverProd.port %>/<%= warBuild.warDeployPath %>/',
          //app: 'Google Chrome'
          //app: 'Firefox'
        },
    },

});

  // Load the plugins that provides the tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  
  // init aot files to build dist
  grunt.registerTask('aot_init', ['copy:aot_shim', 'copy:aot_zone', 'copy:aot_assets', 'copy:aot_cfg']);

  // Run app on local-server
  grunt.registerTask('localapp', ['open:local']);

// Run app on production-server
  grunt.registerTask('prodapp', ['open:prod']);

  // default Task: dev(elopment)
  grunt.registerTask('default', ['localapp']);

};