module.exports = function(grunt) {

  var env_var = grunt.file.readJSON('config/environment.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    bgShell: {
      development: {
        cmd: "node_modules/.bin/webpack-dev-server --config=./config/development.js",
        bg: true
      },
      production: {
        cmd: "node_modules/.bin/webpack --config=./config/production.js --progress -p && grunt shopify:upload:./theme/assets/app.js && grunt shopify:upload:./theme/assets/all.css",
        bg: false
      }
    },

    shopify: {
      options: {
        api_key: env_var.shopify.api_key,
        password: env_var.shopify.password,
        base: "theme/",
        disable_growl_notifications: true,
        url: "deluvio.myshopify.com"
      }
    },



    sass: {
      options: {
        outputStyle: 'compressed'
      },
      compile: {
        files: {
          'theme/assets/all.css': 'styles/all.scss',
        }
      }
    },



    open: {
      start: {
        path: 'https://deluvio.myshopify.com',
        app: 'Google Chrome'
      }
    },


    watch: {
      shopify: {
        files: ["theme/**"],
        tasks: ["shopify"],
        options: {
          livereload: {
            host: 'localhost',
            port: 9000,
            key: grunt.file.read('keys/livereload.key'),
            cert: grunt.file.read('keys/livereload.crt')
          }
        }
      },
      sass: {
        files: 'styles/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: false
        }
      }
    }


  });


  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-open');


  grunt.registerTask('development', ['bgShell:development', 'open', 'watch']);
  grunt.registerTask('production', ['sass', 'bgShell:production']);
  grunt.registerTask('default', ['development']);

};



