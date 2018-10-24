'use strict';

const express = require('express');
const favicon = require('serve-favicon');
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
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(PUBLIC_PATH));

app.get(['/', '/cart', '/contacts'], function(req, resp) {
  resp.sendFile(PUBLIC_PATH + '/index.html');
});

direct.init(app);
server.run(app);
