'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const direct = require('./utils/direct');
const server = require('./utils/server');
const app = express();
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const { spaRoutes } = require('./config');

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

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
