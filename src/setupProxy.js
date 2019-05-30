const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  if (process.env.PROXY === "remote") {
    app.use(
      proxy("/copymus/api", {
        target: "https://grfia.dlsi.ua.es",
        secure: false
      })
    );
  } else {
    app.use(
      proxy("/copymus/api", {
        target: "http://localhost:8090",
        pathRewrite: {
          "^/copymus/api/scanner/random/primus": "/api/scanner/random/test",
          "^/copymus": ""
        }
      })
    );
  }
};
