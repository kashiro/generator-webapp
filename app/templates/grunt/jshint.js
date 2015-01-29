var appSettings = require('../settings/app.json');

module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },
    all: [
        'Gruntfile.js',
        appSettings.dir.app + '/scripts/{,*/}*.js',
        'test/spec/{,*/}*.js'
    ]
};
