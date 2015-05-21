'use strict';

// this gets a board's top level data,
//  loads the first rad's meta data,
//   and sets that rad's "href" paramenter

var adieu = require('../index');

var boardToken = process.env['ADIEU_BOARD_TOKEN'];

if (!boardToken) {
  console.log("set ADIEU_BOARD_TOKEN first.");
  process.exit(1);
}

adieu.getBoard(boardToken, function(err, response) {

  if (err) {
    console.log('error:',err);
  }
  console.log(response);

  // { board:
  //   { id: '29c59a00-e2a3-11e4-bcb9-3724a9a3ac18',
  //     title: 'Test Board',
  //     rads:
  //      [ '666d6730-e2a3-11e4-bcb9-3724a9a3ac18',
  //        '21ef6ad0-e2a4-11e4-bcb9-3724a9a3ac18',
  //        'd295b250-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'cec728b0-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '50dee8d0-e2a3-11e4-bcb9-3724a9a3ac18',
  //        '8d998540-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '627a3e90-e2a4-11e4-bcb9-3724a9a3ac18',
  //        'ba252d30-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '78860340-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '36342b20-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '940241c0-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'fa908780-e2a3-11e4-bcb9-3724a9a3ac18',
  //        '4c9ae110-e2a4-11e4-bcb9-3724a9a3ac18',
  //        'ccca6e50-e2a4-11e4-bcb9-3724a9a3ac18',
  //        'cda53df0-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '0e366fc0-e2a4-11e4-bcb9-3724a9a3ac18',
  //        '80dc37e0-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'bcf95140-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'feaa0d90-e768-11e4-9ede-b9b28485990b',
  //        'a680c100-e2a3-11e4-bcb9-3724a9a3ac18',
  //        'a44a8aa0-e2a4-11e4-bcb9-3724a9a3ac18' ] },
  //  ts: 1432118107399 }

  if (response && response.board) {
    var radId = response.board.rads[0];

    if (radId) {
       adieu.getRadMeta(boardToken, radId, function(err, radMeta) {
         if (err) {
           console.warn('err',err);
         }

           console.log(radMeta);

           // now update the meta with a new link
           radMeta = {};
           radMeta.href = 'http://www.adieu.io/?'+Date.now();

           adieu.setRadMeta(boardToken, radId, radMeta, function(err, radMeta) {
              if (err) {
                console.warn('err',err);
              }
              console.log('rad now',radMeta);
              // EOP
           });

       });
    } else {
      console.log('no rads found for this board.');
    }

  } else {
    console.log('no board found.');
    return;
  }

});
