'use strict';

var MODULE_NAME = 'plugin-express';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');

var nodeplayerConfig = require('nodeplayer').config;
var coreConfig = nodeplayerConfig.getConfig();
var defaultConfig = require('./default-config.js');
var config = nodeplayerConfig.getConfig(MODULE_NAME, defaultConfig);

exports.init = function(vars, callback) {
    vars.app = express();

    var options = {};
    if (config.tls) {
        options = {
            tls: config.tls,
            key: config.key ? fs.readFileSync(config.key) : undefined,
            cert: config.cert ? fs.readFileSync(config.cert) : undefined,
            ca: config.ca ? fs.readFileSync(config.ca) : undefined,
            requestCert: config.requestCert,
            rejectUnauthorized: config.rejectUnauthorized
        };
        // TODO: deprecated!
        vars.app.set('tls', true);
        vars.httpServer = https.createServer(options, vars.app)
                .listen(process.env.PORT || config.port);
    } else {
        vars.httpServer = http.createServer(vars.app)
                .listen(process.env.PORT || config.port);
    }

    vars.app.use(cookieParser());
    vars.app.use(bodyParser.json({limit: '100mb'}));
    vars.app.use(bodyParser.urlencoded({extended: true}));

    callback();
};
