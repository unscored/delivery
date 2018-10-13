'use strict';

const direct = require('extdirect');
const config = require('../config');

const init = app => {
  const directApi = direct.initApi(config.direct);
  const directRouter = direct.initRouter(config.direct);

  app.get(config.direct.apiUrl, (req, res, next) => {
    try {
      directApi.getAPI(
        api => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(api);
        }, req, res);
    } catch (ex) {
      const err = new Error('Internal Server Error');
      err.message = ex;
      err.status = 500;
      next(err);
    }
  });

  app.get(config.direct.classRouteUrl, (req, res, next) => {
    const err = new Error('Internal Server Error');
    err.message = 'Unsupported method. Use POST instead.';
    err.status = 500;
    next(err);
  });

  app.post(config.direct.classRouteUrl, (req, res) => {
    directRouter.processRoute(req, res);
  });
};

module.exports = {
  init
};