'use strict';

// this gets the data for a particular rad

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

var args = process.argv.slice(2);

if (!args[0]) {
  console.log('usage: getUnit RAD_ID 300x250');
  process.exit(1);
}
var radId = args[0];
var unit = args[1];

if (!unit) {
  console.log('missing unit.');
  process.exit(1);
}

adieu.getUnit(boardToken, radId, unit, function(err, data) {
  if (err) {
    console.warn('err', err);
    return;
  }

  console.log(data);
});
