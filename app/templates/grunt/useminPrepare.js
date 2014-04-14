var appSettings = require('../settings/app.json');

module.exports = {
    options: {
        dest: appSettings.dir.dist
    },
    html: if(this.includeJade) {appSettings.dir.dist + '/index.html'} else {appSettings.dir.app + '/index.html'}
};
