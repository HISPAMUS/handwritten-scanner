const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy('/copymus/api', {
        target: 'http://localhost:8090',
        pathRewrite: {
            '^/copymus/api/scanner/random/primus': '/api/scanner/random/test',
            '^/copymus': ''
        }
    }));
};
