var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id/:filename', function (req, res, next) {

  var config = require('../config');
  var db = config.init_db();

  //db.run("CREATE TABLE if not exists user_info (info TEXT)");
  //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  //for (var i = 0; i < 10; i++) {
  //    stmt.run("Ipsum " + i);
  //}
  //stmt.finalize();

  db.get("SELECT file FROM media_parts WHERE media_item_id = ?",req.params.id, function(err, row) {

      var options = {
        //root: /*__dirname +*/ '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      };
      var fileName = row.file;
      res.sendFile(fileName , options, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
        else {
          console.log('Sent:', fileName);
        }
      });


  });


  db.close();












})

module.exports = router;
