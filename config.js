'use strict';

var path = require('path');

function envOrDefault(key, def) {
	return process.env[key] || def;
}

module.exports = {
	endpoint: envOrDefault('ADIEU_ENDPOINT', 'https://api.adieu.io'),
	// @type {Winston.Logger} or any object which defines methods for each of
	// the npm loglevels.
	logger: require('./lib/logger')
};
