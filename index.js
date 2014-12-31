'use strict';

var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');
var server = express();

server.use(serveStatic('build', {'index': ['index.html', 'index.htm']}));

server.use(compression());

server.listen(process.env.PORT || 3000);
