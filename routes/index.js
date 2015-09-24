var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();

  var data = [];
  //on fais toute les opération de base a la suite
  db.serialize(function() {

    //db.run("CREATE TABLE if not exists user_info (info TEXT)");
    //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    db.each("SELECT id, name, section_type as type"
    + " FROM library_sections ORDER BY name ASC", function(err, row) {
      data.push(row);
    },
    //aprés toute les opération de la base
    function() {
        res.render('index', { title: 'Liste des channel',channels: data, presentation: config.presentation });
    });

  });

  db.close();
});

module.exports = router;
