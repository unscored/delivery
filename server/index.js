'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const direct = require('./utils/direct');
const server = require('./utils/server');
const app = express();
const cloudinary = require('cloudinary').v2;
const { spaRoutes, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./config');

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
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
