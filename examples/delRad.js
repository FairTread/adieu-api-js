'use strict';

// this removes a rad from a board

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

var args = process.argv.slice(2);

if (!args[0]) {
  console.log('usage: delRad RAD_ID');
  process.exit(1);
}
var radId = args[0];

adieu.deleteRad(boardToken, radId, function(err, status) {
  if (err) {
    console.warn('err', err);
  }

  console.log(status);
});
