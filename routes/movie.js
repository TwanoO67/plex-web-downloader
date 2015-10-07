var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/:id/:incoming_chan', function(req, res, next) {
  var config = res.locals.config;
  var db = config.init_db();

  var data;

  db.get("SELECT id,title,original_title,studio,rating,summary,duration,tags_genre,tags_star,year FROM metadata_items WHERE id = ?",req.params.id, function(err, row) {

    row.tags_genre = row.tags_genre.split('|');
    row.tags_star = row.tags_star.split('|');
    row.rating = Math.round(row.rating,2);
    row.file = [];

    db.each("SELECT id,file,size,hash,duration FROM media_parts where media_item_id IN (SELECT id FROM media_items WHERE metadata_item_id = ? )",req.params.id, function(error, ligne) {
      var tab = ligne.file.split('/');
      var tab2 = tab[tab.length -1].split('\\');
      var filename = tab2[tab2.length -1];
      ligne.filename = filename;

      ligne.size = humanFileSize(ligne.size,true);

      row.file.push(ligne);
    },function(){
      res.render('movie', { title: 'Détail vidéo',movie: row,channel_id: req.params.incoming_chan });
    });

  });

  db.close();



});

module.exports = router;
