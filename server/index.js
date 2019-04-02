'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const direct = require('./utils/direct');
const server = require('./utils/server');
const app = express();
const { spaRoutes } = require('./config');

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.enable('trust proxy');

app.use (function (req, res, next) {
  if (req.secure) {
          // request was via https, so do no special handling
          next();
  } else {
          // request was via http, so redirect to https
          res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

// client spa routing
app.get([...spaRoutes.client], function(req, resp) {
  resp.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

// admin spa routing
app.get([...spaRoutes.admin], function(req, resp) {
  resp.sendFile(path.join(PUBLIC_PATH, 'admin', 'index.html'));
});

direct.init(app);
server.run(app);
