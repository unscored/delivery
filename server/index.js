'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const direct = require('./utils/direct');
const server = require('./utils/server');
const app = express();

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

// client spa routing
app.get(['/', '/cart', '/contacts'], function(req, resp) {
  resp.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

// admin spa routing
app.get(['/admin', '/admin/orders', '/admin/clients'], function(req, resp) {
  resp.sendFile(path.join(PUBLIC_PATH, 'admin', 'index.html'));
});

direct.init(app);
server.run(app);
