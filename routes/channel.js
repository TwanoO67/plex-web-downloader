var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();

  var data = [];
  var channel_info = [];

  function addZero(v) {
    return v.toString().replace(/^(\d)$/,'0$1');
  };

  function formatDuree(time) {
    if(typeof time !== 'undefined' && time != "" && time > 0){
      var d = new Date(time); // js fonctionne en milisecondes
      return addZero(d.getHours()-1) + "h "+ addZero(d.getMinutes()) + "m "+ addZero(d.getSeconds()) + "s ";
    }
    else {
      return "";
    }
  }

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    //db.run("CREATE TABLE if not exists user_info (info TEXT)");
    //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    db.get("SELECT id, name, section_type as type"
    + " FROM library_sections WHERE id = ? ORDER BY name ASC",req.params.id, function(err, row) {
      channel_info = row;
    });

    db.each("SELECT i.id as id, i.title as title, i.duration as second, i.year as year"
    + " FROM metadata_items i, media_items t "
    + " WHERE i.id = t.metadata_item_id AND i.title != '' AND t.library_section_id = ? "
    + " ORDER BY i.title ASC",req.params.id, function(err, row) {

        row.duree = formatDuree(row.second);

        data.push(row);
    },
    //aprés toute les opération de la base
    function() {
        res.render('channel', { title: 'Liste des vidéos',videos: data, channel: channel_info });
    });

  });

  db.close();
});

module.exports = router;
