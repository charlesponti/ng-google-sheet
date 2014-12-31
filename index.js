'use strict';

var express = require('express');
var compression = require('compression');
var server = express();

server.use(express.static(process.cwd() + '/build'));

server.use(compression());

server.listen(process.env.PORT || 3000);
