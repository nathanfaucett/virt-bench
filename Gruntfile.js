module.exports = function(grunt) {

    grunt.initConfig({
        jsbeautifier: {
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "test/**/*.js"
            ]
        },
        jshint: {
            options: {
                es3: true,
                unused: true,
                curly: true,
                eqeqeq: true,
                expr: true,
                eqnull: true,
                proto: true
            },
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "test/**/*.js"
            ]
        },
        envify: {
            options: {
                env: {
                    NODE_ENV: process.env.NODE_ENV
                }
            },
            index: {
                files: {
                    "index.env.js": [
                        "index.js"
                    ]
                }
            }
        },
        uglify: {
            index: {
                files: {
                    "index.js": [
                        "index.env.js"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-envify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["jsbeautifier", "jshint"]);
};
