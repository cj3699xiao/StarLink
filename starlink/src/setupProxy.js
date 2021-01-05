const { createProxyMiddleware } = require('http-proxy-middleware');
// this method only works for Create react app
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.n2yo.com',
            changeOrigin: true,
        })
    );
};
