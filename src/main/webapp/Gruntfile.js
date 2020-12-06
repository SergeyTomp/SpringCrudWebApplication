const webpackConfig = require('./webpack.config.js');
const NODE_ENV = process.env.NODE_ENV;

module.exports = function(grunt) {
    grunt.initConfig({
        // ----- Environment
        // read in some metadata from project descriptor
        project: grunt.file.readJSON('package.json'),
        // define some directories to be used during build
        dir: {
            // location where TypeScript source files are located
            "source_ts": "./static/js",

            // location where TypeScript/Jasmine test files are located
            // "source_test_ts": "src/test/ts",

            // location where all build files shall be placed
            "target": "target",

            // location to place (compiled) javascript files
            "target_js": "target/webapp/static/js",

            // location to place (compiles) javascript test files
            // "target_test_js": "target/js-test",

            // location to place documentation, etc.
            // "target_report": "target/report"
        },
        // ----- TypeScript compilation
        //  See https://npmjs.org/package/grunt-typescript
        typescript: {
            // Compiles the code into a single file. Also generates a typescript declaration file
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.source_ts %>',
                // dest: '<%= dir.target_js %>/<%= project.name %>.js',
                options: {
                    base_path: '<%= dir.source_ts %>',
                    target: 'es6',
                    declaration: true,
                    comments: true
                }
            }

            // Compiles the tests.
            // compile_test: {
            //     src: ['<%= dir.source_test_ts %>/**/*.ts'],
            //     dest: '<%= dir.target_test_js %>',
            //     options: {
            //         base_path: '<%= dir.source_test_ts %>',
            //         target: 'es5'
            //     }
            // }
        },
        clean:{
            clean_all:{
                src:['<%= dir.source_ts %>/*.d.ts','<%= dir.source_ts %>/*.js' ]
            }
        },
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
            },
            prod: webpackConfig,
            build: Object.assign({ watch: false }, webpackConfig)
        },
        uglify: {
            my_target: {
                dest: '<%= dir.target_js %>/minified.js',
                src: ['<%= dir.target_js %>/<%= project.name %>.js']
            }
        }
        // ------- Unit tests with code coverage
        //  See https://github.com/gruntjs/grunt-contrib-jasmine
        // jasmine: {
        //     run: {
        //         // the code to be tested
        //         src: ['<%= dir.target_js %>/**/*.js'],
        //         options: {
        //             // the tests
        //             specs: '<%= dir.target_test_js %>/**/*Spec.js',
        //         }
        //     }
        // },
    });
    // ----- Setup tasks
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webpack');
    // grunt.loadNpmTasks('grunt-contrib-jasmine');
    // grunt.registerTask('default', ['typescript:compile','typescript:compile_test','jasmine']);
    grunt.registerTask('default', ['clean:clean_all', 'typescript:compile', "webpack:prod" ]);
    // grunt.registerTask('compile', ['clean:clean_all', 'typescript:compile' ]);
};