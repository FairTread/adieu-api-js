'use strict';

// this gets a rad from a board

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

var args = process.argv.slice(2);

if (!args[0]) {
  console.log('usage: getRad RAD_ID');
  process.exit(1);
}
var radId = args[0];

adieu.getRad(boardToken, radId, function(err, rad) {
  if (err) {
    console.warn('err', err);
    return;
  }

  console.log(rad);
});
