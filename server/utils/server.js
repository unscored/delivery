'use strict';

const http = require('http');
const errors = require('./errors');
const {protocol, host, port} = require('../config').server;

const addErrorHandlers = app => {
  app.use((req, res, next) => next({
    status: 404
  }));

  app.use((err, req, res, next) => {
    console.error('utils/server.js, exception:', err);
    res.status(err.status || 500);
    res.json({
      success: false,
      data: (err.status === 404) ? errors.routeNotFound() : errors.internalServerError()
    });
  });
};

const run = app => {
  let server = null;

  addErrorHandlers(app);
  
  if (process.env === 'production') {
    server = http.createServer(app).listen({host});
  } else {
    server = http.createServer(app).listen({host, port});
  }

  server.on('error', err => {
    console.error('utils/server.js, exception:', err);
    process.exit(1);
  });

  server.on('listening', () => {
    if (process.env === 'production') {
      console.info('Server has started successfully. Application is available by ' +
      protocol + '://' + host);
    } else {
      console.info('Server has started successfully. Application is available by ' +
        protocol + '://' + host + ':' + port);
    }
  });
};

module.exports = {
  run
};