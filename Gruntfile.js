
module.exports = function(grunt){

  // modules calls
  grunt.loadNpmTasks('grunt-contrib-connect'); // levantar servidores
  grunt.loadNpmTasks('grunt-browserify'); // inyección de dependencias backbone
  grunt.loadNpmTasks('grunt-contrib-stylus'); // compilar stylus
  grunt.loadNpmTasks('grunt-contrib-watch'); // observar cambios sobre archivos
  grunt.loadNpmTasks('grunt-contrib-cssmin'); // minificar los css
  grunt.loadNpmTasks('grunt-contrib-uglify'); // minificar y ofuscar js
  grunt.loadNpmTasks('grunt-contrib-stylus'); // stylus
  grunt.loadNpmTasks('grunt-open'); // open url
  grunt.loadNpmTasks('grunt-contrib-copy'); // copia archivos y carpetas
  grunt.loadNpmTasks('grunt-contrib-clean'); // borra carpetas y archivos
  grunt.loadNpmTasks('grunt-ssh'); // conexión por ssh y sftp al servidor para deploy
  grunt.loadNpmTasks('grunt-changelog'); // coge el log de git to file
  grunt.loadNpmTasks('grunt-replace'); // replace strings pattern/regex

  // config modules
  grunt.config.init({

    open: { // abre url en el navegador especificado
        dev: {
          path: 'http://cesped.dev/',
          app: 'Google Chrome',
          options: {
            livereload: true
          }
        },
        pro: {
          path: 'http://miktown.github.io/cesped/',
          app: 'Google Chrome'
        },

    },

    watch: { // observa cambios sobre archivos

      scripts: {
          files: ['./stylus/**/*', '!css/*', '!src/js/app.js', '!src/js/app.min.js'],
          tasks: ['stylus', 'cssmin'],
          options: {
              livereload: true,
          },

      }

    },

    browserify: { // build
          'temp/js/app.min.js': ['src/js/main.js']
      },

    cssmin: { // min.css
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },

      uglify: { // min.js
        options: {
          mangle: false
        },
        my_target: {
          files: {
            'src/js/app.min.js': ['src/js/app.min.js']
          }
        }
      },


      stylus: { // stylus
      compile: {
        files: {
          './css/style.css': ['./stylus/style.styl']
        }
      }
    },

    copy: {
      pro: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['temp/css/**'], dest: 'app/css', filter: 'isFile'},
          {expand: true, flatten: true, src: ['temp/js/app.min.js'], dest: 'app/js', filter: 'isFile'},
          {expand: true, flatten: true, src: ['src/js/mocks/menu.json'], dest: 'app/js/mocks', filter: 'isFile'}
        ]
      }
    },

    clean: {
      dev: ["temp"],
      pro: ["app"]
    }, // borra la carpeta build antes de montarla

  });

  // tareas principales

  grunt.registerTask('default',[ 'stylus', 'cssmin','open:dev','watch']);

  // grunt.task.registerTask('build', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro', 'replace:pro' ]);
  // grunt.task.registerTask('deploy', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro' , 'replace:pro' , 'sftp' , 'open:pro' ]);

  // tareas standalone
  grunt.task.registerTask('css', ['stylus', 'cssmin','watch']);
  grunt.task.registerTask('borrar', [ 'clean' ]);
  grunt.task.registerTask('log', [ 'changelog' ]);
  grunt.task.registerTask('rep', [ 'replace' ]);
  grunt.task.registerTask('pro', [ 'sftp' ]);




};