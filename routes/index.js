var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();

  var html = "<html><head></head><body><h1>liste des fichiers</h1>";

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    //db.run("CREATE TABLE if not exists user_info (info TEXT)");
    //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    db.each("SELECT id, title FROM metadata_items", function(err, row) {
        html += "<a href='/file/"+ row.id + "'> " + row.title + "</a><br/>";
    },
    //aprés toute les opération de la base
    function() {
        // All done fetching records, render response
        html += "</body></html>";
        res.end(html);
    });

  });

  db.close();
  //res.render('index', { title: 'Express' });
});

module.exports = router;
