'use strict';

// this gets a board's top level data,

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN']; // get from adieu.io site -> boards -> upload

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

adieu.getBoard(boardToken, function(err, response) {

  if (err) {
    console.log('error:',err);
  }
  //console.log(response);

  // { board:
  //   { id: '29c59a00-e2a3-11e4-bcb9-3724a9a3ac18',
  //     title: 'Test Board',
  //     rads:
  //      [ '666d6730-e2a3-11e4-bcb9-3724a9a3ac18',
  //        '21ef6ad0-e2a4-11e4-bcb9-3724a9a3ac18',
  //        'a680c100-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'a44a8aa0-e2a4-11e4-bcb9-3724a9a3ac18' ] },
  //  ts: 1432118107399 }

  if (response && response.board) {
    console.log(response.board);
  } else {
    console.log('no board found.');
    return;
  }

});
