const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const metaHandler = require('./metaHandler');
const errorHandler = require('./globalErrorHandler');

app.use(cors());
app.use(express.static(path.join('frontend-build')))

app.get('/api/meta', metaHandler);
app.use(errorHandler);

module.exports = app;
