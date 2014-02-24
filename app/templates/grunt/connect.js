var appSettings = require('../settings/app.json'),
    networkSettings = require('../settings/network.json');

<% if (includeNodeEasyMock) { %>
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
<% } %>

var mountFolder = function (connect, dir) {
    'use strict';
    return connect.static(require('path').resolve(dir));
};

module.exports = {
    options: {
        port: networkSettings.port.server,
        livereload: networkSettings.port.livereload,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: networkSettings.hostname
    },
    proxies: [{
        context: '/api',
        host: networkSettings.hostname,
        port: networkSettings.port.proxy,
        https: false,
        changeOrigin: false
    }],
    livereload: {
        options: {
            open: true,
            base: [
                '.tmp',
                appSettings.dir.app
            ],
            middleware: function (connect) {
                'use strict';
                return [
                    <% if (includeNodeEasyMock) { %>proxySnippet,<% } %>
                    mountFolder(connect, '.tmp'),
                    mountFolder(connect, appSettings.dir.app)
                ];
            }
        }
    },
    dist: {
        options: {
            open: true,
            base: appSettings.dir.dist,
            livereload: false
        }
    }
};
