var express = require('express');
var router = express.Router();

function btoa(string){
  return new Buffer(string).toString('base64');
}

function atob(string){
  return new Buffer(string, 'base64').toString('ascii');
}

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();
  var shows = {};

  var id = /*atob(*/req.params.id/*)*/;
  console.log(id);

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    db.each("SELECT i.id as id, i.title as title, t.hints as hints, p.file as file, i.duration as second, t.size as size, i.year as year"
    + " FROM media_items t, metadata_items i, media_parts p "
    + " WHERE p.media_item_id=t.id AND t.metadata_item_id = i.id AND i.title != '' AND t.hints LIKE '%show=?%' "
    ,id, function(err, row) {
        console.log(err);
        console.log(row);
        //découpage des hints
        var params = {};
        var tab = row.hints.split('&');
        tab.forEach(function(val,index,table){
          var tab2 = val.split('=');
          params[tab2[0]] = decodeURIComponent(tab2[1]);
        });
        row.info_meta = params;

        //formattage des données
        var tab = row.file.split('/');
        var tab2 = tab[tab.length -1].split('\\');
        var filename = tab2[tab2.length -1];
        row.filename = filename;

        if(typeof row.info_meta !== 'undefined' && typeof row.info_meta.season !== 'undefined' && typeof row.info_meta.episode !== 'undefined'){
          row.season_episode = "S"+addZero(row.info_meta.season)+"E"+addZero(row.info_meta.episode);
        }

        row.duree = formatDuree(row.second);
        row.size = humanFileSize(row.size,true);

        data.push(row);
    },
    //aprés toute les opération de la base
    function() {
        res.render('channel', { title: 'Liste des vidéos',channel:{
          'name': "Liste de la série",
          'type': 2
        },videos: data });
    });


  });

  db.close();
});

module.exports = router;
