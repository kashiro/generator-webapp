var appSettings = require('../settings/app.json'),
    networkSettings = require('../settings/network.json');

module.exports = {
    // Watches files for changes and runs tasks based on the changed files
    options: {
        spawn: false
    },
    js: {
        files: [ appSettings.dir.app + '/scripts/{,*/}*.js' ],
        tasks: ['newer:jshint'],
        options: {
            livereload: true
        }
    },<% if (includeJade) { %>
    jade: {
        files: [ appSettings.dir.app + '/jade/{,*/}*.jade'],
        tasks: ['jade:server']
    },<% } %><% if (includeCompass) { %>
    compass: {
        files: [ appSettings.dir.app + '/styles{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
    },<% } %>
    livereload: {
        options: {
            livereload: networkSettings.port.livereload
        },
        files: [
            '.tmp/{,*/}*..html',
            '.tmp/styles/{,*/}*.css',
            appSettings.dir.app + '/images/**/*'
        ]
    }
};
