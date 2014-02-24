var appSettings = require('../settings/app.json');
module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: appSettings.dir.app,
            dest: appSettings.dir.dist,
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
        cwd: appSettings.dir.app + '/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
    }
};
