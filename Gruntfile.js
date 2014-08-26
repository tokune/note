module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand:true,
                    cwd:'public/js',
                    src:'*.js',
                    dest: 'www/js'
                }]
            },
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand:true,
                    cwd:'public/css',
                    src:'*.css',
                    dest: 'www/css'
                }]
            },
        },
        copy: {
            build: {
                files: {
                    src:'public/favicon.ico',
                    dest: 'www/favicon.ico'
                }
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
}
