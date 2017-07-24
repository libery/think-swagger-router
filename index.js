const Router = require('koa-router');

function invokeRouter(options, app) {
  var loaded = false;

  function initSwaggerDesc() {
    var descs = think.app.apiDescs;
    if (!loaded && descs && descs.length > 0) {
      const router = new Router();
      console.log('index-router descs=' + JSON.stringify(descs));
      for (var i = 0; descs && i < descs.length; i++) {
        var desc = descs[i];
        router[desc.method](desc.apiPath, desc.paramValidator);
      }
      think.app.use(router.routes());
      loaded = true;
    }
  }

  return (ctx, next) => {
    if (!loaded)
      initSwaggerDesc();
    return next();
  };
};

module.exports = invokeRouter;