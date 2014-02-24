module.exports = {
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
};
