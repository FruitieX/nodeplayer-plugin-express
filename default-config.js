var path = require('path');
var nodeplayerConfig = require('nodeplayer').config;

var defaultConfig = {};

defaultConfig.port = 8080;
defaultConfig.tls = false;
defaultConfig.key = nodeplayerConfig.getBaseDir() + path.sep + 'nodeplayer-key.pem';
defaultConfig.cert = nodeplayerConfig.getBaseDir() + path.sep + 'nodeplayer-cert.pem';
defaultConfig.ca = nodeplayerConfig.getBaseDir() + path.sep + 'nodeplayer-ca.pem';
defaultConfig.requestCert = false;
defaultConfig.rejectUnauthorized = true;

module.exports = defaultConfig;
