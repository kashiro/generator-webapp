module.exports = {
    server: [<% if (includeCompass) { %>
        'compass:server',<% } %><% if (includeJade) { %>
        'jade:server',<% } %>
        'copy:styles'
    ],
    test: [
        'copy:styles'
    ],
    stg: [<% if (includeCompass) { %>
        'compass:stg',<% } %>
        'copy:styles',<% if (includeJade) { %>
        'jade:stg'<% } %>
    ],
    dist: [<% if (includeCompass) { %>
        'compass:dist',<% } %>
        'copy:styles',<% if (includeJade) { %>
        'jade:dist',<% } %>
        'imagemin',
        'svgmin'
    ]
};
