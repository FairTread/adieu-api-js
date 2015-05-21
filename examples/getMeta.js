'use strict';

// this gets a rad's meta data,

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

var args = process.argv.slice(2);

if (!args[0]) {
  console.log('usage: getMeta RAD_ID');
  process.exit(1);
}
var radId = args[0];

adieu.getRadMeta(boardToken, radId, function(err, radMeta) {
  if (err) {
    console.warn('err', err);
  }

  console.log(radMeta);

  // EOP
});
