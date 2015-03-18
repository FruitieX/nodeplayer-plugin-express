'use strict';

var MODULE_NAME = 'plugin-express';

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var nodeplayerConfig = require('nodeplayer-config');
var coreConfig = nodeplayerConfig.getConfig();
var defaultConfig = require('./default-config.js');
var config = nodeplayerConfig.getConfig(MODULE_NAME, defaultConfig);

exports.init = function(player, logger, callback) {
    player.app = express();

    var options = {};
    if (config.tls) {
        options = {
            tls: config.tls,
            key: fs.readFileSync(config.tlsKey),
            cert: fs.readFileSync(config.tlsCert),
            ca: fs.readFileSync(config.tlsCa),
            requestCert: config.requestCert,
            rejectUnauthorized: config.rejectUnauthorized
        };
        player.app.set('tls', true);
        player.httpServer = https.createServer(options, player.app)
                .listen(process.env.PORT || config.port);
    } else {
        player.httpServer = http.createServer(player.app)
                .listen(process.env.PORT || config.port);
    }

    callback();
};