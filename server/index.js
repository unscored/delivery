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

/*app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});*/

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

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
