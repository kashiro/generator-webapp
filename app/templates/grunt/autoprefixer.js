module.exports = {
    options: {
<<<<<<< HEAD
        <% if (supportMobile) { %>browsers: ['last 2 version', 'android 2.3']<% }else{ %>
        browsers: ['last 2 version', 'ie 8', 'ie 9']<% } %>
=======
        browsers: ['last 2 version', 'ie 8', 'ie 9']
>>>>>>> 5f6aeda60495edef862946ff1ffe4b0dbd88b5fe
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
