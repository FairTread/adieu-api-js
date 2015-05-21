var _ = require('lodash');

(function() {
  var adieuApi = {};
  var request = require('request');

  var apiHeaders = {
    'Accept': 'application/json',
    'User-Agent': 'AdieuIo/0.1.0',
    'Accept-Language': 'en'
  };
  var config = require('./config');

  /*
   *  Configure Api Options
   */
  adieuApi.configure = function(options) {
    _.defaults(options, config);
    return adieuApi;
  }

  /*
   *  Get properties for board
   */
  adieuApi.getBoard = function(boardToken, callback) {

    var eventRequest = {};
    eventRequest.type = 'board';
    eventRequest.token = boardToken;

    var requestUrl = config.endpoint + '/api/v2/board'
    request.get({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      body: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
        }
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  /*
   *  Get metadata for rad (repurposed ad unit)
   */
  adieuApi.getRadMeta = function(boardToken, radId, callback) {
    var eventRequest = {};
    eventRequest.type = 'radMeta';
    eventRequest.token = boardToken;
    eventRequest.radId = radId;

    var requestUrl = config.endpoint + '/api/v2/radMeta'
    request.get({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      qs: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
        }
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  /*
   *  Set metadata for rad (repurposed ad unit)
   */
  adieuApi.setRadMeta = function(boardToken, radId, radMeta, callback) {
    var eventRequest = {};
    eventRequest.type = 'radMeta';
    eventRequest.token = boardToken;
    eventRequest.radId = radId;
    eventRequest.radMeta = radMeta;

    var requestUrl = config.endpoint + '/api/v2/radMeta'
    request.post({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      body: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
        }
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  /*
   *  Add / Update rad (repurposed ad unit)
   */
  adieuApi.updateRad = adieuApi.addRad = function(boardToken, rad, callback) {
    var eventRequest = {};
    eventRequest.type = 'rad';
    eventRequest.token = boardToken;
    eventRequest.rad = rad;

    var method = 'post'; // update
    if (!rad.id) {
      method = 'put';
    }

    var requestUrl = config.endpoint + '/api/v2/rad'
    request[method]({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      body: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
          if (code < 300) {
            code = null; // put returns 201
          }
        }
        console.log('calling back', code, body);
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  /*
   * Remove a rad (repurposed ad unit)
   */
  adieuApi.deleteRad = function(boardToken, radId, callback) {
    var eventRequest = {};
    eventRequest.type = 'rad';
    eventRequest.token = boardToken;
    eventRequest.rad = {
      'id': radId
    };

    var method = 'del';

    var requestUrl = config.endpoint + '/api/v2/rad'
    request[method]({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      body: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
        }
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  /*
   * Get a rad (repurposed ad unit)
   */
  adieuApi.getRad = function(boardToken, radId, callback) {
    var eventRequest = {};
    eventRequest.type = 'rad';
    eventRequest.token = boardToken;
    eventRequest.rad = {
      'id': radId
    };

    var method = 'get';

    var requestUrl = config.endpoint + '/api/v2/rad'
    request[method]({
      url: requestUrl,
      headers: apiHeaders,
      json: true,
      body: eventRequest
    }, function(error, response, body) {
      if (error) {
        callback(error);
        return;
      }

      if (!response || response.statusCode != 200) {
        if (!response) {
          code = -1;
        } else {
          code = response.statusCode;
        }
        callback(code, body);
        return;
      }

      callback(null, body);
    });
  };

  adieuApi.getUnit = function(boardToken, radId, unit, callback) {
    adieuApi.getRad(boardToken, radId, function(err, results) {
      if (err) {
        callback(err);
        return;
      }

      if (results && results.rad && results.rad.units && results.rad.units[unit]) {
        request.get({
            url: results.rad.units[unit]
          },
          function(error, response, body) {
            if (error) {
              callback(error);
              return;
            }

            if (!response || response.statusCode != 200) {
              if (!response) {
                code = -1;
              } else {
                code = response.statusCode;
              }
              callback(code, body);
              return;
            }

            callback(null, body);
          });
      } else {
        callback('unit not found');
        return;
      }
    });
  };

  module.exports = adieuApi;
}());
