module.exports = {
    options: {
        <% if (supportMobile) { %>browsers: ['last 2 version', 'android 2.3']<% }else{ %>
        browsers: ['last 2 version', 'ie 8', 'ie 9']<% } %>
    },
    dist: {
        files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
        }]
    }
};
