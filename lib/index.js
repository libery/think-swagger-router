const Router = require('koa-router');

function invokeRouter(options, app) {
  function initSwaggerDesc() {
    var descs = app.apiDescs;
    if (!loaded && descs && descs.length > 0) {
      const router = new Router();
      for (var i = 0; descs && i < descs.length; i++) {
        var desc = descs[i];
        router[desc.method](desc.apiPath, desc.paramValidator);
      }
      app.use(router.routes());
    }
  }

  return (ctx, next) => {
    return next();
  };
};

module.exports = invokeRouter;