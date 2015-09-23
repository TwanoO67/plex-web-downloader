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

  function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
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

    db.each("SELECT i.id as id, i.title as title, t.hints as hints, i.duration as second, t.size as size, i.year as year"
    + " FROM media_items t, metadata_items i "
    + " WHERE t.metadata_item_id = i.id AND i.title != '' AND t.library_section_id = ? "
    + " ORDER BY i.title ASC",req.params.id, function(err, row) {

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
        res.render('channel', { title: 'Liste des vidéos',videos: data, channel: channel_info });
    });

  });

  db.close();
});

module.exports = router;
