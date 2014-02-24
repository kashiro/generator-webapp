// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
//
<% if (includeNodeEasyMock) { %>
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
<% } %>
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // load scripts files
    var scripts = grunt.file.readJSON('scripts.json'),
        testScripts = ['test/spec/**/*.js'];

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            domain: {
                prod : '',
                test : '',
                local: ''
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: scripts,
                tasks: ['newer:jshint'],
                options: {
                    livereload: true
                }
            },<% if (includeJade) { %>
            jade: {
                files: ['<%%= yeoman.app %>/jade/**/*.jade'],
                tasks: ['newer:jade:server'],
                options: {
                    livereload: true
                }
            },<% } %><% if (includeCompass) { %>
            compass: {
                files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% } %>
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '.tmp/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= yeoman.app %>/images/**/*'
                ]
            }
        },

<% if (includeJade) { %>
        jade: {
            options: {
                pretty: true,
                data: {
                    imgPath: 'images',
                    httpDomain: '<%%= yeoman.domain.local %>'
                },
                basedir: '<%%= yeoman.app %>/jade'
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/jade',
                    src: '**/!(_)*.jade',
                    dest: '.tmp',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    data: {
                        httpDomain: '<%%= yeoman.domain.prod %>'
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/jade',
                    src: '**/!(_)*.jade',
                    dest: '<%%= yeoman.dist %>',
                    ext: '.html'
                }]
            }
        },<% } %>

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            proxies: [{
                context: '/api',
                host: 'localhost',
                port: '3000',
                https: false,
                changeOrigin: false
            }],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ],
                    middleware: function (connect) {
                        return [
                            <% if (includeNodeEasyMock) { %>
                            proxySnippet,<% } %>
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
            ].concat(scripts.concat(testScripts))
        },

<% if (includeCompass) { %>
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: 'images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir     : '<%%= yeoman.dist %>/images/generated',
                    httpImagesPath         : '<%%= yeoman.domain.prod %>/images',
                    httpGeneratedImagesPath: '<%%= yeoman.domain.prod %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } %>

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '.tmp/index.html',
                ignorePath: '.tmp',
                exclude: [<% if (includeCompass) { %> '<%%= yeoman.app %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js' <% } %>]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.dist %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/**/*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '**/*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: '**/*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.webp',
                        'styles/fonts/{,*/}*.*',<% if (includeBootstrap) { %>,<% if (includeCompass) { %>
                        'bower_components/bootstrap-sass/vendor/assets/fonts/bootstrap/*.*'<% } else { %>
                        'bower_components/bootstrap/dist/fonts/*.*'<% } %><% } %>
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['mocha', 'expect', 'sinon'],
                    runnerPort: 8080,
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        '<%%= yeoman.app %>/bower_components/query/jquery.min.js',
                        '<%%= yeoman.app %>/bower_components/underscore/underscore-min.js'
                    ].concat(scripts.concat(testScripts)),
                    exclude: [
                        '<%%= yeoman.app %>/scripts/main.js'
                    ]
                }
            }
        },

<% if (includeModernizr) { %>
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
            files: [
                '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [<% if (includeCompass) { %>
                'compass:server',<% } %><% if (includeJade) { %>
                'jade:server',<% } %>
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [<% if (includeCompass) { %>
                'compass:dist',<% } %>
                'copy:styles',<% if (includeJade) { %>
                'jade:dist',<% } %>
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', ['newer:jshint', 'karma']);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
