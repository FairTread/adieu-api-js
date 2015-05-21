'use strict';

// add one file, and optionally add another and set meta data

var fs = require('fs');

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

var args = process.argv.slice(2);

if (!args[0]) {
  console.log('pass in a filepath to upload');
  process.exit(1);
}

var radTemplateFilename = args[0]; // should be a full template PNG.

// add this file to the board as a new rad
var radTemplateData = fs.readFileSync(radTemplateFilename);

// now upload this template file to our board
var rad = {};
rad.data = radTemplateData.toString('base64');
// rad.id = 'previousRadIdOrBlankToCreate';

console.log('adding... this could take some time...');
adieu.addRad(boardToken, rad, function(err, results) {

  if (!err) {
    console.log('added image ok', results);

    if (args[1]) {
      // will try to replace that ad with this one.
      rad.id = results.rad.id;
      if (!rad.id) {
        console.log('missing rad?');
        process.exit(1);
      }
      console.log('updating '+rad.id);

      radTemplateData = fs.readFileSync(args[1]);
      rad.data = radTemplateData.toString('base64');

      adieu.updateRad(boardToken, rad, function(err, results) {

        if (!err) {
          console.log('updated image ok', results);
        } else {
          console.log('could not update',err);
        }

        console.log('updating meta data');
        var radMeta = {};
        radMeta.href = 'http://www.adieu.io/?'+Date.now();

        adieu.setRadMeta(boardToken, rad.id, radMeta, function(err, radMeta) {
           if (err) {
             console.warn('err',err);
           }
           console.log('rad now',radMeta);
           // EOP
        });

      });
    }
  } else {
    console.log('error',err);
  }
});
