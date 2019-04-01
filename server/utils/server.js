'use strict';

const https = require('https');
const fs = require('fs');
const errors = require('./errors');
const {protocol, host, port} = require('../config').server;

const options = {
  key: fs.readFileSync('ssl/287458.key'),
  cert: fs.readFileSync('ssl/287458.crt')
};

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
  addErrorHandlers(app);

  const server = https.createServer(options, app).listen({host, port});

  server.on('error', err => {
    console.error('utils/server.js, exception:', err);
    process.exit(1);
  });

  server.on('listening', () => {
    console.info('Server has started successfully. Application is available by ' +
      protocol + '://' + host + ':' + port);
  });
};

module.exports = {
  run
};