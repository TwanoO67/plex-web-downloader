var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:id', function(req, res, next) {
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

    db.each("SELECT i.id as id, i.title as title, p.file as file, i.duration as second, i.year as year"
    + " FROM metadata_items i, media_parts p "
    + " WHERE p.media_item_id=i.id AND i.library_section_id = ? "
    + " ORDER BY i.title ASC",req.params.id, function(err, row) {
        var tab = row.file.split('/');
        var tab2 = tab[tab.length -1].split('\\');
        var filename = tab2[tab2.length -1];
        if(row.title != ''){
          row.filename = filename;
          data.push(row);
        }
    },
    //aprés toute les opération de la base
    function() {
        res.render('channel', { title: 'Liste des vidéos',videos: data });
    });

  });

  db.close();
});

module.exports = router;
