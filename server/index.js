'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const direct = require('./utils/direct');
const server = require('./utils/server');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));

direct.init(app);
server.run(app);
